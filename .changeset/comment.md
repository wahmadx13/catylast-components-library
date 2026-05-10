---
"@catylast/primitives": minor
---

Add `Comment` — the conversation primitive across Catylast (issue
threads, document comments, code-review notes, audit-log entries).

**Slots:**
- `avatar` — visual identity, typically paired with `<Avatar>`.
- `author` — required; pass plain text or any node.
- `type` — optional role tag after the author name (string for the
  default tag style, or any node for full control).
- `restrictedTo` — lock icon + visibility-restriction label.
- `time` — timestamp, typically a relative-time link to the
  permalink.
- `content` — body. Plain text, rich text, or any custom node.
- `actions` — array of action items rendered with `·` separators.
  Falsy entries are filtered, so `cond && <Button />` works.
- `children` — nested replies in an indented thread block.

**States:**
- `highlighted` — accent border on the leading edge plus tinted
  background. For *just-posted*, *@me mention*, or *deep-linked*
  comments.
- `isSaving` — animated dot + "Saving…" copy under the body.
  Disables interaction so users can't double-submit. Override the
  copy via `savingText`.

**Sizes:** `small` / `medium` / `large` scale body type and inner
padding together.

**Accessibility:** semantic `<article>` root, author rendered as a
heading (override level via `headingLevel`), restriction label has
`aria-label`, saving overlay is `aria-live="polite"`, action group
uses `role="group"`.

**Customisation:** every styling dimension is exposed as both an
enum prop and a CSS variable (`--comment-bg`, `--comment-padding`,
`--comment-accent-color-highlighted`, `--comment-nested-indent`,
`--comment-nested-border-color`, …) so consumers can override per-
instance via inline `style` for branded highlight colors, custom
indentation, hairline thread guides, and so on.
