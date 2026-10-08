import { describe, expect, test } from 'claude-code/testing'

import { appearanceOf, diagramKey, imageCells, imagesHint, svgSize, terminalShowsImages } from '../hooks/image'

describe('imageCells/2', () => {
  test('a diagram gets about one column per 8 pixels and rows in proportion', () => {
    // 591 / 390 * 8 / 17 rows per column, times 49 columns, is 34.9 rows.
    expect(imageCells({ width: 390, height: 591 }, 116)).toEqual({ columns: 49, rows: 35 })
  })

  test('a diagram wider than the room shrinks to it, in proportion', () => {
    expect(imageCells({ width: 390, height: 591 }, 30)).toEqual({ columns: 30, rows: 21 })
  })

  test('a tall diagram shrinks to stay within 40 rows', () => {
    expect(imageCells({ width: 200, height: 2000 }, 116)).toEqual({ columns: 8, rows: 38 })
  })
})

describe('svgSize/1', () => {
  test('reads the root width and height', () => {
    expect(svgSize('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 215" width="280" height="215.5">')).toEqual({ width: 280, height: 215.5 })
  })

  test('an SVG without them has no size', () => {
    expect(svgSize('<svg viewBox="0 0 280 215">')).toBe(undefined)
  })
})

describe('diagramKey/2', () => {
  test('the same source and appearance get the same key, any change another key', async () => {
    const key = await diagramKey('flowchart TD\n  A --> B', 'dark')

    expect(key).toMatch(/^[0-9a-f]{64}$/)
    expect(await diagramKey('flowchart TD\n  A --> B', 'dark')).toBe(key)
    expect(await diagramKey('flowchart TD\n  A --> C', 'dark')).not.toBe(key)
    expect(await diagramKey('flowchart TD\n  A --> B', 'light')).not.toBe(key)
  })
})

describe('appearanceOf/2', () => {
  test('every dark preset draws dark, every light preset light', () => {
    expect(['dark', 'dark-daltonized', 'dark-ansi'].map(theme => appearanceOf(theme))).toEqual(['dark', 'dark', 'dark'])
    expect(['light', 'light-daltonized', 'light-ansi'].map(theme => appearanceOf(theme))).toEqual(['light', 'light', 'light'])
  })

  test('a custom theme goes by its base', () => {
    expect(appearanceOf('custom:midnight', 'light-ansi')).toBe('light')
  })

  test('auto, a custom theme whose base is unknown, or no theme gets a card', () => {
    expect([appearanceOf('auto'), appearanceOf('custom:acme:brand'), appearanceOf(undefined)]).toEqual(['card', 'card', 'card'])
  })
})

describe('terminalShowsImages/1', () => {
  test('Ghostty, cmux and kitty show images', () => {
    expect(terminalShowsImages({ termProgram: 'ghostty', term: 'xterm-256color' })).toBe(true)
    expect(terminalShowsImages({ term: 'xterm-kitty' })).toBe(true)
  })

  test('iTerm2, Warp and Terminal.app do not, unless images are forced', () => {
    expect(['iTerm.app', 'WarpTerminal', 'Apple_Terminal'].map(termProgram => terminalShowsImages({ termProgram }))).toEqual([false, false, false])
    expect(terminalShowsImages({ termProgram: 'iTerm.app', force: '1' })).toBe(true)
  })

  test('tmux turns them off, even in Ghostty', () => {
    expect(terminalShowsImages({ termProgram: 'ghostty', tmux: '/tmp/tmux-501/default,1,0' })).toBe(false)
  })
})

describe('imagesHint/1', () => {
  test('iTerm2 without images forced is told how to force them', () => {
    expect(imagesHint({ termProgram: 'iTerm.app' })).toContain('"CLAUDE_CODE_FORCE_TERMINAL_IMAGES": "1"')
  })

  test('iTerm2 with images forced, and other terminals, get no hint', () => {
    expect([imagesHint({ termProgram: 'iTerm.app', force: '1' }), imagesHint({ termProgram: 'WarpTerminal' }), imagesHint({ termProgram: 'ghostty' })]).toEqual([
      undefined,
      undefined,
      undefined,
    ])
  })
})
