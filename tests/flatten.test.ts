import { describe, expect, test } from 'claude-code/testing'

import { flattenSvg } from '../hooks/flatten'
import { SEQUENCE_SVG } from './fixtures/sequence-svg'

const svgWith = (style: string, body: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" style="--bg:#000000;--fg:#ffffff"><style>${style}</style>${body}</svg>`

describe('flattenSvg/1', () => {
  test('a beautiful-mermaid SVG keeps no custom property, color-mix or font import', () => {
    const flat = flattenSvg(SEQUENCE_SVG)

    expect(flat).not.toContain('var(')
    expect(flat).not.toContain('color-mix')
    expect(flat).not.toContain('@import')
    expect(flat).not.toContain('--')
  })

  test('its lines take the foreground mixed half and half with the background', () => {
    // #ffffff 50% over #282c34: (255 + 40) / 2, (255 + 44) / 2, (255 + 52) / 2, rounded.
    expect(flattenSvg(SEQUENCE_SVG)).toContain('stroke="#94969a"')
  })

  test('a derived property resolves through var() into color-mix()', () => {
    const svg = svgWith('svg { --_a: color-mix(in srgb, var(--fg) 25%, var(--bg)); }', '<rect fill="var(--_a)"/>')

    expect(flattenSvg(svg)).toBe(
      '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" style=""><style>svg {  }</style><rect fill="#404040"/></svg>',
    )
  })

  test('an undefined property takes its fallback', () => {
    expect(flattenSvg(svgWith('', '<line stroke="var(--accent, #3b82f6)"/>'))).toContain('stroke="#3b82f6"')
  })

  test('a CSS rule using a property gets the color', () => {
    const svg = svgWith('.dot { stroke: var(--bg); }', '<circle class="dot"/>')

    expect(flattenSvg(svg)).toContain('.dot { stroke: #000000; }')
  })

  test('a color space other than srgb is refused', () => {
    expect(() => flattenSvg(svgWith('', '<rect fill="color-mix(in oklch, #ffffff, #000000)"/>'))).toThrow('unsupported color-mix')
  })
})
