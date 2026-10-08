// beautiful-mermaid 1.1.3's SVG, in the mod's dark palette, as renderer/render.js
// prints it for:
//   erDiagram
//     CUSTOMER ||--o{ ORDER : places
export const ER_SVG = String.raw`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 581.726 136" width="581.726" height="136" style="--bg:#282c34;--fg:#ffffff">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap');
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&amp;display=swap');
  text { font-family: 'Inter', system-ui, sans-serif; }
  .mono { font-family: 'JetBrains Mono', 'SF Mono', 'Fira Code', ui-monospace, monospace; }
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
</defs>
<polyline class="er-relationship" data-entity1="CUSTOMER" data-entity2="ORDER" data-cardinality1="one" data-cardinality2="zero-many" data-identifying="true" data-label="places" points="180,68 401.726,68" fill="none" stroke="var(--_line)" stroke-width="1" />
<g class="entity" data-id="CUSTOMER" data-label="CUSTOMER">
  <rect x="40" y="40" width="140" height="56" rx="0" ry="0" fill="var(--_node-fill)" stroke="var(--_node-stroke)" stroke-width="1" />
  <rect x="40" y="40" width="140" height="34" rx="0" ry="0" fill="var(--_group-hdr)" stroke="var(--_node-stroke)" stroke-width="1" />
  <text x="110" y="57" text-anchor="middle" font-size="13" font-weight="700" fill="var(--_text)" dy="4.55">CUSTOMER</text>
  <line x1="40" y1="74" x2="180" y2="74" stroke="var(--_node-stroke)" stroke-width="0.75" />
  <text x="110" y="85" text-anchor="middle" dy="0.35em" font-size="11" fill="var(--_text-faint)" font-style="italic">(no attributes)</text>
</g>
<g class="entity" data-id="ORDER" data-label="ORDER">
  <rect x="401.726" y="40" width="140" height="56" rx="0" ry="0" fill="var(--_node-fill)" stroke="var(--_node-stroke)" stroke-width="1" />
  <rect x="401.726" y="40" width="140" height="34" rx="0" ry="0" fill="var(--_group-hdr)" stroke="var(--_node-stroke)" stroke-width="1" />
  <text x="471.726" y="57" text-anchor="middle" font-size="13" font-weight="700" fill="var(--_text)" dy="4.55">ORDER</text>
  <line x1="401.726" y1="74" x2="541.726" y2="74" stroke="var(--_node-stroke)" stroke-width="0.75" />
  <text x="471.726" y="85" text-anchor="middle" dy="0.35em" font-size="11" fill="var(--_text-faint)" font-style="italic">(no attributes)</text>
</g>
<line x1="184" y1="62" x2="184" y2="74" stroke="var(--_line)" stroke-width="1.25" />
<line x1="188" y1="62" x2="188" y2="74" stroke="var(--_line)" stroke-width="1.25" />
<line x1="397.726" y1="75" x2="385.726" y2="68" stroke="var(--_line)" stroke-width="1.25" />
<line x1="397.726" y1="68" x2="385.726" y2="68" stroke="var(--_line)" stroke-width="1.25" />
<line x1="397.726" y1="61" x2="385.726" y2="68" stroke="var(--_line)" stroke-width="1.25" />
<circle cx="381.726" cy="68" r="4" fill="var(--bg)" stroke="var(--_line)" stroke-width="1.25" />
<rect x="270" y="57.85" width="41.726000000000006" height="20.3" rx="2" ry="2" fill="var(--bg)" stroke="var(--_inner-stroke)" stroke-width="0.5" />
<text x="290.863" y="68" text-anchor="middle" font-size="11" font-weight="400" fill="var(--_text-muted)" dy="3.8499999999999996">places</text>
</svg>`
