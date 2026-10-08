// The part of beautiful-mermaid's AsciiRenderOptions this mod passes.
export type AsciiRenderOptions = {
  colorMode?: 'none' | 'auto' | 'ansi16' | 'ansi256' | 'truecolor' | 'html'
  paddingX?: number
  paddingY?: number
  boxBorderPadding?: number
  useAscii?: boolean
}

export function renderMermaidASCII(text: string, options?: AsciiRenderOptions): string
