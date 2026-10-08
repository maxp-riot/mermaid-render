import { renderMermaidASCII } from './vendor/beautiful-mermaid-ascii'

// Only a closed fence that starts a line: one still streaming has no closing
// line yet, and one indented inside a list item or a quote stays code.
const MERMAID_FENCE = /^```mermaid[^\S\n]*\n([\s\S]*?)\n```[^\S\n]*$/gm

const COMPACT = { colorMode: 'none', paddingX: 2, paddingY: 2, boxBorderPadding: 0 } as const

export type Segment = { kind: 'text'; text: string } | { kind: 'diagram'; source: string }

/**
 * Cuts a markdown reply into its top-level ```mermaid fences and the text
 * around them, in order; text segments are trimmed and empty ones left out.
 */
export function splitMermaidFences(text: string): Segment[] {
  const segments: Segment[] = []
  const pushText = (part: string) => {
    if (part.trim() !== '') segments.push({ kind: 'text', text: part.trim() })
  }

  let last = 0
  for (const match of text.matchAll(MERMAID_FENCE)) {
    pushText(text.slice(last, match.index))
    segments.push({ kind: 'diagram', source: match[1]! })
    last = match.index + match[0].length
  }
  pushText(text.slice(last))

  return segments
}

/**
 * Replaces each top-level ```mermaid fence of a markdown reply with a ```text
 * fence holding its box-drawing diagram. A fence keeps its source when the
 * renderer refuses it or the drawing is wider than `columns`.
 */
export function drawMermaidFences(text: string, columns: number): string {
  return text.replace(MERMAID_FENCE, (fence, source: string) => {
    const art = drawDiagram(source, columns)

    return art === undefined ? fence : '```text\n' + art + '\n```'
  })
}

function drawDiagram(source: string, columns: number): string | undefined {
  let art: string

  try {
    art = renderMermaidASCII(source, COMPACT)
  } catch {
    // Kinds it does not draw (pie, gantt, mindmap) throw.
    return undefined
  }

  const lines = art.split('\n').map(line => line.trimEnd())
  const widest = Math.max(...lines.map(line => [...line].length))

  // A malformed sequence diagram draws as nothing rather than throwing. Box
  // drawing cannot shrink to fit a narrower terminal.
  return widest > 0 && widest <= columns ? lines.join('\n').trimEnd() : undefined
}
