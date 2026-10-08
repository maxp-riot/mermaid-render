import type { SessionMessage } from 'claude-code'

import { splitMermaidFences } from './fences'

/**
 * The Mermaid source of the last top-level ```mermaid fence Claude wrote in
 * these messages, or undefined when it wrote none.
 */
export function lastMermaidSource(messages: readonly SessionMessage[]): string | undefined {
  for (const message of [...messages].reverse()) {
    if (message.role !== 'assistant') continue

    const diagrams = splitMermaidFences(message.text).filter(segment => segment.kind === 'diagram')
    const last = diagrams.at(-1)
    if (last) return last.source
  }
  return undefined
}
