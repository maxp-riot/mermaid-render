import { describe, expect, test } from 'claude-code/testing'

import { drawMermaidFences, splitMermaidFences } from '../hooks/fences'

const FLOW = '```mermaid\nflowchart TD\n  A[Prompt] --> B[Reply]\n```'

const FLOW_DRAWN = [
  '```text',
  '┌──────┐',
  '│Prompt│',
  '└───┬──┘',
  '    │',
  '    ▼',
  '┌──────┐',
  '│Reply │',
  '└──────┘',
  '```',
].join('\n')

describe('drawMermaidFences/2', () => {
  test('a mermaid fence becomes a text fence holding its drawing, the prose around it untouched', () => {
    expect(drawMermaidFences(`Before\n\n${FLOW}\n\nAfter`, 80)).toBe(`Before\n\n${FLOW_DRAWN}\n\nAfter`)
  })

  test('every top-level fence of a reply is drawn', () => {
    expect(drawMermaidFences(`${FLOW}\n\nThen\n\n${FLOW}`, 80)).toBe(`${FLOW_DRAWN}\n\nThen\n\n${FLOW_DRAWN}`)
  })

  test('a kind the renderer does not draw keeps its source', () => {
    const pie = '```mermaid\npie title Parts\n  "a": 1\n```'

    expect(drawMermaidFences(pie, 80)).toBe(pie)
  })

  test('a diagram the renderer draws as nothing keeps its source', () => {
    const broken = '```mermaid\nsequenceDiagram\n  A->>\n```'

    expect(drawMermaidFences(broken, 80)).toBe(broken)
  })

  test('a drawing wider than the terminal keeps its source', () => {
    expect(drawMermaidFences(FLOW, 7)).toBe(FLOW)
  })

  test('a drawing exactly as wide as the terminal is drawn', () => {
    expect(drawMermaidFences(FLOW, 8)).toBe(FLOW_DRAWN)
  })

  test('a fence still streaming keeps its source', () => {
    const open = '```mermaid\nflowchart TD\n  A[Prompt] --> B[Reply]'

    expect(drawMermaidFences(open, 80)).toBe(open)
  })

  test('a fence inside a list item keeps its source', () => {
    const nested = '- Step\n  ```mermaid\n  flowchart TD\n    A --> B\n  ```'

    expect(drawMermaidFences(nested, 80)).toBe(nested)
  })
})

describe('splitMermaidFences/1', () => {
  test('cuts a reply into its text and its diagrams, in order', () => {
    expect(splitMermaidFences(`Before\n\n${FLOW}\n\nAfter`)).toEqual([
      { kind: 'text', text: 'Before' },
      { kind: 'diagram', source: 'flowchart TD\n  A[Prompt] --> B[Reply]' },
      { kind: 'text', text: 'After' },
    ])
  })

  test('a reply that opens on a diagram has no empty text before it', () => {
    expect(splitMermaidFences(`${FLOW}\n\nAfter`)).toEqual([
      { kind: 'diagram', source: 'flowchart TD\n  A[Prompt] --> B[Reply]' },
      { kind: 'text', text: 'After' },
    ])
  })

  test('a fence still streaming stays text', () => {
    expect(splitMermaidFences('Before\n\n```mermaid\nflowchart TD')).toEqual([{ kind: 'text', text: 'Before\n\n```mermaid\nflowchart TD' }])
  })
})
