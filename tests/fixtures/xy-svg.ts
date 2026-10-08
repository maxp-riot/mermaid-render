// beautiful-mermaid 1.1.3's SVG, in the mod's dark palette, as renderer/render.js
// prints it for:
//   xychart-beta
//     title "Example"
//     x-axis [jan, feb, mar]
//     y-axis "Count" 0 --> 20
//     bar [5, 12, 9]
//     line [4, 10, 15]
export const XYCHART_SVG = String.raw`<svg data-xychart-colors="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 492" width="750" height="492" style="--bg:#282c34;--fg:#ffffff">
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
<style>
  .xychart-grid { fill: var(--_inner-stroke); stroke: none; opacity: 0.65; }
  .xychart-bar { stroke-width: 1.5; }
  .xychart-line { fill: none; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
  .xychart-line-shadow { fill: none; stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; opacity: 0.12; }
  .xychart-dot { stroke: var(--bg); stroke-width: 2; }
  .xychart-label { fill: var(--_text-muted); }
  .xychart-axis-title { fill: var(--_text-sec); }
  .xychart-title { fill: var(--_text); }
  svg {
    --xychart-color-0: var(--accent, #3b82f6);
    --xychart-bar-fill-0: color-mix(in srgb, var(--bg) 75%, var(--xychart-color-0) 25%);
    --xychart-color-1: #5f79f2;
    --xychart-bar-fill-1: color-mix(in srgb, var(--bg) 75%, var(--xychart-color-1) 25%);
  }
  .xychart-bar.xychart-color-0 { stroke: var(--xychart-color-0); fill: var(--xychart-bar-fill-0); }
  path.xychart-color-0, line.xychart-color-0 { stroke: var(--xychart-color-0); }
  circle.xychart-color-0 { fill: var(--xychart-color-0); }
  .xychart-bar.xychart-color-1 { stroke: var(--xychart-color-1); fill: var(--xychart-bar-fill-1); }
  path.xychart-color-1, line.xychart-color-1 { stroke: var(--xychart-color-1); }
  circle.xychart-color-1 { fill: var(--xychart-color-1); }
</style>
<circle cx="128" cy="92" r="1.5" class="xychart-grid"/>
<circle cx="148" cy="92" r="1.5" class="xychart-grid"/>
<circle cx="168" cy="92" r="1.5" class="xychart-grid"/>
<circle cx="188" cy="92" r="1.5" class="xychart-grid"/>
<circle cx="208" cy="92" r="1.5" class="xychart-grid"/>
<circle cx="228" cy="92" r="1.5" class="xychart-grid"/>
<circle cx="248" cy="92" r="1.5" class="xychart-grid"/>
<circle cx="268" cy="92" r="1.5" class="xychart-grid"/>
<circle cx="288" cy="92" r="1.5" class="xychart-grid"/>
<circle cx="308" cy="92" r="1.5" class="xychart-grid"/>
<circle cx="328" cy="92" r="1.5" class="xychart-grid"/>
<circle cx="348" cy="92" r="1.5" class="xychart-grid"/>
<circle cx="368" cy="92" r="1.5" class="xychart-grid"/>
<circle cx="388" cy="92" r="1.5" class="xychart-grid"/>
<circle cx="408" cy="92" r="1.5" class="xychart-grid"/>
<circle cx="428" cy="92" r="1.5" class="xychart-grid"/>
<circle cx="448" cy="92" r="1.5" class="xychart-grid"/>
<circle cx="468" cy="92" r="1.5" class="xychart-grid"/>
<circle cx="488" cy="92" r="1.5" class="xychart-grid"/>
<circle cx="508" cy="92" r="1.5" class="xychart-grid"/>
<circle cx="528" cy="92" r="1.5" class="xychart-grid"/>
<circle cx="548" cy="92" r="1.5" class="xychart-grid"/>
<circle cx="568" cy="92" r="1.5" class="xychart-grid"/>
<circle cx="588" cy="92" r="1.5" class="xychart-grid"/>
<circle cx="608" cy="92" r="1.5" class="xychart-grid"/>
<circle cx="628" cy="92" r="1.5" class="xychart-grid"/>
<circle cx="648" cy="92" r="1.5" class="xychart-grid"/>
<circle cx="668" cy="92" r="1.5" class="xychart-grid"/>
<circle cx="688" cy="92" r="1.5" class="xychart-grid"/>
<circle cx="708" cy="92" r="1.5" class="xychart-grid"/>
<circle cx="728" cy="92" r="1.5" class="xychart-grid"/>
<circle cx="128" cy="113.3" r="1.5" class="xychart-grid"/>
<circle cx="148" cy="113.3" r="1.5" class="xychart-grid"/>
<circle cx="168" cy="113.3" r="1.5" class="xychart-grid"/>
<circle cx="188" cy="113.3" r="1.5" class="xychart-grid"/>
<circle cx="208" cy="113.3" r="1.5" class="xychart-grid"/>
<circle cx="228" cy="113.3" r="1.5" class="xychart-grid"/>
<circle cx="248" cy="113.3" r="1.5" class="xychart-grid"/>
<circle cx="268" cy="113.3" r="1.5" class="xychart-grid"/>
<circle cx="288" cy="113.3" r="1.5" class="xychart-grid"/>
<circle cx="308" cy="113.3" r="1.5" class="xychart-grid"/>
<circle cx="328" cy="113.3" r="1.5" class="xychart-grid"/>
<circle cx="348" cy="113.3" r="1.5" class="xychart-grid"/>
<circle cx="368" cy="113.3" r="1.5" class="xychart-grid"/>
<circle cx="388" cy="113.3" r="1.5" class="xychart-grid"/>
<circle cx="408" cy="113.3" r="1.5" class="xychart-grid"/>
<circle cx="428" cy="113.3" r="1.5" class="xychart-grid"/>
<circle cx="448" cy="113.3" r="1.5" class="xychart-grid"/>
<circle cx="468" cy="113.3" r="1.5" class="xychart-grid"/>
<circle cx="488" cy="113.3" r="1.5" class="xychart-grid"/>
<circle cx="508" cy="113.3" r="1.5" class="xychart-grid"/>
<circle cx="528" cy="113.3" r="1.5" class="xychart-grid"/>
<circle cx="548" cy="113.3" r="1.5" class="xychart-grid"/>
<circle cx="568" cy="113.3" r="1.5" class="xychart-grid"/>
<circle cx="588" cy="113.3" r="1.5" class="xychart-grid"/>
<circle cx="608" cy="113.3" r="1.5" class="xychart-grid"/>
<circle cx="628" cy="113.3" r="1.5" class="xychart-grid"/>
<circle cx="648" cy="113.3" r="1.5" class="xychart-grid"/>
<circle cx="668" cy="113.3" r="1.5" class="xychart-grid"/>
<circle cx="688" cy="113.3" r="1.5" class="xychart-grid"/>
<circle cx="708" cy="113.3" r="1.5" class="xychart-grid"/>
<circle cx="728" cy="113.3" r="1.5" class="xychart-grid"/>
<circle cx="128" cy="134.5" r="1.5" class="xychart-grid"/>
<circle cx="148" cy="134.5" r="1.5" class="xychart-grid"/>
<circle cx="168" cy="134.5" r="1.5" class="xychart-grid"/>
<circle cx="188" cy="134.5" r="1.5" class="xychart-grid"/>
<circle cx="208" cy="134.5" r="1.5" class="xychart-grid"/>
<circle cx="228" cy="134.5" r="1.5" class="xychart-grid"/>
<circle cx="248" cy="134.5" r="1.5" class="xychart-grid"/>
<circle cx="268" cy="134.5" r="1.5" class="xychart-grid"/>
<circle cx="288" cy="134.5" r="1.5" class="xychart-grid"/>
<circle cx="308" cy="134.5" r="1.5" class="xychart-grid"/>
<circle cx="328" cy="134.5" r="1.5" class="xychart-grid"/>
<circle cx="348" cy="134.5" r="1.5" class="xychart-grid"/>
<circle cx="368" cy="134.5" r="1.5" class="xychart-grid"/>
<circle cx="388" cy="134.5" r="1.5" class="xychart-grid"/>
<circle cx="408" cy="134.5" r="1.5" class="xychart-grid"/>
<circle cx="428" cy="134.5" r="1.5" class="xychart-grid"/>
<circle cx="448" cy="134.5" r="1.5" class="xychart-grid"/>
<circle cx="468" cy="134.5" r="1.5" class="xychart-grid"/>
<circle cx="488" cy="134.5" r="1.5" class="xychart-grid"/>
<circle cx="508" cy="134.5" r="1.5" class="xychart-grid"/>
<circle cx="528" cy="134.5" r="1.5" class="xychart-grid"/>
<circle cx="548" cy="134.5" r="1.5" class="xychart-grid"/>
<circle cx="568" cy="134.5" r="1.5" class="xychart-grid"/>
<circle cx="588" cy="134.5" r="1.5" class="xychart-grid"/>
<circle cx="608" cy="134.5" r="1.5" class="xychart-grid"/>
<circle cx="628" cy="134.5" r="1.5" class="xychart-grid"/>
<circle cx="648" cy="134.5" r="1.5" class="xychart-grid"/>
<circle cx="668" cy="134.5" r="1.5" class="xychart-grid"/>
<circle cx="688" cy="134.5" r="1.5" class="xychart-grid"/>
<circle cx="708" cy="134.5" r="1.5" class="xychart-grid"/>
<circle cx="728" cy="134.5" r="1.5" class="xychart-grid"/>
<circle cx="128" cy="155.8" r="1.5" class="xychart-grid"/>
<circle cx="148" cy="155.8" r="1.5" class="xychart-grid"/>
<circle cx="168" cy="155.8" r="1.5" class="xychart-grid"/>
<circle cx="188" cy="155.8" r="1.5" class="xychart-grid"/>
<circle cx="208" cy="155.8" r="1.5" class="xychart-grid"/>
<circle cx="228" cy="155.8" r="1.5" class="xychart-grid"/>
<circle cx="248" cy="155.8" r="1.5" class="xychart-grid"/>
<circle cx="268" cy="155.8" r="1.5" class="xychart-grid"/>
<circle cx="288" cy="155.8" r="1.5" class="xychart-grid"/>
<circle cx="308" cy="155.8" r="1.5" class="xychart-grid"/>
<circle cx="328" cy="155.8" r="1.5" class="xychart-grid"/>
<circle cx="348" cy="155.8" r="1.5" class="xychart-grid"/>
<circle cx="368" cy="155.8" r="1.5" class="xychart-grid"/>
<circle cx="388" cy="155.8" r="1.5" class="xychart-grid"/>
<circle cx="408" cy="155.8" r="1.5" class="xychart-grid"/>
<circle cx="428" cy="155.8" r="1.5" class="xychart-grid"/>
<circle cx="448" cy="155.8" r="1.5" class="xychart-grid"/>
<circle cx="468" cy="155.8" r="1.5" class="xychart-grid"/>
<circle cx="488" cy="155.8" r="1.5" class="xychart-grid"/>
<circle cx="508" cy="155.8" r="1.5" class="xychart-grid"/>
<circle cx="528" cy="155.8" r="1.5" class="xychart-grid"/>
<circle cx="548" cy="155.8" r="1.5" class="xychart-grid"/>
<circle cx="568" cy="155.8" r="1.5" class="xychart-grid"/>
<circle cx="588" cy="155.8" r="1.5" class="xychart-grid"/>
<circle cx="608" cy="155.8" r="1.5" class="xychart-grid"/>
<circle cx="628" cy="155.8" r="1.5" class="xychart-grid"/>
<circle cx="648" cy="155.8" r="1.5" class="xychart-grid"/>
<circle cx="668" cy="155.8" r="1.5" class="xychart-grid"/>
<circle cx="688" cy="155.8" r="1.5" class="xychart-grid"/>
<circle cx="708" cy="155.8" r="1.5" class="xychart-grid"/>
<circle cx="728" cy="155.8" r="1.5" class="xychart-grid"/>
<circle cx="128" cy="177" r="1.5" class="xychart-grid"/>
<circle cx="148" cy="177" r="1.5" class="xychart-grid"/>
<circle cx="168" cy="177" r="1.5" class="xychart-grid"/>
<circle cx="188" cy="177" r="1.5" class="xychart-grid"/>
<circle cx="208" cy="177" r="1.5" class="xychart-grid"/>
<circle cx="228" cy="177" r="1.5" class="xychart-grid"/>
<circle cx="248" cy="177" r="1.5" class="xychart-grid"/>
<circle cx="268" cy="177" r="1.5" class="xychart-grid"/>
<circle cx="288" cy="177" r="1.5" class="xychart-grid"/>
<circle cx="308" cy="177" r="1.5" class="xychart-grid"/>
<circle cx="328" cy="177" r="1.5" class="xychart-grid"/>
<circle cx="348" cy="177" r="1.5" class="xychart-grid"/>
<circle cx="368" cy="177" r="1.5" class="xychart-grid"/>
<circle cx="388" cy="177" r="1.5" class="xychart-grid"/>
<circle cx="408" cy="177" r="1.5" class="xychart-grid"/>
<circle cx="428" cy="177" r="1.5" class="xychart-grid"/>
<circle cx="448" cy="177" r="1.5" class="xychart-grid"/>
<circle cx="468" cy="177" r="1.5" class="xychart-grid"/>
<circle cx="488" cy="177" r="1.5" class="xychart-grid"/>
<circle cx="508" cy="177" r="1.5" class="xychart-grid"/>
<circle cx="528" cy="177" r="1.5" class="xychart-grid"/>
<circle cx="548" cy="177" r="1.5" class="xychart-grid"/>
<circle cx="568" cy="177" r="1.5" class="xychart-grid"/>
<circle cx="588" cy="177" r="1.5" class="xychart-grid"/>
<circle cx="608" cy="177" r="1.5" class="xychart-grid"/>
<circle cx="628" cy="177" r="1.5" class="xychart-grid"/>
<circle cx="648" cy="177" r="1.5" class="xychart-grid"/>
<circle cx="668" cy="177" r="1.5" class="xychart-grid"/>
<circle cx="688" cy="177" r="1.5" class="xychart-grid"/>
<circle cx="708" cy="177" r="1.5" class="xychart-grid"/>
<circle cx="728" cy="177" r="1.5" class="xychart-grid"/>
<circle cx="128" cy="198.3" r="1.5" class="xychart-grid"/>
<circle cx="148" cy="198.3" r="1.5" class="xychart-grid"/>
<circle cx="168" cy="198.3" r="1.5" class="xychart-grid"/>
<circle cx="188" cy="198.3" r="1.5" class="xychart-grid"/>
<circle cx="208" cy="198.3" r="1.5" class="xychart-grid"/>
<circle cx="228" cy="198.3" r="1.5" class="xychart-grid"/>
<circle cx="248" cy="198.3" r="1.5" class="xychart-grid"/>
<circle cx="268" cy="198.3" r="1.5" class="xychart-grid"/>
<circle cx="288" cy="198.3" r="1.5" class="xychart-grid"/>
<circle cx="308" cy="198.3" r="1.5" class="xychart-grid"/>
<circle cx="328" cy="198.3" r="1.5" class="xychart-grid"/>
<circle cx="348" cy="198.3" r="1.5" class="xychart-grid"/>
<circle cx="368" cy="198.3" r="1.5" class="xychart-grid"/>
<circle cx="388" cy="198.3" r="1.5" class="xychart-grid"/>
<circle cx="408" cy="198.3" r="1.5" class="xychart-grid"/>
<circle cx="428" cy="198.3" r="1.5" class="xychart-grid"/>
<circle cx="448" cy="198.3" r="1.5" class="xychart-grid"/>
<circle cx="468" cy="198.3" r="1.5" class="xychart-grid"/>
<circle cx="488" cy="198.3" r="1.5" class="xychart-grid"/>
<circle cx="508" cy="198.3" r="1.5" class="xychart-grid"/>
<circle cx="528" cy="198.3" r="1.5" class="xychart-grid"/>
<circle cx="548" cy="198.3" r="1.5" class="xychart-grid"/>
<circle cx="568" cy="198.3" r="1.5" class="xychart-grid"/>
<circle cx="588" cy="198.3" r="1.5" class="xychart-grid"/>
<circle cx="608" cy="198.3" r="1.5" class="xychart-grid"/>
<circle cx="628" cy="198.3" r="1.5" class="xychart-grid"/>
<circle cx="648" cy="198.3" r="1.5" class="xychart-grid"/>
<circle cx="668" cy="198.3" r="1.5" class="xychart-grid"/>
<circle cx="688" cy="198.3" r="1.5" class="xychart-grid"/>
<circle cx="708" cy="198.3" r="1.5" class="xychart-grid"/>
<circle cx="728" cy="198.3" r="1.5" class="xychart-grid"/>
<circle cx="128" cy="219.5" r="1.5" class="xychart-grid"/>
<circle cx="148" cy="219.5" r="1.5" class="xychart-grid"/>
<circle cx="168" cy="219.5" r="1.5" class="xychart-grid"/>
<circle cx="188" cy="219.5" r="1.5" class="xychart-grid"/>
<circle cx="208" cy="219.5" r="1.5" class="xychart-grid"/>
<circle cx="228" cy="219.5" r="1.5" class="xychart-grid"/>
<circle cx="248" cy="219.5" r="1.5" class="xychart-grid"/>
<circle cx="268" cy="219.5" r="1.5" class="xychart-grid"/>
<circle cx="288" cy="219.5" r="1.5" class="xychart-grid"/>
<circle cx="308" cy="219.5" r="1.5" class="xychart-grid"/>
<circle cx="328" cy="219.5" r="1.5" class="xychart-grid"/>
<circle cx="348" cy="219.5" r="1.5" class="xychart-grid"/>
<circle cx="368" cy="219.5" r="1.5" class="xychart-grid"/>
<circle cx="388" cy="219.5" r="1.5" class="xychart-grid"/>
<circle cx="408" cy="219.5" r="1.5" class="xychart-grid"/>
<circle cx="428" cy="219.5" r="1.5" class="xychart-grid"/>
<circle cx="448" cy="219.5" r="1.5" class="xychart-grid"/>
<circle cx="468" cy="219.5" r="1.5" class="xychart-grid"/>
<circle cx="488" cy="219.5" r="1.5" class="xychart-grid"/>
<circle cx="508" cy="219.5" r="1.5" class="xychart-grid"/>
<circle cx="528" cy="219.5" r="1.5" class="xychart-grid"/>
<circle cx="548" cy="219.5" r="1.5" class="xychart-grid"/>
<circle cx="568" cy="219.5" r="1.5" class="xychart-grid"/>
<circle cx="588" cy="219.5" r="1.5" class="xychart-grid"/>
<circle cx="608" cy="219.5" r="1.5" class="xychart-grid"/>
<circle cx="628" cy="219.5" r="1.5" class="xychart-grid"/>
<circle cx="648" cy="219.5" r="1.5" class="xychart-grid"/>
<circle cx="668" cy="219.5" r="1.5" class="xychart-grid"/>
<circle cx="688" cy="219.5" r="1.5" class="xychart-grid"/>
<circle cx="708" cy="219.5" r="1.5" class="xychart-grid"/>
<circle cx="728" cy="219.5" r="1.5" class="xychart-grid"/>
<circle cx="128" cy="240.8" r="1.5" class="xychart-grid"/>
<circle cx="148" cy="240.8" r="1.5" class="xychart-grid"/>
<circle cx="168" cy="240.8" r="1.5" class="xychart-grid"/>
<circle cx="188" cy="240.8" r="1.5" class="xychart-grid"/>
<circle cx="208" cy="240.8" r="1.5" class="xychart-grid"/>
<circle cx="228" cy="240.8" r="1.5" class="xychart-grid"/>
<circle cx="248" cy="240.8" r="1.5" class="xychart-grid"/>
<circle cx="268" cy="240.8" r="1.5" class="xychart-grid"/>
<circle cx="288" cy="240.8" r="1.5" class="xychart-grid"/>
<circle cx="308" cy="240.8" r="1.5" class="xychart-grid"/>
<circle cx="328" cy="240.8" r="1.5" class="xychart-grid"/>
<circle cx="348" cy="240.8" r="1.5" class="xychart-grid"/>
<circle cx="368" cy="240.8" r="1.5" class="xychart-grid"/>
<circle cx="388" cy="240.8" r="1.5" class="xychart-grid"/>
<circle cx="408" cy="240.8" r="1.5" class="xychart-grid"/>
<circle cx="428" cy="240.8" r="1.5" class="xychart-grid"/>
<circle cx="448" cy="240.8" r="1.5" class="xychart-grid"/>
<circle cx="468" cy="240.8" r="1.5" class="xychart-grid"/>
<circle cx="488" cy="240.8" r="1.5" class="xychart-grid"/>
<circle cx="508" cy="240.8" r="1.5" class="xychart-grid"/>
<circle cx="528" cy="240.8" r="1.5" class="xychart-grid"/>
<circle cx="548" cy="240.8" r="1.5" class="xychart-grid"/>
<circle cx="568" cy="240.8" r="1.5" class="xychart-grid"/>
<circle cx="588" cy="240.8" r="1.5" class="xychart-grid"/>
<circle cx="608" cy="240.8" r="1.5" class="xychart-grid"/>
<circle cx="628" cy="240.8" r="1.5" class="xychart-grid"/>
<circle cx="648" cy="240.8" r="1.5" class="xychart-grid"/>
<circle cx="668" cy="240.8" r="1.5" class="xychart-grid"/>
<circle cx="688" cy="240.8" r="1.5" class="xychart-grid"/>
<circle cx="708" cy="240.8" r="1.5" class="xychart-grid"/>
<circle cx="728" cy="240.8" r="1.5" class="xychart-grid"/>
<circle cx="128" cy="262" r="1.5" class="xychart-grid"/>
<circle cx="148" cy="262" r="1.5" class="xychart-grid"/>
<circle cx="168" cy="262" r="1.5" class="xychart-grid"/>
<circle cx="188" cy="262" r="1.5" class="xychart-grid"/>
<circle cx="208" cy="262" r="1.5" class="xychart-grid"/>
<circle cx="228" cy="262" r="1.5" class="xychart-grid"/>
<circle cx="248" cy="262" r="1.5" class="xychart-grid"/>
<circle cx="268" cy="262" r="1.5" class="xychart-grid"/>
<circle cx="288" cy="262" r="1.5" class="xychart-grid"/>
<circle cx="308" cy="262" r="1.5" class="xychart-grid"/>
<circle cx="328" cy="262" r="1.5" class="xychart-grid"/>
<circle cx="348" cy="262" r="1.5" class="xychart-grid"/>
<circle cx="368" cy="262" r="1.5" class="xychart-grid"/>
<circle cx="388" cy="262" r="1.5" class="xychart-grid"/>
<circle cx="408" cy="262" r="1.5" class="xychart-grid"/>
<circle cx="428" cy="262" r="1.5" class="xychart-grid"/>
<circle cx="448" cy="262" r="1.5" class="xychart-grid"/>
<circle cx="468" cy="262" r="1.5" class="xychart-grid"/>
<circle cx="488" cy="262" r="1.5" class="xychart-grid"/>
<circle cx="508" cy="262" r="1.5" class="xychart-grid"/>
<circle cx="528" cy="262" r="1.5" class="xychart-grid"/>
<circle cx="548" cy="262" r="1.5" class="xychart-grid"/>
<circle cx="568" cy="262" r="1.5" class="xychart-grid"/>
<circle cx="588" cy="262" r="1.5" class="xychart-grid"/>
<circle cx="608" cy="262" r="1.5" class="xychart-grid"/>
<circle cx="628" cy="262" r="1.5" class="xychart-grid"/>
<circle cx="648" cy="262" r="1.5" class="xychart-grid"/>
<circle cx="668" cy="262" r="1.5" class="xychart-grid"/>
<circle cx="688" cy="262" r="1.5" class="xychart-grid"/>
<circle cx="708" cy="262" r="1.5" class="xychart-grid"/>
<circle cx="728" cy="262" r="1.5" class="xychart-grid"/>
<circle cx="128" cy="283.3" r="1.5" class="xychart-grid"/>
<circle cx="148" cy="283.3" r="1.5" class="xychart-grid"/>
<circle cx="168" cy="283.3" r="1.5" class="xychart-grid"/>
<circle cx="188" cy="283.3" r="1.5" class="xychart-grid"/>
<circle cx="208" cy="283.3" r="1.5" class="xychart-grid"/>
<circle cx="228" cy="283.3" r="1.5" class="xychart-grid"/>
<circle cx="248" cy="283.3" r="1.5" class="xychart-grid"/>
<circle cx="268" cy="283.3" r="1.5" class="xychart-grid"/>
<circle cx="288" cy="283.3" r="1.5" class="xychart-grid"/>
<circle cx="308" cy="283.3" r="1.5" class="xychart-grid"/>
<circle cx="328" cy="283.3" r="1.5" class="xychart-grid"/>
<circle cx="348" cy="283.3" r="1.5" class="xychart-grid"/>
<circle cx="368" cy="283.3" r="1.5" class="xychart-grid"/>
<circle cx="388" cy="283.3" r="1.5" class="xychart-grid"/>
<circle cx="408" cy="283.3" r="1.5" class="xychart-grid"/>
<circle cx="428" cy="283.3" r="1.5" class="xychart-grid"/>
<circle cx="448" cy="283.3" r="1.5" class="xychart-grid"/>
<circle cx="468" cy="283.3" r="1.5" class="xychart-grid"/>
<circle cx="488" cy="283.3" r="1.5" class="xychart-grid"/>
<circle cx="508" cy="283.3" r="1.5" class="xychart-grid"/>
<circle cx="528" cy="283.3" r="1.5" class="xychart-grid"/>
<circle cx="548" cy="283.3" r="1.5" class="xychart-grid"/>
<circle cx="568" cy="283.3" r="1.5" class="xychart-grid"/>
<circle cx="588" cy="283.3" r="1.5" class="xychart-grid"/>
<circle cx="608" cy="283.3" r="1.5" class="xychart-grid"/>
<circle cx="628" cy="283.3" r="1.5" class="xychart-grid"/>
<circle cx="648" cy="283.3" r="1.5" class="xychart-grid"/>
<circle cx="668" cy="283.3" r="1.5" class="xychart-grid"/>
<circle cx="688" cy="283.3" r="1.5" class="xychart-grid"/>
<circle cx="708" cy="283.3" r="1.5" class="xychart-grid"/>
<circle cx="728" cy="283.3" r="1.5" class="xychart-grid"/>
<circle cx="128" cy="304.5" r="1.5" class="xychart-grid"/>
<circle cx="148" cy="304.5" r="1.5" class="xychart-grid"/>
<circle cx="168" cy="304.5" r="1.5" class="xychart-grid"/>
<circle cx="188" cy="304.5" r="1.5" class="xychart-grid"/>
<circle cx="208" cy="304.5" r="1.5" class="xychart-grid"/>
<circle cx="228" cy="304.5" r="1.5" class="xychart-grid"/>
<circle cx="248" cy="304.5" r="1.5" class="xychart-grid"/>
<circle cx="268" cy="304.5" r="1.5" class="xychart-grid"/>
<circle cx="288" cy="304.5" r="1.5" class="xychart-grid"/>
<circle cx="308" cy="304.5" r="1.5" class="xychart-grid"/>
<circle cx="328" cy="304.5" r="1.5" class="xychart-grid"/>
<circle cx="348" cy="304.5" r="1.5" class="xychart-grid"/>
<circle cx="368" cy="304.5" r="1.5" class="xychart-grid"/>
<circle cx="388" cy="304.5" r="1.5" class="xychart-grid"/>
<circle cx="408" cy="304.5" r="1.5" class="xychart-grid"/>
<circle cx="428" cy="304.5" r="1.5" class="xychart-grid"/>
<circle cx="448" cy="304.5" r="1.5" class="xychart-grid"/>
<circle cx="468" cy="304.5" r="1.5" class="xychart-grid"/>
<circle cx="488" cy="304.5" r="1.5" class="xychart-grid"/>
<circle cx="508" cy="304.5" r="1.5" class="xychart-grid"/>
<circle cx="528" cy="304.5" r="1.5" class="xychart-grid"/>
<circle cx="548" cy="304.5" r="1.5" class="xychart-grid"/>
<circle cx="568" cy="304.5" r="1.5" class="xychart-grid"/>
<circle cx="588" cy="304.5" r="1.5" class="xychart-grid"/>
<circle cx="608" cy="304.5" r="1.5" class="xychart-grid"/>
<circle cx="628" cy="304.5" r="1.5" class="xychart-grid"/>
<circle cx="648" cy="304.5" r="1.5" class="xychart-grid"/>
<circle cx="668" cy="304.5" r="1.5" class="xychart-grid"/>
<circle cx="688" cy="304.5" r="1.5" class="xychart-grid"/>
<circle cx="708" cy="304.5" r="1.5" class="xychart-grid"/>
<circle cx="728" cy="304.5" r="1.5" class="xychart-grid"/>
<circle cx="128" cy="325.8" r="1.5" class="xychart-grid"/>
<circle cx="148" cy="325.8" r="1.5" class="xychart-grid"/>
<circle cx="168" cy="325.8" r="1.5" class="xychart-grid"/>
<circle cx="188" cy="325.8" r="1.5" class="xychart-grid"/>
<circle cx="208" cy="325.8" r="1.5" class="xychart-grid"/>
<circle cx="228" cy="325.8" r="1.5" class="xychart-grid"/>
<circle cx="248" cy="325.8" r="1.5" class="xychart-grid"/>
<circle cx="268" cy="325.8" r="1.5" class="xychart-grid"/>
<circle cx="288" cy="325.8" r="1.5" class="xychart-grid"/>
<circle cx="308" cy="325.8" r="1.5" class="xychart-grid"/>
<circle cx="328" cy="325.8" r="1.5" class="xychart-grid"/>
<circle cx="348" cy="325.8" r="1.5" class="xychart-grid"/>
<circle cx="368" cy="325.8" r="1.5" class="xychart-grid"/>
<circle cx="388" cy="325.8" r="1.5" class="xychart-grid"/>
<circle cx="408" cy="325.8" r="1.5" class="xychart-grid"/>
<circle cx="428" cy="325.8" r="1.5" class="xychart-grid"/>
<circle cx="448" cy="325.8" r="1.5" class="xychart-grid"/>
<circle cx="468" cy="325.8" r="1.5" class="xychart-grid"/>
<circle cx="488" cy="325.8" r="1.5" class="xychart-grid"/>
<circle cx="508" cy="325.8" r="1.5" class="xychart-grid"/>
<circle cx="528" cy="325.8" r="1.5" class="xychart-grid"/>
<circle cx="548" cy="325.8" r="1.5" class="xychart-grid"/>
<circle cx="568" cy="325.8" r="1.5" class="xychart-grid"/>
<circle cx="588" cy="325.8" r="1.5" class="xychart-grid"/>
<circle cx="608" cy="325.8" r="1.5" class="xychart-grid"/>
<circle cx="628" cy="325.8" r="1.5" class="xychart-grid"/>
<circle cx="648" cy="325.8" r="1.5" class="xychart-grid"/>
<circle cx="668" cy="325.8" r="1.5" class="xychart-grid"/>
<circle cx="688" cy="325.8" r="1.5" class="xychart-grid"/>
<circle cx="708" cy="325.8" r="1.5" class="xychart-grid"/>
<circle cx="728" cy="325.8" r="1.5" class="xychart-grid"/>
<circle cx="128" cy="347" r="1.5" class="xychart-grid"/>
<circle cx="148" cy="347" r="1.5" class="xychart-grid"/>
<circle cx="168" cy="347" r="1.5" class="xychart-grid"/>
<circle cx="188" cy="347" r="1.5" class="xychart-grid"/>
<circle cx="208" cy="347" r="1.5" class="xychart-grid"/>
<circle cx="228" cy="347" r="1.5" class="xychart-grid"/>
<circle cx="248" cy="347" r="1.5" class="xychart-grid"/>
<circle cx="268" cy="347" r="1.5" class="xychart-grid"/>
<circle cx="288" cy="347" r="1.5" class="xychart-grid"/>
<circle cx="308" cy="347" r="1.5" class="xychart-grid"/>
<circle cx="328" cy="347" r="1.5" class="xychart-grid"/>
<circle cx="348" cy="347" r="1.5" class="xychart-grid"/>
<circle cx="368" cy="347" r="1.5" class="xychart-grid"/>
<circle cx="388" cy="347" r="1.5" class="xychart-grid"/>
<circle cx="408" cy="347" r="1.5" class="xychart-grid"/>
<circle cx="428" cy="347" r="1.5" class="xychart-grid"/>
<circle cx="448" cy="347" r="1.5" class="xychart-grid"/>
<circle cx="468" cy="347" r="1.5" class="xychart-grid"/>
<circle cx="488" cy="347" r="1.5" class="xychart-grid"/>
<circle cx="508" cy="347" r="1.5" class="xychart-grid"/>
<circle cx="528" cy="347" r="1.5" class="xychart-grid"/>
<circle cx="548" cy="347" r="1.5" class="xychart-grid"/>
<circle cx="568" cy="347" r="1.5" class="xychart-grid"/>
<circle cx="588" cy="347" r="1.5" class="xychart-grid"/>
<circle cx="608" cy="347" r="1.5" class="xychart-grid"/>
<circle cx="628" cy="347" r="1.5" class="xychart-grid"/>
<circle cx="648" cy="347" r="1.5" class="xychart-grid"/>
<circle cx="668" cy="347" r="1.5" class="xychart-grid"/>
<circle cx="688" cy="347" r="1.5" class="xychart-grid"/>
<circle cx="708" cy="347" r="1.5" class="xychart-grid"/>
<circle cx="728" cy="347" r="1.5" class="xychart-grid"/>
<circle cx="128" cy="368.3" r="1.5" class="xychart-grid"/>
<circle cx="148" cy="368.3" r="1.5" class="xychart-grid"/>
<circle cx="168" cy="368.3" r="1.5" class="xychart-grid"/>
<circle cx="188" cy="368.3" r="1.5" class="xychart-grid"/>
<circle cx="208" cy="368.3" r="1.5" class="xychart-grid"/>
<circle cx="228" cy="368.3" r="1.5" class="xychart-grid"/>
<circle cx="248" cy="368.3" r="1.5" class="xychart-grid"/>
<circle cx="268" cy="368.3" r="1.5" class="xychart-grid"/>
<circle cx="288" cy="368.3" r="1.5" class="xychart-grid"/>
<circle cx="308" cy="368.3" r="1.5" class="xychart-grid"/>
<circle cx="328" cy="368.3" r="1.5" class="xychart-grid"/>
<circle cx="348" cy="368.3" r="1.5" class="xychart-grid"/>
<circle cx="368" cy="368.3" r="1.5" class="xychart-grid"/>
<circle cx="388" cy="368.3" r="1.5" class="xychart-grid"/>
<circle cx="408" cy="368.3" r="1.5" class="xychart-grid"/>
<circle cx="428" cy="368.3" r="1.5" class="xychart-grid"/>
<circle cx="448" cy="368.3" r="1.5" class="xychart-grid"/>
<circle cx="468" cy="368.3" r="1.5" class="xychart-grid"/>
<circle cx="488" cy="368.3" r="1.5" class="xychart-grid"/>
<circle cx="508" cy="368.3" r="1.5" class="xychart-grid"/>
<circle cx="528" cy="368.3" r="1.5" class="xychart-grid"/>
<circle cx="548" cy="368.3" r="1.5" class="xychart-grid"/>
<circle cx="568" cy="368.3" r="1.5" class="xychart-grid"/>
<circle cx="588" cy="368.3" r="1.5" class="xychart-grid"/>
<circle cx="608" cy="368.3" r="1.5" class="xychart-grid"/>
<circle cx="628" cy="368.3" r="1.5" class="xychart-grid"/>
<circle cx="648" cy="368.3" r="1.5" class="xychart-grid"/>
<circle cx="668" cy="368.3" r="1.5" class="xychart-grid"/>
<circle cx="688" cy="368.3" r="1.5" class="xychart-grid"/>
<circle cx="708" cy="368.3" r="1.5" class="xychart-grid"/>
<circle cx="728" cy="368.3" r="1.5" class="xychart-grid"/>
<circle cx="128" cy="389.5" r="1.5" class="xychart-grid"/>
<circle cx="148" cy="389.5" r="1.5" class="xychart-grid"/>
<circle cx="168" cy="389.5" r="1.5" class="xychart-grid"/>
<circle cx="188" cy="389.5" r="1.5" class="xychart-grid"/>
<circle cx="208" cy="389.5" r="1.5" class="xychart-grid"/>
<circle cx="228" cy="389.5" r="1.5" class="xychart-grid"/>
<circle cx="248" cy="389.5" r="1.5" class="xychart-grid"/>
<circle cx="268" cy="389.5" r="1.5" class="xychart-grid"/>
<circle cx="288" cy="389.5" r="1.5" class="xychart-grid"/>
<circle cx="308" cy="389.5" r="1.5" class="xychart-grid"/>
<circle cx="328" cy="389.5" r="1.5" class="xychart-grid"/>
<circle cx="348" cy="389.5" r="1.5" class="xychart-grid"/>
<circle cx="368" cy="389.5" r="1.5" class="xychart-grid"/>
<circle cx="388" cy="389.5" r="1.5" class="xychart-grid"/>
<circle cx="408" cy="389.5" r="1.5" class="xychart-grid"/>
<circle cx="428" cy="389.5" r="1.5" class="xychart-grid"/>
<circle cx="448" cy="389.5" r="1.5" class="xychart-grid"/>
<circle cx="468" cy="389.5" r="1.5" class="xychart-grid"/>
<circle cx="488" cy="389.5" r="1.5" class="xychart-grid"/>
<circle cx="508" cy="389.5" r="1.5" class="xychart-grid"/>
<circle cx="528" cy="389.5" r="1.5" class="xychart-grid"/>
<circle cx="548" cy="389.5" r="1.5" class="xychart-grid"/>
<circle cx="568" cy="389.5" r="1.5" class="xychart-grid"/>
<circle cx="588" cy="389.5" r="1.5" class="xychart-grid"/>
<circle cx="608" cy="389.5" r="1.5" class="xychart-grid"/>
<circle cx="628" cy="389.5" r="1.5" class="xychart-grid"/>
<circle cx="648" cy="389.5" r="1.5" class="xychart-grid"/>
<circle cx="668" cy="389.5" r="1.5" class="xychart-grid"/>
<circle cx="688" cy="389.5" r="1.5" class="xychart-grid"/>
<circle cx="708" cy="389.5" r="1.5" class="xychart-grid"/>
<circle cx="728" cy="389.5" r="1.5" class="xychart-grid"/>
<circle cx="128" cy="410.8" r="1.5" class="xychart-grid"/>
<circle cx="148" cy="410.8" r="1.5" class="xychart-grid"/>
<circle cx="168" cy="410.8" r="1.5" class="xychart-grid"/>
<circle cx="188" cy="410.8" r="1.5" class="xychart-grid"/>
<circle cx="208" cy="410.8" r="1.5" class="xychart-grid"/>
<circle cx="228" cy="410.8" r="1.5" class="xychart-grid"/>
<circle cx="248" cy="410.8" r="1.5" class="xychart-grid"/>
<circle cx="268" cy="410.8" r="1.5" class="xychart-grid"/>
<circle cx="288" cy="410.8" r="1.5" class="xychart-grid"/>
<circle cx="308" cy="410.8" r="1.5" class="xychart-grid"/>
<circle cx="328" cy="410.8" r="1.5" class="xychart-grid"/>
<circle cx="348" cy="410.8" r="1.5" class="xychart-grid"/>
<circle cx="368" cy="410.8" r="1.5" class="xychart-grid"/>
<circle cx="388" cy="410.8" r="1.5" class="xychart-grid"/>
<circle cx="408" cy="410.8" r="1.5" class="xychart-grid"/>
<circle cx="428" cy="410.8" r="1.5" class="xychart-grid"/>
<circle cx="448" cy="410.8" r="1.5" class="xychart-grid"/>
<circle cx="468" cy="410.8" r="1.5" class="xychart-grid"/>
<circle cx="488" cy="410.8" r="1.5" class="xychart-grid"/>
<circle cx="508" cy="410.8" r="1.5" class="xychart-grid"/>
<circle cx="528" cy="410.8" r="1.5" class="xychart-grid"/>
<circle cx="548" cy="410.8" r="1.5" class="xychart-grid"/>
<circle cx="568" cy="410.8" r="1.5" class="xychart-grid"/>
<circle cx="588" cy="410.8" r="1.5" class="xychart-grid"/>
<circle cx="608" cy="410.8" r="1.5" class="xychart-grid"/>
<circle cx="628" cy="410.8" r="1.5" class="xychart-grid"/>
<circle cx="648" cy="410.8" r="1.5" class="xychart-grid"/>
<circle cx="668" cy="410.8" r="1.5" class="xychart-grid"/>
<circle cx="688" cy="410.8" r="1.5" class="xychart-grid"/>
<circle cx="708" cy="410.8" r="1.5" class="xychart-grid"/>
<circle cx="728" cy="410.8" r="1.5" class="xychart-grid"/>
<circle cx="128" cy="432" r="1.5" class="xychart-grid"/>
<circle cx="148" cy="432" r="1.5" class="xychart-grid"/>
<circle cx="168" cy="432" r="1.5" class="xychart-grid"/>
<circle cx="188" cy="432" r="1.5" class="xychart-grid"/>
<circle cx="208" cy="432" r="1.5" class="xychart-grid"/>
<circle cx="228" cy="432" r="1.5" class="xychart-grid"/>
<circle cx="248" cy="432" r="1.5" class="xychart-grid"/>
<circle cx="268" cy="432" r="1.5" class="xychart-grid"/>
<circle cx="288" cy="432" r="1.5" class="xychart-grid"/>
<circle cx="308" cy="432" r="1.5" class="xychart-grid"/>
<circle cx="328" cy="432" r="1.5" class="xychart-grid"/>
<circle cx="348" cy="432" r="1.5" class="xychart-grid"/>
<circle cx="368" cy="432" r="1.5" class="xychart-grid"/>
<circle cx="388" cy="432" r="1.5" class="xychart-grid"/>
<circle cx="408" cy="432" r="1.5" class="xychart-grid"/>
<circle cx="428" cy="432" r="1.5" class="xychart-grid"/>
<circle cx="448" cy="432" r="1.5" class="xychart-grid"/>
<circle cx="468" cy="432" r="1.5" class="xychart-grid"/>
<circle cx="488" cy="432" r="1.5" class="xychart-grid"/>
<circle cx="508" cy="432" r="1.5" class="xychart-grid"/>
<circle cx="528" cy="432" r="1.5" class="xychart-grid"/>
<circle cx="548" cy="432" r="1.5" class="xychart-grid"/>
<circle cx="568" cy="432" r="1.5" class="xychart-grid"/>
<circle cx="588" cy="432" r="1.5" class="xychart-grid"/>
<circle cx="608" cy="432" r="1.5" class="xychart-grid"/>
<circle cx="628" cy="432" r="1.5" class="xychart-grid"/>
<circle cx="648" cy="432" r="1.5" class="xychart-grid"/>
<circle cx="668" cy="432" r="1.5" class="xychart-grid"/>
<circle cx="688" cy="432" r="1.5" class="xychart-grid"/>
<circle cx="708" cy="432" r="1.5" class="xychart-grid"/>
<circle cx="728" cy="432" r="1.5" class="xychart-grid"/>
<path d="M208,355 Q208,347 216,347 L240,347 Q248,347 248,355 L248,424 Q248,432 240,432 L216,432 Q208,432 208,424 Z" class="xychart-bar xychart-color-0" data-value="5" data-label="jan"/>
<path d="M408,236 Q408,228 416,228 L440,228 Q448,228 448,236 L448,424 Q448,432 440,432 L416,432 Q408,432 408,424 Z" class="xychart-bar xychart-color-0" data-value="12" data-label="feb"/>
<path d="M608,287 Q608,279 616,279 L640,279 Q648,279 648,287 L648,424 Q648,432 640,432 L616,432 Q608,432 608,424 Z" class="xychart-bar xychart-color-0" data-value="9" data-label="mar"/>
<path d="M228,364 C294.7,328.6 361.3,293.2 428,262 C494.7,230.8 561.3,203.9 628,177" class="xychart-line-shadow xychart-color-1" transform="translate(0,2)"/>
<path d="M228,364 C294.7,328.6 361.3,293.2 428,262 C494.7,230.8 561.3,203.9 628,177" class="xychart-line xychart-color-1"/>
<circle cx="228" cy="364" r="5" class="xychart-dot xychart-color-1" data-value="4" data-label="jan"/>
<circle cx="428" cy="262" r="5" class="xychart-dot xychart-color-1" data-value="10" data-label="feb"/>
<circle cx="628" cy="177" r="5" class="xychart-dot xychart-color-1" data-value="15" data-label="mar"/>
<text x="228" y="450" text-anchor="middle" font-size="14" font-weight="400" dy="0.35em" class="xychart-label">jan</text>
<text x="428" y="450" text-anchor="middle" font-size="14" font-weight="400" dy="0.35em" class="xychart-label">feb</text>
<text x="628" y="450" text-anchor="middle" font-size="14" font-weight="400" dy="0.35em" class="xychart-label">mar</text>
<text x="110" y="432" text-anchor="end" font-size="14" font-weight="400" dy="0.35em" class="xychart-label">0</text>
<text x="110" y="347" text-anchor="end" font-size="14" font-weight="400" dy="0.35em" class="xychart-label">5</text>
<text x="110" y="262" text-anchor="end" font-size="14" font-weight="400" dy="0.35em" class="xychart-label">10</text>
<text x="110" y="177" text-anchor="end" font-size="14" font-weight="400" dy="0.35em" class="xychart-label">15</text>
<text x="110" y="92" text-anchor="end" font-size="14" font-weight="400" dy="0.35em" class="xychart-label">20</text>
<text x="26" y="262" text-anchor="middle" transform="rotate(-90,26,262)" font-size="15" font-weight="500" dy="0.35em" class="xychart-axis-title">Count</text>
<text x="375" y="40" text-anchor="middle" font-size="18" font-weight="600" dy="0.35em" class="xychart-title">Example</text>
<rect x="314.65999999999997" y="71" width="14" height="14" rx="3" class="xychart-bar xychart-color-0"/>
<text x="334.65999999999997" y="78" text-anchor="start" font-size="14" font-weight="400" dy="0.35em" class="xychart-label">Bar 1</text>
<line x1="380.73199999999997" y1="78" x2="394.73199999999997" y2="78" stroke-width="2.5" stroke-linecap="round" class="xychart-legend-line xychart-color-1"/>
<text x="400.73199999999997" y="78" text-anchor="start" font-size="14" font-weight="400" dy="0.35em" class="xychart-label">Line 1</text>
</svg>`
