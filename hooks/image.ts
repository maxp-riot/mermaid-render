export type Appearance = 'dark' | 'light' | 'card'

// The colors a diagram is drawn in, by appearance. `dark` is Ghostty's default
// background and white; `light` is beautiful-mermaid's github-light pair. A
// `card` keeps the dark colors on an opaque background, for a terminal whose
// background the mod cannot know.
export const PALETTES = {
  dark: { bg: '#282c34', fg: '#ffffff', isOpaque: false },
  light: { bg: '#ffffff', fg: '#1f2328', isOpaque: false },
  card: { bg: '#282c34', fg: '#ffffff', isOpaque: true },
} as const

// Bump when the rendering changes, so cached PNGs are not reused.
const RENDER_VERSION = 2

export const CACHE_DIR = '/tmp/mermaid-render'

// Where Homebrew installs resvg on Apple Silicon.
export const RESVG = '/opt/homebrew/bin/resvg'

// Pixels of a terminal cell at 1x, so a diagram's 13px labels come out about the
// size of the terminal's text. An estimate for Ghostty's default 13pt font, to
// calibrate on screen.
const CELL = { width: 8, height: 17 } as const

const MAX_ROWS = 40

export type DiagramImage = { file: string; width: number; height: number; svg: string }

/**
 * The appearance for Claude Code's `theme` setting: its dark and light presets
 * name themselves, a custom theme goes by its `base` preset, and `auto` (the
 * terminal's own background, which a mod cannot read) gets a card.
 */
export function appearanceOf(theme: string | undefined, customBase?: string): Appearance {
  const preset = theme?.startsWith('custom:') ? customBase : theme
  if (preset?.startsWith('dark')) return 'dark'
  if (preset?.startsWith('light')) return 'light'
  return 'card'
}

export type TerminalEnv = {
  force?: string
  tmux?: string
  termProgram?: string
  term?: string
  kittyWindowId?: string
}

/**
 * Whether Claude Code draws pictures in this terminal: kitty and Ghostty
 * (cmux included) outside tmux, or any terminal when
 * CLAUDE_CODE_FORCE_TERMINAL_IMAGES is set. Elsewhere an Image shows its alt.
 */
export function terminalShowsImages(env: TerminalEnv): boolean {
  if (env.force === '1') return true
  if (env.tmux) return false

  return env.termProgram === 'ghostty' || env.term === 'xterm-ghostty' || env.term === 'xterm-kitty' || env.kittyWindowId !== undefined
}

/**
 * What to tell an iTerm2 user whose diagrams stay box art: iTerm2 3.7 reads
 * the kitty graphics Claude Code sends, once Claude Code is told to send them.
 */
export function imagesHint(env: TerminalEnv): string | undefined {
  if (env.termProgram !== 'iTerm.app' || terminalShowsImages(env)) return undefined

  return 'mermaid-render: iTerm2 3.7 or later can show the diagrams as images. Add "env": { "CLAUDE_CODE_FORCE_TERMINAL_IMAGES": "1" } to ~/.claude/settings.json, then start a new session.'
}

/**
 * The name a diagram's files take in CACHE_DIR: a hash of its source, its
 * appearance and the render version.
 */
export async function diagramKey(source: string, appearance: Appearance): Promise<string> {
  const text = `${RENDER_VERSION}\n${appearance}\n${source}`
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))

  return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, '0')).join('')
}

/**
 * The width and height an SVG's root element declares, in pixels.
 */
export function svgSize(svg: string): { width: number; height: number } | undefined {
  const size = svg.match(/<svg[^>]*\swidth="([\d.]+)"\s+height="([\d.]+)"/)

  return size ? { width: Number(size[1]), height: Number(size[2]) } : undefined
}

/**
 * The cells an image takes: its labels at about the terminal's text size,
 * narrowed to `maxColumns` and to MAX_ROWS rows, keeping its proportions.
 */
export function imageCells(image: { width: number; height: number }, maxColumns: number): { columns: number; rows: number } {
  const rowsPerColumn = (image.height / image.width) * (CELL.width / CELL.height)
  const columns = Math.max(1, Math.min(maxColumns, Math.ceil(image.width / CELL.width), Math.floor(MAX_ROWS / rowsPerColumn)))

  return { columns, rows: Math.max(1, Math.round(columns * rowsPerColumn)) }
}
