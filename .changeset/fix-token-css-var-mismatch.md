---
"@catylast/tokens": minor
"@catylast/dynamic-table": patch
---

**Bug fix:** dropdown menus inside `DynamicTable` rendered behind sticky
table cells (and clipped against the table boundary on tall surfaces
like the Showcase story).

**Root cause:** the token system emitted **two different variable name
formats** for the same token:

- The JS accessor `zIndex.dropdown` produced
  `var(--catylast-z-index-dropdown)` (kebab-case, via the explicit init
  paths in `index.ts`).
- The generated `tokens.css` emitted `--catylast-zIndex-dropdown` (camel-
  case, from `flattenLeaves` walking natural object keys).

The mismatch meant **the variable referenced by every component CSS
file resolved to undefined at runtime**, falling back to `z-index:
auto`. Stacking battles against any element with a literal numeric
`z-index` (sticky table headers / pinned columns at 1, 2, 3) silently
lost. Same issue affected `borderWidth.*` and `font.lineHeight.*`.

**Fix:** `_buildVars.ts` now kebab-cases every camelCase segment in
both `makeVars` and `flattenLeaves`, so JS and CSS produce identical
variable names (`--catylast-z-index-dropdown`,
`--catylast-border-width-*`, `--catylast-font-line-height-*`).

**Also fixed in this release:**

- **Z-index ordering** — `dropdown` (1000) was *below* `sticky` (1100),
  which is backwards: dropdowns should always layer above sticky page
  elements. Reordered the whole scale: `sticky: 800`, `banner: 900`,
  `dropdown: 1300`, `popover: 1400`, `overlay: 1500`, `modal: 1600`,
  `toast: 1700`, `tooltip: 1800`.

- **`DynamicTable` container** now sets `isolation: isolate` so the
  table's per-cell z-index ladder (sticky headers, pinned columns) is
  contained locally and cannot accidentally bleed past portaled menus
  in any future layout. The `.scrollArea` also gets the bottom-corner
  radius so it stays visually consistent with the rounded container.

**Migration note:** the public CSS variable names did not change for
working consumers (since `var(--catylast-z-index-dropdown)` was the
only form already in use across all component CSS). Anyone who was
referencing the broken `--catylast-zIndex-*` variant in their own CSS
should switch to the kebab form.
