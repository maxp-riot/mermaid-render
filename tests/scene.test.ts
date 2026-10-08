import { describe, expect, test } from 'claude-code/testing'

import { canConvertToScene, excalidrawUrl, svgToScene, type ExcalidrawScene } from '../hooks/scene'
import { CLASS_SVG } from './fixtures/class-svg'
import { ER_SVG } from './fixtures/er-svg'
import { FLOWCHART_SVG } from './fixtures/flow-svg'
import { SEQUENCE_SVG } from './fixtures/sequence-svg'
import { XYCHART_SVG } from './fixtures/xy-svg'

const sceneOf = (svg: string): ExcalidrawScene => {
  const scene = svgToScene(svg)
  if (scene === undefined) throw new Error('no scene')
  return scene
}

const ofType = (scene: ExcalidrawScene, type: string) => scene.elements.filter(element => element.type === type)

describe('svgToScene/1', () => {
  test('a flowchart node becomes a shape holding its label', () => {
    const scene = sceneOf(FLOWCHART_SVG)
    const decision = scene.elements.find(element => element.id === 'box-B')!
    const label = scene.elements.find(element => element.containerId === 'box-B')!

    expect(decision.type).toBe('diamond')
    expect(label.text).toBe('Bloc mermaid fermé ?')
    expect(decision.boundElements).toContainEqual({ type: 'text', id: label.id })
  })

  test('a flowchart edge becomes an arrow bound to the two nodes it joins', () => {
    const arrows = ofType(sceneOf(FLOWCHART_SVG), 'arrow')

    expect(arrows.map(arrow => [(arrow.startBinding as { elementId: string }).elementId, (arrow.endBinding as { elementId: string }).elementId])).toEqual([
      ['box-A', 'box-B'],
      ['box-B', 'box-C'],
      ['box-B', 'box-D'],
      ['box-D', 'box-E'],
    ])
    expect(arrows.map(arrow => arrow.strokeStyle)).toEqual(['solid', 'solid', 'solid', 'dashed'])
  })

  test('an edge label rides on its arrow', () => {
    const scene = sceneOf(FLOWCHART_SVG)
    const label = scene.elements.find(element => element.text === 'oui')!
    const arrow = scene.elements.find(element => element.id === label.containerId)!

    expect(arrow.endBinding).toEqual({ elementId: 'box-D', focus: 0, gap: 4 })
  })

  test('an ER relationship carries its cardinalities as arrowheads', () => {
    const [relationship] = ofType(sceneOf(ER_SVG), 'arrow')

    expect([relationship!.startArrowhead, relationship!.endArrowhead]).toEqual(['cardinality_exactly_one', 'cardinality_zero_or_many'])
    // The SVG's own crow's foot glyphs are left out.
    expect(ofType(sceneOf(ER_SVG), 'ellipse')).toEqual([])
  })

  test('a class inheritance points an outlined triangle at the parent', () => {
    const [inheritance] = ofType(sceneOf(CLASS_SVG), 'arrow')

    expect(inheritance!.startBinding).toEqual({ elementId: 'box-Animal', focus: 0, gap: 4 })
    expect([inheritance!.startArrowhead, inheritance!.endArrowhead]).toEqual(['triangle_outline', null])
  })

  test('a class box keeps its name and members as separate lines of text', () => {
    const texts = ofType(sceneOf(CLASS_SVG), 'text').map(text => [text.text, text.containerId])

    expect(texts).toContainEqual(['Animal', null])
    expect(texts).toContainEqual(['+ name', null])
  })

  test('a sequence message is a filled arrow, dashed for a reply', () => {
    const arrows = ofType(sceneOf(SEQUENCE_SVG), 'arrow')

    expect(arrows.map(arrow => [arrow.endArrowhead, arrow.strokeStyle])).toEqual([
      ['triangle', 'solid'],
      ['triangle', 'dashed'],
    ])
  })

  test('a sequence note holds its text', () => {
    const scene = sceneOf(SEQUENCE_SVG)
    const text = scene.elements.find(element => element.text === 'rendu local')!

    expect(scene.elements.find(element => element.id === text.containerId)?.type).toBe('rectangle')
  })

  test('an xychart is not converted', () => {
    expect(canConvertToScene(XYCHART_SVG)).toBe(false)
    expect(svgToScene(XYCHART_SVG)).toBe(undefined)
  })
})

describe('excalidrawUrl/1', () => {
  test('carries the scene whole in the fragment, as a base64 data: URL', () => {
    const scene = sceneOf(FLOWCHART_SVG)
    const url = excalidrawUrl(scene)
    const dataUrl = decodeURIComponent(url.slice('https://excalidraw.com/#url='.length))
    const base64 = dataUrl.slice('data:application/json;base64,'.length)
    const json = new TextDecoder().decode(Uint8Array.from(atob(base64), char => char.charCodeAt(0)))

    expect(url.startsWith('https://excalidraw.com/#url=data%3Aapplication%2Fjson%3Bbase64%2C')).toBe(true)
    expect(JSON.parse(json)).toEqual(scene)
  })
})
