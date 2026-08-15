# Virtuōso Visual Language System → Figma

A Figma plugin that builds the Virtuōso Catering Visual Language System natively
inside a Figma file: variables, paint styles, text styles, and components with
real variants.

There is no way to write a `.fig` file from outside Figma — the format is closed
and Figma's REST API is read-only for file contents. A plugin is the only route
that produces genuinely native Figma objects rather than a flat picture of them.

## Running it

1. Install the two typefaces on your machine (or use the Figma web font picker —
   both are on Google Fonts): **Cormorant Garamond** and **Work Sans**.
   Without them the plugin substitutes Inter and tells you so.
2. Figma desktop → **Plugins → Development → Import plugin from manifest…**
3. Choose `tools/virtuoso-vls-figma/manifest.json`.
4. Open the file you want the system built into, then
   **Plugins → Development → Virtuōso Visual Language System**.

It creates a new page called `Virtuōso VLS` and leaves your existing pages
alone. Re-running removes and rebuilds anything it previously made under the
`Virtuōso VLS` collection and the `VLS/` style prefix, then adds a fresh page.

## What it produces

**Variables** — collection `Virtuōso VLS`

| Group | Contents |
| --- | --- |
| `palette/*` | The 22 raw values, sRGB-converted from the OKLCH source |
| `vls/*` | The 15 working values, named as the house names them |
| `role/*` | Semantic aliases pointing at the working values |
| `space/*` | 4 → 160 px, all multiples of the 8 px screen module |
| `type/*` | W1–W7, fluid steps pinned to their 1440 px maxima |
| `measure/*`, `container/*`, `module/*`, `radius/*` | Measure 640/520, container 1160, module 8/16, radius 0 |

**Paint styles** — `VLS/forest`, `VLS/brass`, `VLS/amber` and so on for the
fifteen working values, each carrying its usage note in the style description
(Brass never sets type; Sage never sets type; Amber 700 is the only amber that
does). The raw palette lands under `VLS/Archive/` marked legacy-only.

**Text styles** — the three voices:

- `Voice I` — Cormorant Garamond Light, W1–W3 plus italic
- `Voice II` — Work Sans Light, W4/W5/W7
- `Voice III` — Work Sans capitals at four sizes, tracking set by size
- `Wordmark` and `Wordmark Descriptor` at 0.09em and 0.44em

**Components** — twelve, with variant properties named as the code names its props:

`Brand/Wordmark` (Lockup × Inverse) · `Brand/Device` (Length × Inverse) ·
`Core/Rule` (Weight × Inverse) · `Core/Action` (Variant × Size) ·
`Core/Surface` (Tone) · `Core/SectionHeader` (Inverse) · `Core/MenuItem`
(Inverse) · `Core/PullQuote` (Inverse) · `Core/Field` (State) ·
`Core/DietMark` (Mark, all twelve) · `Core/Figure` (Ratio) · `Core/DataTable`

**Specimen boards** — colour swatches with hex and source name, the type scale
in all three voices, the spacing ladder in modules, and the refusals written out.

## Conversion notes

- OKLCH is converted to sRGB hex. Two documented values check out exactly:
  Brass 600 lands on `#AA6926` and Linen 50 on `#FEFCF7`.
- Fluid `clamp()` type takes its 1440 px maximum, since Figma has no fluid type.
  W1 88 px, W2 56 px, W3 32 px, W4 20 px.
- Point rules convert at 96 dpi: 0.4 pt → 0.53 px, 0.5 pt → 0.67 px,
  0.8 pt → 1.07 px, 1.6 pt → 2.13 px.
- The macron device lengths are the A4 millimetre values at 96 dpi:
  24 mm → 91 px, 14 mm → 53 px, 9 mm → 34 px.
- Radius is zero and shadow is absent throughout, per the refusals.
- The Wordmark is the same stand-in the code uses — Cormorant Garamond Light at
  0.09em tracking. No logo artwork has been supplied, so replace those
  components once it exists.

## Source

Everything is transcribed from
`Virtuoso Catering Visual Language System/tokens/*.css` and
`components/core/*`. If the tokens change, change them here too — the plugin
holds its own copy of the values so it can run with no build step.
