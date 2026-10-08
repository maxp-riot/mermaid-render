import { expect, mock, test } from 'claude-code/testing'

const FLOW = '```mermaid\nflowchart TD\n  A[Prompt] --> B[Reply]\n```'

const ENGINE_SECTIONS = [{ id: 'intro', text: 'You are Claude Code.', scope: 'shared' }] as const

const COMPOSE = {
  model: 'claude-opus-5-5',
  promptModel: 'claude-opus-5-5',
  tools: [],
  outputStyle: null,
  traits: [],
} as const

test('a terminal that shows no images gets the diagram as box art', async ($, on) => {
  mock.env(on, { TERM_PROGRAM: 'Apple_Terminal' })
  let drawnText = ''

  on('ui.render', { component: 'AssistantMessage' }, ($, e) => {
    drawnText = e.props.text
    const { Text } = $.ui.resolve(e)

    return Text({ children: [e.props.text] })
  })

  const ui = await $.ui.mount({
    plugin: 'mermaid-render',
    surface: 'terminal',
    component: 'AssistantMessage',
    props: { text: FLOW, isFirstOfReply: true },
    viewport: { columns: 120, rows: 40, isFullscreen: false },
  })

  expect(drawnText).toContain('│Prompt│')
  expect(drawnText).not.toContain('```mermaid')

  await ui.unmount()
})

test('iTerm2 without images forced gets the diagram as box art', async ($, on) => {
  mock.env(on, { TERM_PROGRAM: 'iTerm.app' })
  let drawnText = ''

  on('ui.render', { component: 'AssistantMessage' }, ($, e) => {
    drawnText = e.props.text
    const { Text } = $.ui.resolve(e)

    return Text({ children: [e.props.text] })
  })

  const ui = await $.ui.mount({
    plugin: 'mermaid-render',
    surface: 'terminal',
    component: 'AssistantMessage',
    props: { text: FLOW, isFirstOfReply: true },
    viewport: { columns: 120, rows: 40, isFullscreen: false },
  })

  expect(drawnText).toContain('│Prompt│')

  await ui.unmount()
})

test('the desktop app gets the reply with its mermaid source', async ($, on) => {
  let drawnText = ''

  on('ui.render', { component: 'AssistantMessage' }, ($, e) => {
    drawnText = e.props.text
    const { Text } = $.ui.resolve(e)

    return Text({ children: [e.props.text] })
  })

  const ui = await $.ui.mount({
    plugin: 'mermaid-render',
    surface: 'desktop',
    component: 'AssistantMessage',
    props: { text: FLOW, isFirstOfReply: true },
  })

  expect(drawnText).toBe(FLOW)

  await ui.unmount()
})

test('a session drawn in the terminal tells Claude its mermaid blocks are drawn', async ($, on) => {
  on('prompt.compose', () => ({ sections: ENGINE_SECTIONS }))

  const { sections } = await $.prompt.compose({ ...COMPOSE, surfaces: ['terminal'] })

  expect(sections.map(section => section.id)).toEqual(['intro', 'mermaid-render:diagrams'])
})

test('a session with nothing drawing keeps the engine prompt', async ($, on) => {
  on('prompt.compose', () => ({ sections: ENGINE_SECTIONS }))

  const { sections } = await $.prompt.compose({ ...COMPOSE, surfaces: [] })

  expect(sections.map(section => section.id)).toEqual(['intro'])
})
