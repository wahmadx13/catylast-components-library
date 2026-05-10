---
"@catylast/primitives": minor
---

Add `DatePicker` and `TimePicker` — the two input + popover combos
Catylast uses everywhere a user picks a date or time of day.

**`DatePicker`** — input field with a trailing calendar icon that
opens a Radix Popover containing the full `Calendar` primitive.

- Controlled / uncontrolled (`value` / `defaultValue` / `onChange`).
- Free typing in the input — parses on blur; the same format pattern
  the user sees is the one that's parsed.
- `dateFormat` token pattern (`YYYY` / `MM` / `M` / `DD` / `D`).
  Override with `parseInputValue` / `formatDisplayLabel` for richer
  parsing logic.
- Locale-aware month / weekday labels via `Intl.DateTimeFormat` — no
  date library required.
- `minDate`, `maxDate`, `disabledDates`, `weekStartDay`, `today`.
- States: `isDisabled`, `isInvalid`, `isClearable`.
- Three sizes: `small`, `medium`, `large`.
- `↓` opens the popover, `Esc` closes it; the calendar inside has its
  own keyboard model (W3C grid pattern).

**`TimePicker`** — input field with a trailing clock icon that opens
a Radix Popover containing a scrollable list of pre-defined times.

- Controlled / uncontrolled (`value` / `defaultValue` / `onChange`).
- Free typing — the parser understands `9`, `9:30`, `9:30am`, `230pm`,
  `21:30`, etc. and commits canonical 24h `HH:mm`.
- `times` prop accepts a custom list (15-minute slots, hourly, business
  hours only, …). Default is 30-minute increments.
- `timeFormat="HH:mm"` (24h, default) or `"hh:mm A"` (12h with AM/PM).
  Tokens: `HH` / `H` / `hh` / `h` / `mm` / `A` / `a`.
- Type-to-filter: typing `9` narrows the list to entries starting with
  that hour.
- States: `isDisabled`, `isInvalid`, `isClearable`.
- Three sizes: `small`, `medium`, `large`.
- Arrow-key navigation through the list, `Enter` to commit, `Esc` to
  close.

**Customisability:** every styling dimension on both pickers is
exposed as both an enum prop and a CSS variable on the picker root.
Defaults flow through `@catylast/tokens` semantic tokens — dark mode
and theme swaps work without component changes.

**Accessibility:** real `<input type="text">` underneath each trigger
with `role="combobox"`, `aria-haspopup`, `aria-expanded`,
`aria-controls`, `aria-invalid` wired up. The TimePicker's list uses
`aria-activedescendant` so screen readers follow keyboard highlight.
The DatePicker's popover contains the existing `Calendar` primitive
which already implements the W3C grid pattern.

**Pairing:** the two are designed to compose for full datetime inputs
— same size scale, same visual treatment, same input feel.
