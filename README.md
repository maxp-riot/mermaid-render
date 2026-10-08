# mermaid-render

A Claude Code mod that draws the ```mermaid blocks of Claude's replies as images in the terminal, and opens any of them in Excalidraw as an editable drawing.

| What | Does |
|---|---|
| A ```mermaid block in a reply | Drawn as an image under the reply's text, in your theme's colors |
| `[ Open in Excalidraw ]` under an image | Opens excalidraw.com on the diagram, as shapes and bound arrows you can edit |
| `/excalidraw` | The same, for the last diagram of the session |

Drawn kinds: flowchart, sequence, state, class, ER and xychart (the xychart has no Excalidraw export). Other kinds, such as gantt or pie, stay as code (in a terminal that shows images, under a dim line saying the render failed). The stored reply keeps its Mermaid source (ctrl+o): only the screen changes.

The mod also adds a short section to Claude's system prompt, in terminal sessions, so that Claude draws a diagram when one explains better than prose.

## Install

In a Claude Code session in your terminal:

```
/plugin install mermaid-render --marketplace maxp-riot/mermaid-render
```

Answer `y` to add the marketplace, then pick the user scope. The mod is active at once, and in every session after.

To update: `claude plugin update mermaid-render@mermaid-render`, then `/reload-plugins` in an open session.

## Requirements

- macOS: the layout runs in JavaScriptCore through `osascript`, so no Node.
- Claude Code 2.1.287 or later (mods).
- resvg, which turns the SVG into a PNG: `brew install resvg`. The mod runs `/opt/homebrew/bin/resvg`, where Homebrew puts it on Apple Silicon: an Intel Mac is not supported.
- A terminal Claude Code draws pictures in. Elsewhere the diagram is drawn with box characters instead.

| Terminal | Images |
|---|---|
| Ghostty, cmux, kitty | Yes, outside tmux, with nothing to set |
| iTerm2 3.7 or later | Yes, once Claude Code is told to send them (below) |
| Warp, Terminal.app, VS Code's terminal | No: box characters |

### iTerm2

Claude Code draws images in Ghostty and kitty on its own, not in iTerm2. Tell it to, in `~/.claude/settings.json`:

```json
"env": { "CLAUDE_CODE_FORCE_TERMINAL_IMAGES": "1" }
```

Then start a new session. Until then, the mod draws box characters in iTerm2 and says so once per session, in a dim line.

Tried on 2026-10-08 with iTerm2 3.7.3 and Claude Code 2.1.294: the diagrams show as images. iTerm2 reads the kitty graphics protocol Claude Code sends, file transmission and Unicode placeholders included (`sources/InlineImages/KittyImageController.swift` in iTerm2's repository). `CLAUDE_CODE_FORCE_TERMINAL_IMAGES` is not in Anthropic's documentation.

Warp does not advertise its kitty graphics support to applications (warpdotdev/warp#12058).

## Colors

The images follow Claude Code's `theme` setting (`/theme`):

| Theme | Image |
|---|---|
| `dark`, `dark-daltonized`, `dark-ansi` | Light ink on a transparent background |
| `light`, `light-daltonized`, `light-ansi` | Dark ink on a transparent background |
| A custom theme | By its `base` (`dark` when it names none) |
| `auto` | On a dark card: the mod cannot know your terminal's background |

## Excalidraw

The button and `/excalidraw` open `https://excalidraw.com/#url=data:…` in your browser, with the diagram as an Excalidraw scene in the link. The part after `#` never leaves your browser: nothing is uploaded.

On an empty canvas, Excalidraw loads the diagram straight away. When your canvas holds a drawing, Excalidraw asks first ("Load from link"), offers to save your drawing to disk or as an image, and replaces it only on "Replace my content".

The scene keeps the diagram's layout: boxes with their labels, arrows bound to the boxes they join (they follow when you move a box), labels on their arrows, ER cardinalities and class inheritance as arrowheads.

## Known limits

- The image's size in cells is estimated for Ghostty's default 13pt font (cells of 8 by 17 pixels), so that labels come out about the size of your text. With another font size they come out bigger or smaller.
- Images are drawn in the terminal only: not in the Desktop app, VS Code's panel or `claude -p`.
- beautiful-mermaid 1.1.3 drops an ER relationship written `}o--||` (its parser reads `}o` as nothing); write it `||--o{` the other way round.

## Where things live

- `hooks/`: the mod. `register.tsx` wires it; `fences.ts` finds the blocks and draws the box-character fallback; `flatten.ts` turns beautiful-mermaid's CSS colors into plain ones for resvg; `scene.ts` converts a diagram into an Excalidraw scene; `image.ts` holds the colors, the terminal and theme rules, and the image's size.
- `renderer/`: `render.js`, run by `osascript`, and beautiful-mermaid 1.1.3 with elkjs bundled into one script.
- `hooks/vendor/`: beautiful-mermaid's ASCII renderer, for the box-character fallback.
- `/tmp/mermaid-render/`: the rendered SVGs and PNGs, one per diagram and color scheme.

A render that fails writes one dim line in the conversation, `mermaid-render: <step> failed…`, and leaves the diagram as box characters.

## Checking it

```bash
claude plugin validate .   # what the mod hooks, calls and reads, without running it
claude plugin test .       # its tests
```

To work on it, load your clone for one session; it reloads when you save:

```bash
claude --plugin-dir path/to/mermaid-render
```

## Licenses

The mod's own code is under the MIT license (`LICENSE`). beautiful-mermaid (MIT), elkjs (EPL-2.0) and entities (BSD-2-Clause) are bundled with their licenses: `hooks/vendor/LICENSE-beautiful-mermaid`, `renderer/LICENSE-elkjs`, `renderer/LICENSE-entities`.
