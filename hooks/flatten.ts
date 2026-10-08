// beautiful-mermaid colors its SVG with CSS custom properties and color-mix().
// resvg 0.48 refuses the custom property declarations and draws nothing, so
// every var() and color-mix() is resolved here into a plain color first.

type Props = Record<string, string>

/**
 * Returns the SVG with its custom properties, var() and color-mix() resolved
 * into hex colors, its font @imports dropped and the root style (the
 * background) removed. Throws on a construct it does not know how to resolve.
 */
export function flattenSvg(svg: string): string {
  const props: Props = {}
  const declare = (css: string) => {
    for (const match of css.matchAll(/(--[\w-]+)\s*:\s*([^;]+);?/g)) {
      props[match[1]!] = match[2]!.trim()
    }
  }

  const rootStyle = svg.match(/<svg[^>]*\sstyle="([^"]*)"/)
  if (rootStyle) declare(rootStyle[1]!)
  for (const block of svg.matchAll(/<style>([\s\S]*?)<\/style>/g)) declare(block[1]!)

  const stripped = svg
    .replace(/<style>([\s\S]*?)<\/style>/g, (block, css: string) => {
      const kept = css
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/@import url\([^)]*\);/g, '')
        .replace(/--[\w-]+\s*:[^;{}]+;/g, '')

      return `<style>${kept}</style>`
    })
    .replace(/(<svg[^>]*\sstyle=")[^"]*"/, '$1"')

  return resolve(stripped, props, 0)
}

function resolve(value: string, props: Props, depth: number): string {
  if (depth > 20) throw new Error(`custom property cycle in ${value}`)

  let out = value
  for (const fn of ['var(', 'color-mix('] as const) {
    let at: number
    while ((at = out.indexOf(fn)) !== -1) {
      const open = at + fn.length - 1
      const close = closingParen(out, open)
      const inner = out.slice(open + 1, close)
      const replacement = fn === 'var(' ? resolveVar(inner, props, depth) : colorMix(resolve(inner, props, depth + 1))
      out = out.slice(0, at) + replacement + out.slice(close + 1)
    }
  }
  return out
}

function resolveVar(inner: string, props: Props, depth: number): string {
  const [name, ...fallback] = splitTopLevel(inner)
  const raw = props[name!] ?? fallback.join(', ')
  if (raw === '') throw new Error(`undefined custom property ${name}`)

  return resolve(raw, props, depth + 1)
}

// color-mix(in srgb, A p%, B q%): a missing percentage is 100 minus the other.
function colorMix(args: string): string {
  const [space, first, second] = splitTopLevel(args)
  if (space !== 'in srgb' || first === undefined || second === undefined) {
    throw new Error(`unsupported color-mix(${args})`)
  }

  const a = mixOperand(first)
  const b = mixOperand(second)
  const pa = a.pct ?? (b.pct === undefined ? 50 : 100 - b.pct)
  const pb = b.pct ?? 100 - pa

  return rgbToHex(a.rgb.map((c, i) => (c * pa + b.rgb[i]! * pb) / (pa + pb)))
}

function mixOperand(part: string): { rgb: number[]; pct: number | undefined } {
  const match = part.match(/^(#[0-9a-fA-F]{3}|#[0-9a-fA-F]{6})(?:\s+([\d.]+)%)?$/)
  if (!match) throw new Error(`unsupported color-mix operand ${part}`)

  return { rgb: hexToRgb(match[1]!), pct: match[2] === undefined ? undefined : Number(match[2]) }
}

function hexToRgb(hex: string): number[] {
  const full = hex.length === 4 ? `#${[...hex.slice(1)].map(c => c + c).join('')}` : hex

  return [1, 3, 5].map(i => parseInt(full.slice(i, i + 2), 16))
}

function rgbToHex(rgb: number[]): string {
  return `#${rgb.map(c => Math.round(c).toString(16).padStart(2, '0')).join('')}`
}

function closingParen(text: string, open: number): number {
  let depth = 0
  for (let i = open; i < text.length; i++) {
    if (text[i] === '(') depth++
    if (text[i] === ')' && --depth === 0) return i
  }
  throw new Error(`unbalanced parentheses in ${text.slice(open, open + 80)}`)
}

function splitTopLevel(text: string): string[] {
  const parts: string[] = []
  let depth = 0
  let start = 0
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '(') depth++
    if (text[i] === ')') depth--
    if (text[i] === ',' && depth === 0) {
      parts.push(text.slice(start, i).trim())
      start = i + 1
    }
  }
  parts.push(text.slice(start).trim())
  return parts
}
