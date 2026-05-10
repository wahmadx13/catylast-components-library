---
"@catylast/primitives": minor
---

Ship the full Button family with Atlassian-Design-System-style surface
area, fully customisable through props *and* CSS variables.

**New components:**
- `LinkButton` — Button rendered as `<a>` (or any router Link). Same
  appearance / size / spacing / icon / state API as Button.
- `LinkIconButton` — IconButton rendered as an anchor.
- `SplitButton` — primary action + dropdown trigger sharing a vertical
  seam. Compose with `Menu` for the dropdown half.
- `ButtonGroup` — horizontal or vertical group of buttons in two modes:
  gapped (default — consistent spacing between siblings) and segmented
  (`isSegmented` — adjacent borders share a seam, outside corners round
  as a unit).

**Button + IconButton extended to match:**
- New `appearance` prop: `default`, `primary`, `subtle`, `subtle-link`,
  `link`, `warning`, `danger`, `discovery` (purple).
- New `size` values: `small`, `medium`, `large` (the legacy `sm` / `md`
  / `lg` short forms still work).
- New `spacing` prop: `default`, `compact`, `none` — horizontal padding
  density independent of size.
- New state props: `isDisabled`, `isLoading` (with width-preserving
  spinner), `isSelected` (toggle-on with `aria-pressed`),
  `shouldFitContainer` (full width). The native HTML `disabled`
  attribute is also still accepted for backwards compat.
- `iconBefore` / `iconAfter` accept either a registered icon name
  (string) or any React node.
- Polymorphic `as` prop on Button + IconButton.

**Backwards compatibility:** all v0.1 callsites continue to work
unchanged. `variant="primary" | "secondary" | "ghost" | "danger"` is
mapped automatically to the corresponding new appearance values.

**Customisation:** every styling dimension on every button family
component is exposed as both an enum prop and a CSS variable
(`--btn-bg`, `--btn-radius`, `--btn-padding-x`, `--btn-shadow`, …) so
consumers can override per-instance via `style` without forking the
component. Defaults flow through `@catylast/tokens` semantic tokens —
dark mode and theme swaps work without component changes.
