---
"@catylast/primitives": minor
---

Extend `Checkbox` to the full state surface modern design systems expose
and make every styling dimension customisable through both an enum
prop and a CSS variable.

**New props:**
- `isChecked` — controlled checked state (the `is*` boolean naming
  convention common in modern React libraries, alias for Radix's
  `checked`).
- `isIndeterminate` — render the partial / mixed dash glyph.
- `isDisabled` — alias for the native `disabled` attribute.
- `isInvalid` — error state. Red border, plus red filled background
  when checked. Sets `aria-invalid="true"`.
- `isRequired` — appends a red asterisk to the label and sets the
  native `required` attribute.
- `onChange(checked: boolean)` — friendlier callback signature than
  Radix's `onCheckedChange(boolean | 'indeterminate')`.

**New `size="large"`** (20px box, 14px glyph) joins the existing
`small` and `medium` scales. Legacy `sm` / `md` short forms continue
to work.

**Customisation:** every styling dimension now flows through a CSS
variable on the checkbox root — `--checkbox-size`, `--checkbox-radius`,
`--checkbox-bg-checked`, `--checkbox-border-color-invalid`,
`--checkbox-gap`, `--checkbox-required-color`, etc. — so consumers can
override per-instance via inline `style` for values outside the enum
vocabulary.

**Backwards compatibility:** all v0.1 / v0.2 / v0.3 callsites continue
to work unchanged. `checked`, `disabled`, `onCheckedChange`, and the
short-form sizes are still accepted; the new prop names are
recommended for clarity but not required.
