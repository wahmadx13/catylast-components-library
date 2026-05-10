---
"@catylast/primitives": minor
---

Add `Calendar` — the date-grid primitive Catylast uses to build date
pickers, range pickers, scheduling surfaces, and any feature that needs
a month view.

**Selection model:**
- `selected: string[]` (ISO YYYY-MM-DD) — visual highlight for any
  number of days. Works for single-day pickers and multi-day selection
  sets equally.
- `previouslySelected: string[]` — small dot under each listed date,
  for showing past picks without making them look currently-selected.
- `disabled: string[]` — explicitly disabled dates with strikethrough.
- `minDate` / `maxDate` — inclusive range clamp; out-of-range days are
  disabled and the prev / next month buttons disable themselves
  appropriately.

**Position model:**
- Uncontrolled: `defaultDay`, `defaultMonth`, `defaultYear`.
- Controlled: `day`, `month`, `year`.
- `onSelect({ iso, year, month, day })` fires on commit (click / Enter).
- `onChange({ iso, year, month, day, type: 'navigate' | 'focus' })`
  fires on every focus or visible-month change.

**Locale & layout:**
- `weekStartDay` (0–6) — Sunday / Monday / Saturday / etc.
- `locale` — any BCP-47 tag. Month and weekday labels render through
  `Intl.DateTimeFormat`, so no `date-fns` / `moment` / `luxon` is
  required.
- `today` — override the "today" reference (useful for tests / time
  travel demos).
- `size` — `small` (28px cells), `medium` (36px), `large` (44px).

**Keyboard:** ←/→ day, ↑/↓ week, PageUp/Dn month, Shift+PageUp/Dn
year, Home/End start/end of week, Enter/Space select, Esc blur.

**Accessibility:** W3C grid pattern — `role="grid"` with per-week
`role="row"` and per-day `role="gridcell"`, `aria-current="date"` on
today, `aria-selected` on picked days, `aria-disabled` on disabled
days, long locale-aware `aria-label` on every cell, and a roving
`tabindex` so Tab steps in / out of the grid in one stop.

**Customisability:** every styling dimension is exposed as both an
enum prop and a CSS variable (`--cal-bg`, `--cal-radius`,
`--cal-cell-size`, `--cal-day-radius`, `--cal-day-bg-selected`, …) so
consumers can override per-instance via `style` without touching the
prop API. Defaults flow through `@catylast/tokens` semantic tokens —
dark mode and theme swaps work without component changes.
