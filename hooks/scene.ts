// Turns a beautiful-mermaid SVG into an Excalidraw scene: the same layout,
// drawn with Excalidraw's own shapes, bound text and arrows bound to the boxes
// they join, so the diagram stays editable. Excalidraw's own Mermaid converter
// needs a browser, which a mod does not have.
//
// Fields left out are filled by Excalidraw's restoreElements when it loads the
// scene (packages/excalidraw/data/restore.ts).

type Attrs = Record<string, string>
type SvgItem = { tag: string; attrs: Attrs; text: string; group: Attrs | undefined }
type Element = Record<string, unknown> & { id: string; type: string; boundElements?: { type: string; id: string }[] }

export type ExcalidrawScene = {
  type: 'excalidraw'
  version: 2
  source: string
  elements: Element[]
  appState: { viewBackgroundColor: string }
  files: Record<string, never>
}

const INK = '#1e1e1e'
const EXCALIFONT = 5

// beautiful-mermaid's ER cardinalities (src/er/parser.ts) as Excalidraw arrowheads.
const CARDINALITY: Record<string, string> = {
  one: 'cardinality_exactly_one',
  'zero-one': 'cardinality_zero_or_one',
  many: 'cardinality_one_or_many',
  'zero-many': 'cardinality_zero_or_many',
}

// Class relationship kinds whose marker reads best as an outlined head.
const CLASS_ARROWHEAD: Record<string, string> = {
  inheritance: 'triangle_outline',
  realization: 'triangle_outline',
  composition: 'diamond',
  aggregation: 'diamond_outline',
}

/**
 * Whether svgToScene converts this SVG: every kind but xychart, whose dotted
 * grid alone is hundreds of circles.
 */
export function canConvertToScene(svg: string): boolean {
  return !svg.includes('xychart')
}

/**
 * The Excalidraw scene for a beautiful-mermaid SVG, or undefined for a kind it
 * does not convert.
 */
export function svgToScene(svg: string): ExcalidrawScene | undefined {
  if (!canConvertToScene(svg)) return undefined
  const items = parseSvg(svg)

  const elements: Element[] = []
  const byId = new Map<string, Element>()
  const add = (element: Element) => {
    elements.push(element)
    byId.set(element.id, element)
    return element
  }
  const bind = (container: Element, child: Element, type: string) => {
    container.boundElements = [...(container.boundElements ?? []), { type, id: child.id }]
  }

  // Boxes first, so arrows can bind to them whatever the SVG order.
  const groups = new Map<Attrs, SvgItem[]>()
  for (const item of items) {
    if (item.group?.['data-id'] === undefined) continue
    groups.set(item.group, [...(groups.get(item.group) ?? []), item])
  }
  for (const [group, members] of groups) {
    const shapes = members.filter(item => ['rect', 'polygon', 'circle'].includes(item.tag))
    const texts = members.filter(item => item.tag === 'text')
    const [outer] = shapes
    if (outer === undefined) continue

    const box = add(shapeElement(`box-${group['data-id']}`, outer, elements.length))
    // A flowchart or state node and a sequence actor hold one centered label;
    // a class or an entity lays out its own lines.
    const isSimpleBox = texts.length === 1 && (group.class === 'node' || group.class === 'actor')
    if (isSimpleBox) {
      const label = add(textElement(`${box.id}-label`, texts[0]!, elements.length))
      Object.assign(label, centeredIn(box, label), { containerId: box.id, textAlign: 'center', verticalAlign: 'middle' })
      bind(box, label, 'text')
    }

    for (const item of members) {
      if (item === outer || (isSimpleBox && item.tag === 'text')) continue
      // A class or entity header repeats the box's own outline.
      if (item.tag === 'rect' && item.attrs.x === outer.attrs.x && item.attrs.y === outer.attrs.y) continue
      const extra = convertItem(item, `${box.id}-${elements.length}`, elements.length)
      if (extra) add(extra)
    }
  }

  const arrows: Element[] = []
  for (const item of items) {
    if (item.group?.['data-id'] !== undefined) continue
    const id = `item-${elements.length}`
    const groupClass = item.group?.class

    if (item.tag === 'polyline' && /\b(edge|class-relationship|er-relationship)\b/.test(item.attrs.class ?? '')) {
      const arrow = add(linkElement(id, item, elements.length))
      bindEnds(arrow, item.attrs, byId, bind)
      arrows.push(arrow)
      continue
    }
    if (groupClass === 'edge-label') {
      if (item.tag !== 'text') continue
      const label = add(textElement(id, item, elements.length))
      const arrow = arrows.find(candidate => candidate.edge === `${item.group!['data-from']}->${item.group!['data-to']}` && !candidate.boundElements?.length)
      if (arrow) {
        Object.assign(label, { containerId: arrow.id, textAlign: 'center', verticalAlign: 'middle' })
        bind(arrow, label, 'text')
      }
      continue
    }
    if (groupClass === 'message' && (item.tag === 'line' || item.tag === 'polyline')) {
      const arrow = add(linkElement(id, item, elements.length))
      arrow.endArrowhead = item.group!['data-arrow-head'] === 'filled' ? 'triangle' : 'arrow'
      if (item.group!['data-line-style'] === 'dashed') arrow.strokeStyle = 'dashed'
      continue
    }
    if (groupClass === 'note' && item.tag === 'polygon') {
      // The second polygon is the folded corner.
      if (elements.some(element => element.note === item.group)) continue
      add({ ...shapeElement(id, { ...item, tag: 'rect', attrs: boundingRect(item.attrs.points ?? '') }, elements.length), note: item.group })
      continue
    }
    // ER cardinality glyphs and label backgrounds outside any group: the
    // relationship's arrowheads and its text already say it.
    if (item.group === undefined && svg.includes('er-relationship') && item.tag !== 'text') continue

    const element = convertItem(item, id, elements.length)
    if (element) add(element)
  }

  // A note's text belongs in the note.
  for (const element of elements) {
    if (element.note === undefined) continue
    const text = elements.find(candidate => candidate.type === 'text' && candidate.group === element.note)
    if (text) {
      Object.assign(text, centeredIn(element, text), { containerId: element.id, textAlign: 'center', verticalAlign: 'middle' })
      bind(element, text, 'text')
    }
  }

  return {
    type: 'excalidraw',
    version: 2,
    source: 'mermaid-render',
    elements: elements.map(({ edge, note, group, ...element }) => element as Element),
    appState: { viewBackgroundColor: '#ffffff' },
    files: {},
  }
}

