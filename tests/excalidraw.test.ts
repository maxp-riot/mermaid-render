import { describe, expect, test } from 'claude-code/testing'

import { lastMermaidSource } from '../hooks/excalidraw'

const reply = (text: string) => ({ role: 'assistant' as const, text, toolUses: [] })
const prompt = (text: string) => ({ role: 'user' as const, text, toolUses: [] })

describe('lastMermaidSource/1', () => {
  test('takes the last diagram of the last reply that has one', () => {
    const messages = [
      reply('```mermaid\nflowchart TD\n  A --> B\n```'),
      reply('First\n\n```mermaid\nflowchart TD\n  C --> D\n```\n\n```mermaid\nsequenceDiagram\n  C->>D: hi\n```'),
      reply('No diagram here.'),
    ]

    expect(lastMermaidSource(messages)).toBe('sequenceDiagram\n  C->>D: hi')
  })

  test('a diagram the person pasted in a prompt is not one Claude wrote', () => {
    expect(lastMermaidSource([prompt('```mermaid\nflowchart TD\n  A --> B\n```')])).toBe(undefined)
  })
})
