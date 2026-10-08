// beautiful-mermaid 1.1.3's SVG, in the mod's dark palette, as renderer/render.js
// prints it for:
//   flowchart TD
//     A[Réponse de Claude] --> B{Bloc mermaid fermé ?}
//     B -- non --> C[Affichage normal]
//     B -- oui --> D[beautiful-mermaid]
//     D -.-> E[Schéma dessiné]
export const FLOWCHART_SVG = String.raw`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390.488 591.2149999999999" width="390.488" height="591.2149999999999" style="--bg:#282c34;--fg:#ffffff">
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
  <marker id="arrowhead" markerWidth="8" markerHeight="5" refX="7" refY="2.5" orient="auto">
    <polygon points="0 0, 8 2.5, 0 5" fill="var(--_arrow)" stroke="var(--_arrow)" stroke-width="0.75" stroke-linejoin="round" />
  </marker>
  <marker id="arrowhead-start" markerWidth="8" markerHeight="5" refX="1" refY="2.5" orient="auto-start-reverse">
    <polygon points="8 0, 0 2.5, 8 5" fill="var(--_arrow)" stroke="var(--_arrow)" stroke-width="0.75" stroke-linejoin="round" />
  </marker>
</defs>
<polyline class="edge" data-from="A" data-to="B" data-style="solid" data-arrow-start="false" data-arrow-end="true" points="194.1325,76.9 194.1325,124.9" fill="none" stroke="var(--_line)" stroke-width="1" marker-end="url(#arrowhead)" />
<polyline class="edge" data-from="B" data-to="C" data-style="solid" data-arrow-start="false" data-arrow-end="true" data-label="non" points="162.76333333333332,281.74583333333334 162.76333333333332,349.115 109.5105,349.115 109.5105,429.41499999999996" fill="none" stroke="var(--_line)" stroke-width="1" marker-end="url(#arrowhead)" />
<polyline class="edge" data-from="B" data-to="D" data-style="solid" data-arrow-start="false" data-arrow-end="true" data-label="oui" points="225.50166666666667,281.74583333333334 225.50166666666667,349.115 278.7545,349.115 278.7545,429.41499999999996" fill="none" stroke="var(--_line)" stroke-width="1" marker-end="url(#arrowhead)" />
<polyline class="edge" data-from="D" data-to="E" data-style="dotted" data-arrow-start="false" data-arrow-end="true" points="278.7545,466.31499999999994 278.7545,514.3149999999999" fill="none" stroke="var(--_line)" stroke-width="1" stroke-dasharray="4 4" marker-end="url(#arrowhead)" />
<g class="edge-label" data-from="B" data-to="C" data-label="non">
  <rect x="91.5105" y="356.115" width="35.47" height="30.3" rx="2" ry="2" fill="var(--bg)" stroke="var(--_inner-stroke)" stroke-width="1" />
  <text x="109.24549999999999" y="371.265" text-anchor="middle" font-size="11" font-weight="400" fill="var(--_text-sec)" dy="3.8499999999999996">non</text>
</g>
<g class="edge-label" data-from="B" data-to="D" data-label="oui">
  <rect x="262.7545" y="356.115" width="31.906" height="30.3" rx="2" ry="2" fill="var(--bg)" stroke="var(--_inner-stroke)" stroke-width="1" />
  <text x="278.7075" y="371.265" text-anchor="middle" font-size="11" font-weight="400" fill="var(--_text-sec)" dy="3.8499999999999996">oui</text>
</g>
<g class="node" data-id="A" data-label="Réponse de Claude" data-shape="rectangle">
  <rect x="116.10049999999998" y="40" width="156.06400000000002" height="36.900000000000006" rx="0" ry="0" fill="var(--_node-fill)" stroke="var(--_node-stroke)" stroke-width="0.75" />
  <text x="194.1325" y="58.45" text-anchor="middle" font-size="13" font-weight="500" fill="var(--_text)" dy="4.55">Réponse de Claude</text>
</g>
<g class="node" data-id="B" data-label="Bloc mermaid fermé ?" data-shape="diamond">
  <polygon points="194.1325,124.9 288.24,219.0075 194.1325,313.115 100.025,219.0075" fill="var(--_node-fill)" stroke="var(--_node-stroke)" stroke-width="0.75" />
  <text x="194.1325" y="219.0075" text-anchor="middle" font-size="13" font-weight="500" fill="var(--_text)" dy="4.55">Bloc mermaid fermé ?</text>
</g>
<g class="node" data-id="C" data-label="Affichage normal" data-shape="rectangle">
  <rect x="40" y="429.41499999999996" width="139.021" height="36.900000000000006" rx="0" ry="0" fill="var(--_node-fill)" stroke="var(--_node-stroke)" stroke-width="0.75" />
  <text x="109.5105" y="447.86499999999995" text-anchor="middle" font-size="13" font-weight="500" fill="var(--_text)" dy="4.55">Affichage normal</text>
</g>
<g class="node" data-id="D" data-label="beautiful-mermaid" data-shape="rectangle">
  <rect x="207.021" y="429.41499999999996" width="143.467" height="36.900000000000006" rx="0" ry="0" fill="var(--_node-fill)" stroke="var(--_node-stroke)" stroke-width="0.75" />
  <text x="278.7545" y="447.86499999999995" text-anchor="middle" font-size="13" font-weight="500" fill="var(--_text)" dy="4.55">beautiful-mermaid</text>
</g>
<g class="node" data-id="E" data-label="Schéma dessiné" data-shape="rectangle">
  <rect x="209.244" y="514.3149999999999" width="139.021" height="36.900000000000006" rx="0" ry="0" fill="var(--_node-fill)" stroke="var(--_node-stroke)" stroke-width="0.75" />
  <text x="278.7545" y="532.765" text-anchor="middle" font-size="13" font-weight="500" fill="var(--_text)" dy="4.55">Schéma dessiné</text>
</g>
</svg>`
