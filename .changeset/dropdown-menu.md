---
"@catylast/primitives": minor
---

Add the `DropdownMenu` family — the disclosure menu primitive across
Catylast (toolbars, table row actions, work-item-card kebabs, density
switchers, view-mode toggles).

**Components shipped:**

- **`DropdownMenu`** — root container. Pass `trigger` (string for an
  auto-built button, or any node for a custom one) plus the items as
  children. Composes Radix UI underneath for keyboard navigation,
  focus trap, ARIA roles, and portaling.
- **`DropdownItem`** — regular action item. Closes the menu on click.
  Supports `iconBefore` / `iconAfter` (with badges, kbd hints, etc.),
  `description` for a secondary line, `appearance` (`default` /
  `primary` / `danger`), `isDisabled`, polymorphic `as`.
- **`DropdownItemCheckbox`** — toggleable item. Menu stays open after
  click so users can flip multiple toggles. Controlled (`isSelected`)
  + uncontrolled (`defaultSelected`).
- **`DropdownItemRadioGroup`** + **`DropdownItemRadio`** — single-
  select group. Toggling one radio deselects the others. Controlled
  (`value`) + uncontrolled (`defaultValue`) on the group.
- **`DropdownItemGroup`** — visually section items with optional
  uppercase `title` and `hasSeparator` divider above.
- **`DropdownMenuSub`** + **`DropdownMenuSubTrigger`** +
  **`DropdownMenuSubContent`** — nested sub-menus. The outer trigger
  shows a trailing chevron and opens on hover or `→`. Sub-menus
  inherit the parent's `size` automatically.
- **`DropdownMenuTrigger`** — explicit trigger re-export for
  composition outside the `trigger` prop pattern.
- **`DropdownMenuSeparator`** — standalone divider for advanced
  layouts.

**Sizes:** `small` / `medium` / `large` scale padding and font size
together. The size propagates to all items via context — sub-menus
and nested groups inherit automatically.

**Placement:** four sides plus `-start` / `-end` variants, with auto-
flip when clipped.

**Accessibility:** full W3C menu pattern — `role="menu"` on the popup
with `role="menuitem"` / `menuitemcheckbox` / `menuitemradio` on the
items, type-ahead, arrow-key navigation, sub-menu via `→` / `←`,
focus return on close, `aria-checked` / `aria-disabled` reflected
correctly, type-ahead jumping to label-matching items.

**Customisability:** every styling dimension on the popup root and on
the items is exposed as both an enum prop and a CSS variable (`--ddm-
bg`, `--ddm-radius`, `--ddm-item-padding-x`, `--ddm-item-bg-hover`,
`--ddm-checkmark-color`, `--ddm-group-title-color`, `--ddm-separator-
color`, …). Defaults flow through `@catylast/tokens` semantic tokens
— dark mode and theme swaps work without component changes.

**Backwards compatibility:** the existing `Menu` / `MenuTrigger` /
`MenuContent` / `MenuItem` / `MenuSub` family stays exported and
unchanged so v0.7 callsites (including `SplitButton` internals)
continue to build cleanly. New code should reach for the
`DropdownMenu` family for the simpler props-driven API and the
checkbox / radio item variants.
