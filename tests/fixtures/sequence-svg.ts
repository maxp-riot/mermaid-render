// beautiful-mermaid 1.1.3's SVG, in the mod's dark palette, as renderer/render.js
// prints it for:
//   sequenceDiagram
//     participant C as Claude
//     participant M as Mod
//     C->>M: réponse
//     M-->>C: image
//     Note over C,M: rendu local
export const SEQUENCE_SVG = String.raw`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 215" width="280" height="215" style="--bg:#282c34;--fg:#ffffff">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap');
  text { font-family: 'Inter', system-ui, sans-serif; }
  svg {
    /* Derived from --bg and --fg (overridable via --line, --accent, etc.) */
    --_text:          var(--fg);
    --_text-sec:      var(--muted, color-mix(in srgb, var(--fg) 60%, var(--bg)));
    --_text-muted:    var(--muted, color-mix(in srgb, var(--fg) 40%, var(--bg)));
    --_text-faint:    color-mix(in srgb, var(--fg) 25%, var(--bg));
    --_line:          var(--line, color-mix(in srgb, var(--fg) 50%, var(--bg)));
    --_arrow:         var(--accent, color-mix(in srgb, var(--fg) 85%, var(--bg)));
    --_node-fill:     var(--surface, color-mix(in srgb, var(--fg) 3%, var(--bg)));
    --_node-stroke:   var(--border, color-mix(in srgb, var(--fg) 20%, var(--bg)));
    --_group-fill:    var(--bg);
    --_group-hdr:     color-mix(in srgb, var(--fg) 5%, var(--bg));
    --_inner-stroke:  color-mix(in srgb, var(--fg) 12%, var(--bg));
    --_key-badge:     color-mix(in srgb, var(--fg) 10%, var(--bg));
  }
</style>
<defs>
  <marker id="seq-arrow" markerWidth="8" markerHeight="5" refX="8" refY="2.5" orient="auto-start-reverse">
    <polygon points="0 0, 8 2.5, 0 5" fill="var(--_arrow)" />
  </marker>
  <marker id="seq-arrow-open" markerWidth="8" markerHeight="5" refX="8" refY="2.5" orient="auto-start-reverse">
    <polyline points="0 0, 8 2.5, 0 5" fill="none" stroke="var(--_arrow)" stroke-width="1" />
  </marker>
</defs>
<line class="lifeline" data-actor="C" x1="70" y1="70" x2="70" y2="185" stroke="var(--_line)" stroke-width="0.75" stroke-dasharray="6 4" />
<line class="lifeline" data-actor="M" x1="210" y1="70" x2="210" y2="185" stroke="var(--_line)" stroke-width="0.75" stroke-dasharray="6 4" />
<g class="message" data-from="C" data-to="M" data-label="réponse" data-line-style="solid" data-arrow-head="filled" data-self="false">
  <line x1="70" y1="90" x2="210" y2="90" stroke="var(--_line)" stroke-width="1" marker-end="url(#seq-arrow)" />
  <text x="140" y="80" font-size="11" text-anchor="middle" font-weight="400" fill="var(--_text-muted)" dy="3.8499999999999996">réponse</text>
</g>
<g class="message" data-from="M" data-to="C" data-label="image" data-line-style="dashed" data-arrow-head="filled" data-self="false">
  <line x1="210" y1="130" x2="70" y2="130" stroke="var(--_line)" stroke-width="1" stroke-dasharray="6 4" marker-end="url(#seq-arrow)" />
  <text x="140" y="120" font-size="11" text-anchor="middle" font-weight="400" fill="var(--_text-muted)" dy="3.8499999999999996">image</text>
</g>
<g class="note" data-position="over" data-actors="C,M">
  <polygon points="100.74199999999999,138 173.25799999999998,138 179.25799999999998,144 179.25799999999998,161 100.74199999999999,161" fill="var(--bg)" stroke="var(--_node-stroke)" stroke-width="0.75" />
  <polygon points="173.25799999999998,138 179.25799999999998,144 173.25799999999998,144" fill="var(--_inner-stroke)" stroke="var(--_node-stroke)" stroke-width="0.75" />
  <text x="140" y="149.5" font-size="11" text-anchor="middle" font-weight="400" fill="var(--_text-muted)" dy="3.8499999999999996">rendu local</text>
</g>
<g class="actor" data-id="C" data-label="Claude" data-type="participant">
  <rect x="30" y="30" width="80" height="40" rx="4" ry="4" fill="var(--_node-fill)" stroke="var(--_node-stroke)" stroke-width="1" />
  <text x="70" y="50" font-size="13" text-anchor="middle" font-weight="500" fill="var(--_text)" dy="4.55">Claude</text>
</g>
<g class="actor" data-id="M" data-label="Mod" data-type="participant">
  <rect x="170" y="30" width="80" height="40" rx="4" ry="4" fill="var(--_node-fill)" stroke="var(--_node-stroke)" stroke-width="1" />
  <text x="210" y="50" font-size="13" text-anchor="middle" font-weight="500" fill="var(--_text)" dy="4.55">Mod</text>
</g>
</svg>`
