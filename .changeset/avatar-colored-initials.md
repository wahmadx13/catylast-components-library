---
"@catylast/primitives": minor
---

Enhance `Avatar` with colored initials tiles and full customisability.

**Behaviour:**
- When `src` resolves, the photo is shown.
- When `src` is missing or fails to load, initials derived from `name`
  appear on a colored tile.
- The tile color is **deterministically hashed from `name`** (same
  name → same color, every render, every surface), so a person's
  avatar reads as theirs at a glance even before the photo loads.

**New props:**
- `appearance` — `"auto"` (default — hash by name), `"neutral"` (no
  color signal), or named presets `"blue" / "green" / "red" / "yellow"
  / "purple"`.
- `palette: AvatarPaletteEntry[]` — replace the default 8-color set
  with a custom palette. Each entry is `{ bg, color, borderColor? }`
  (any CSS color or `var(...)`).
- A new `DEFAULT_AVATAR_PALETTE` export lets consumers spread-and-
  extend rather than fully replace the default set.

**Customisability:** every styling dimension is now exposed as a CSS
variable on the avatar root — `--avatar-size`, `--avatar-bg`,
`--avatar-color`, `--avatar-border-color`, `--avatar-radius`,
`--avatar-font-size`, `--avatar-font-weight`, `--avatar-border-width`.
Inline `style` overrides win over both `appearance` presets and the
auto-mode inline color, so consumers always have final say.

**Visual polish:**
- Initials font size bumped (sm 11→11, md 12→13, lg 14→16, xl 18→22)
  and weight bumped to `semibold` for legibility.
- Initials are now `text-transform: uppercase` regardless of input.

**Backwards compatibility:** existing call sites (`<Avatar name="..."
/>`, `<Avatar src="..." name="..." />`) keep working — the only visual
change is that initials-only avatars now show a colored tile instead
of the previous neutral grey. Pass `appearance="neutral"` to opt back
into the old grey look.
