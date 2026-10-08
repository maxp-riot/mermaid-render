import type { EngineInterface, Register } from 'claude-code'

import { lastMermaidSource } from './excalidraw'
import { drawMermaidFences, splitMermaidFences } from './fences'
import { flattenSvg } from './flatten'
import {
  CACHE_DIR,
  PALETTES,
  RESVG,
  appearanceOf,
  diagramKey,
  imagesHint,
  imageCells,
  svgSize,
  terminalShowsImages,
  type Appearance,
  type DiagramImage,
  type TerminalEnv,
} from './image'
import { canConvertToScene, excalidrawUrl, svgToScene } from './scene'

const OSASCRIPT = '/usr/bin/osascript'
const OPEN = '/usr/bin/open'

// Margin for the reply's bullet and indent.
const REPLY_INDENT = 4

// What the text after a diagram is shifted by, to line up with the reply's text
// Claude Code draws after its bullet. An estimate, to calibrate on screen.
const TEXT_INDENT = 2

const DIAGRAMS_SECTION = {
  id: 'mermaid-render:diagrams',
  scope: 'session',
  text: [
    'This terminal draws each ```mermaid code block of your replies as a diagram.',
    'When a diagram explains a flow, a call sequence, states or a data model better than prose, add one.',
    'Drawn kinds: flowchart or graph (TD, LR), sequenceDiagram, stateDiagram-v2, classDiagram, erDiagram, xychart-beta.',
    'Any other kind, or a block that does not parse, is shown as code.',
    'Start the fence at the beginning of a line, outside lists and quotes.',
    'Keep labels short and prefer top-down layouts so the diagram fits.',
  ].join(' '),
} as const

/**
 * The appearance for the person's Claude Code theme, a custom theme's `base`
 * read from ~/.claude/themes (`dark` when it names none, as Claude Code does).
 */
async function currentAppearance($: EngineInterface): Promise<Appearance> {
  const theme = (await $.config.list()).find(row => row.key === 'theme')?.value
  if (typeof theme !== 'string' || !theme.startsWith('custom:')) {
    return appearanceOf(typeof theme === 'string' ? theme : undefined)
  }

  try {
    const home = await $.env.get('HOME')
    const file = JSON.parse(await $.fs.read(`${home}/.claude/themes/${theme.slice('custom:'.length)}.json`))
    return appearanceOf(theme, typeof file.base === 'string' ? file.base : 'dark')
  } catch {
    // A plugin's theme, or a file that is gone or not JSON.
    return appearanceOf(theme)
  }
}

async function terminalEnv($: EngineInterface): Promise<TerminalEnv> {
  return {
    force: await $.env.get('CLAUDE_CODE_FORCE_TERMINAL_IMAGES'),
    tmux: await $.env.get('TMUX'),
    termProgram: await $.env.get('TERM_PROGRAM'),
    term: await $.env.get('TERM'),
    kittyWindowId: await $.env.get('KITTY_WINDOW_ID'),
  }
}

/**
 * Renders a Mermaid source to a PNG in CACHE_DIR: layout and SVG by
 * beautiful-mermaid under JavaScriptCore (osascript, so no Node), PNG by resvg
 * at twice the SVG's size. Resolves undefined when a step fails.
 */
async function renderDiagramImage($: EngineInterface, source: string, appearance: Appearance): Promise<DiagramImage | undefined> {
  const renderer = `${$.plugin.root}/renderer`
  const palette = PALETTES[appearance]
  const fail = (step: string, detail: string) => {
    $.ui.log(`mermaid-render: ${step} failed, the diagram stays box art: ${detail.slice(0, 500)}`)
    return undefined
  }

  try {
    const key = await diagramKey(source, appearance)
    const hasResvg = await $.fs.stat(RESVG).then(() => true, () => false)
    if (!hasResvg) return fail('resvg', `not found at ${RESVG}: brew install resvg`)

    const laidOut = await $.process.run(
      [OSASCRIPT, '-l', 'JavaScript', `${renderer}/render.js`, `${renderer}/beautiful-mermaid.iife.js`, palette.bg, palette.fg],
      { stdin: source, timeoutMs: 10_000 },
    )
    if (laidOut.exitCode !== 0) return fail('osascript', laidOut.stderr)

    const svg = flattenSvg(laidOut.stdout)
    const size = svgSize(svg)
    if (size === undefined) return fail('svg size', laidOut.stdout.slice(0, 200))

    await $.fs.write(`${CACHE_DIR}/${key}.svg`, svg)
    const file = `${CACHE_DIR}/${key}.png`
    const background = palette.isOpaque ? ['--background', palette.bg] : []
    const rasterized = await $.process.run([RESVG, '--zoom', '2', ...background, `${CACHE_DIR}/${key}.svg`, file], { timeoutMs: 10_000 })
    if (rasterized.exitCode !== 0) return fail('resvg', rasterized.stderr)

    return { file, ...size, svg }
  } catch (error) {
    // osascript or resvg missing, a timeout, a refused call, or an SVG
    // flattenSvg cannot read.
    return fail('render', String(error))
  }
}