/**
 * The link that opens excalidraw.com on a scene: the scene travels in the
 * fragment as a data: URL, which the browser never sends to the server.
 */
export function excalidrawUrl(scene: ExcalidrawScene): string {
  const bytes = new TextEncoder().encode(JSON.stringify(scene))
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)

  return `https://excalidraw.com/#url=${encodeURIComponent(`data:application/json;base64,${btoa(binary)}`)}`
}

function bindEnds(arrow: Element, attrs: Attrs, byId: Map<string, Element>, bind: (container: Element, child: Element, type: string) => void) {
  const from = attrs['data-from'] ?? attrs['data-entity1']
  const to = attrs['data-to'] ?? attrs['data-entity2']
  arrow.edge = `${from}->${to}`

  for (const [end, nodeId] of [['startBinding', from], ['endBinding', to]] as const) {
    const box = byId.get(`box-${nodeId}`)
    if (box === undefined) continue
    arrow[end] = { elementId: box.id, focus: 0, gap: 4 }
    bind(box, arrow, 'arrow')
  }
}

function linkElement(id: string, item: SvgItem, seed: number): Element {
  const points = item.tag === 'line'
    ? [[num(item.attrs.x1), num(item.attrs.y1)], [num(item.attrs.x2), num(item.attrs.y2)]]
    : parsePoints(item.attrs.points ?? '')
  const [x0, y0] = points[0] ?? [0, 0]
  const attrs = item.attrs
  const marker = (side: 'start' | 'end') => {
    if (attrs['data-cardinality1'] !== undefined) {
      return CARDINALITY[attrs[side === 'start' ? 'data-cardinality1' : 'data-cardinality2'] ?? ''] ?? null
    }
    if (attrs[`marker-${side}`] === undefined) return null
    return CLASS_ARROWHEAD[attrs['data-type'] ?? ''] ?? 'arrow'
  }

  return {
    ...base(id, 'arrow', x0!, y0!, seed),
    points: points.map(([x, y]) => [x! - x0!, y! - y0!]),
    startArrowhead: marker('start'),
    endArrowhead: marker('end'),
    strokeStyle: attrs['stroke-dasharray'] !== undefined || attrs['data-identifying'] === 'false' ? 'dashed' : 'solid',
    group: item.group,
  }
}

function convertItem(item: SvgItem, id: string, seed: number): Element | undefined {
  switch (item.tag) {
    case 'rect':
    case 'circle':
    case 'polygon':
      return shapeElement(id, item, seed)
    case 'line':
    case 'polyline':
      return { ...linkElement(id, item, seed), type: 'line', startArrowhead: null, endArrowhead: null }
    case 'text':
      return item.text === '' ? undefined : textElement(id, item, seed)
    default:
      return undefined
  }
}