/**
 * Opens excalidraw.com on the diagram as an editable scene. Excalidraw loads a
 * #url= link straight onto an empty canvas, and asks before replacing a canvas
 * that holds a drawing ("Replace my content", with backups offered first).
 */
async function openInExcalidraw($: EngineInterface, svg: string): Promise<string> {
  const scene = svgToScene(svg)
  if (scene === undefined) return 'This kind of diagram has no Excalidraw export.'

  await $.process.run([OPEN, excalidrawUrl(scene)])
  $.ui.toast('Excalidraw opened on the diagram')

  return 'Excalidraw opened on the diagram. If your canvas holds a drawing, Excalidraw asks before replacing it.'
}

// Whether the iTerm2 hint was shown while the module lives.
let isHintShown = false

// One render per source and appearance while the module lives; a reload
// starts over.
const images = new Map<string, Promise<DiagramImage | undefined>>()

function imageOf($: EngineInterface, source: string, appearance: Appearance): Promise<DiagramImage | undefined> {
  const key = `${appearance}\n${source}`
  let image = images.get(key)
  if (image === undefined) {
    image = renderDiagramImage($, source, appearance)
    images.set(key, image)
  }
  return image
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({ name: 'excalidraw', description: 'Open the last Mermaid diagram in Excalidraw' })

    return next(e)
  })

  on('command.run', { command: 'excalidraw' }, async $ => {
    const source = lastMermaidSource(await $.session.messages())
    if (source === undefined) return { text: 'No Mermaid diagram in this session.' }

    const image = await imageOf($, source, await currentAppearance($))
    if (image === undefined) return { text: 'The last diagram could not be rendered.' }

    return { text: await openInExcalidraw($, image.svg) }
  })

  // Only the screen changes: the stored reply keeps its mermaid source (ctrl+o).
  on('ui.render', { component: 'AssistantMessage' }, async ($, e, next) => {
    if (e.surface !== 'terminal' || !e.props.text.includes('```mermaid')) {
      return next(e)
    }

    const maxColumns = (e.viewport?.columns ?? 80) - REPLY_INDENT
    const segments = splitMermaidFences(e.props.text)
    const hasDiagram = segments.some(segment => segment.kind === 'diagram')
    // Reading the terminal or the theme can fail; the diagram then stays box art.
    const env = await terminalEnv($).catch((): TerminalEnv => ({}))
    const canDraw = hasDiagram && terminalShowsImages(env)
    const hint = hasDiagram ? imagesHint(env) : undefined
    if (hint !== undefined && !isHintShown) {
      isHintShown = true
      $.ui.log(hint)
    }
    const appearance = canDraw ? await currentAppearance($).catch((): Appearance => 'card') : 'card'
    const drawn = canDraw
      ? await Promise.all(segments.map(segment => (segment.kind === 'diagram' ? imageOf($, segment.source, appearance) : undefined)))
      : []
    const isAllDrawn = segments.every((segment, i) => segment.kind === 'text' || drawn[i] !== undefined)

    if (!canDraw || !isAllDrawn) {
      return next({ ...e, props: { ...e.props, text: drawMermaidFences(e.props.text, maxColumns) } })
    }

    const { Box, Button, Image, Markdown } = $.ui.resolve(e)
    const opening = segments[0]?.kind === 'text' ? segments[0].text : ''

    const body = segments.map((segment, i) => {
      if (segment.kind === 'text') {
        return i === 0 ? null : <Markdown key={`text-${i}`} text={segment.text} />
      }

      const image = drawn[i]!
      const cells = imageCells(image, maxColumns)

      return (
        <Box key={`diagram-${i}`} flexDirection="column" marginTop={1}>
          <Image source={{ file: image.file, format: 'png' }} columns={cells.columns} rows={cells.rows} alt="Mermaid diagram" />
          {canConvertToScene(image.svg) ? (
            <Button key={`excalidraw-${i}`} label="Open in Excalidraw" onPress={() => openInExcalidraw($, image.svg)} />
          ) : null}
        </Box>
      )
    })

    return (
      <Box flexDirection="column">
        {await next({ ...e, props: { ...e.props, text: opening } })}
        <Box flexDirection="column" paddingLeft={TEXT_INDENT}>
          {body}
        </Box>
      </Box>
    )
  })

  on('prompt.compose', async ($, e, next) => {
    const composed = await next(e)

    if (!e.surfaces.includes('terminal')) {
      return composed
    }

    return { sections: [...composed.sections, DIAGRAMS_SECTION] }
  })
}