function shapeElement(id: string, item: SvgItem, seed: number): Element {
  const { attrs } = item
  const isFilled = attrs.fill !== undefined && attrs.fill !== 'none' && item.tag === 'circle' && attrs.stroke === 'none'
  const fill = isFilled ? { backgroundColor: INK, fillStyle: 'solid' } : {}

  if (item.tag === 'circle') {
    const r = num(attrs.r)
    return { ...base(id, 'ellipse', num(attrs.cx) - r, num(attrs.cy) - r, seed), width: 2 * r, height: 2 * r, ...fill }
  }
  if (item.tag === 'polygon') {
    const points = parsePoints(attrs.points ?? '')
    const box = boundingRect(attrs.points ?? '')
    if (points.length === 4) return { ...base(id, 'diamond', num(box.x), num(box.y), seed), width: num(box.width), height: num(box.height) }

    const [x0, y0] = points[0] ?? [0, 0]
    return {
      ...base(id, 'line', x0!, y0!, seed),
      points: [...points, points[0]!].map(([x, y]) => [x! - x0!, y! - y0!]),
      polygon: true,
    }
  }

  return {
    ...base(id, 'rectangle', num(attrs.x), num(attrs.y), seed),
    width: num(attrs.width),
    height: num(attrs.height),
    roundness: num(attrs.rx) > 0 ? { type: 3 } : null,
  }
}

function textElement(id: string, item: SvgItem, seed: number): Element {
  const fontSize = num(item.attrs['font-size']) || 13
  const lines = item.text.split('\n')
  const width = Math.max(...lines.map(line => [...line].length)) * fontSize * 0.6
  const height = lines.length * fontSize * 1.25
  const isCentered = item.attrs['text-anchor'] === 'middle'
  const x = num(item.attrs.x)

  return {
    ...base(id, 'text', isCentered ? x - width / 2 : x, num(item.attrs.y) - height / 2, seed),
    width,
    height,
    text: item.text,
    originalText: item.text,
    fontSize,
    fontFamily: EXCALIFONT,
    textAlign: isCentered ? 'center' : 'left',
    verticalAlign: 'top',
    containerId: null,
    group: item.group,
  }
}

function base(id: string, type: string, x: number, y: number, seed: number): Element {
  return { id, type, x, y, strokeColor: INK, backgroundColor: 'transparent', strokeWidth: 1, roughness: 1, seed: seed + 1 }
}

function centeredIn(box: Element, text: Element): { x: number; y: number } {
  return {
    x: (box.x as number) + ((box.width as number) - (text.width as number)) / 2,
    y: (box.y as number) + ((box.height as number) - (text.height as number)) / 2,
  }
}

function boundingRect(points: string): Attrs {
  const xs = parsePoints(points).map(([x]) => x!)
  const ys = parsePoints(points).map(([, y]) => y!)
  const [x, y] = [Math.min(...xs), Math.min(...ys)]

  return { x: String(x), y: String(y), width: String(Math.max(...xs) - x), height: String(Math.max(...ys) - y) }
}

function parsePoints(points: string): number[][] {
  return points.trim().split(/\s+/).filter(Boolean).map(pair => pair.split(',').map(Number))
}

function num(value: string | undefined): number {
  return value === undefined ? 0 : Number(value)
}

function parseAttrs(source: string): Attrs {
  const attrs: Attrs = {}
  for (const match of source.matchAll(/([\w:-]+)="([^"]*)"/g)) attrs[match[1]!] = decodeEntities(match[2]!)
  return attrs
}

function decodeEntities(text: string): string {
  return text
    .replace(/&#x([0-9a-fA-F]+);/g, (all, hex: string) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (all, dec: string) => String.fromCodePoint(Number(dec)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
}

// beautiful-mermaid's SVG is flat: drawing elements, at most one <g> deep,
// <text> holding plain text or <tspan>s.
function parseSvg(svg: string): SvgItem[] {
  const body = svg.replace(/<style>[\s\S]*?<\/style>/g, '').replace(/<defs>[\s\S]*?<\/defs>/g, '')
  const items: SvgItem[] = []
  let group: Attrs | undefined
  const tag = /<(\/?)([a-zA-Z]+)([^>]*?)(\/?)>/g

  let match: RegExpExecArray | null
  while ((match = tag.exec(body)) !== null) {
    const [, closing, name, rawAttrs, selfClosing] = match
    if (name === 'svg' || name === 'tspan') continue
    if (name === 'g') {
      group = closing ? undefined : parseAttrs(rawAttrs!)
      continue
    }
    if (closing) continue

    const attrs = parseAttrs(rawAttrs!)
    if (name === 'text' && !selfClosing) {
      const end = body.indexOf('</text>', tag.lastIndex)
      const inner = body.slice(tag.lastIndex, end).replace(/<[^>]+>/g, '')
      tag.lastIndex = end + '</text>'.length
      items.push({ tag: name, attrs, text: decodeEntities(inner).trim(), group })
      continue
    }
    items.push({ tag: name!, attrs, text: '', group })
  }
  return items
}
