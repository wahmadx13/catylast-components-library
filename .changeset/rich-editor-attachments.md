---
"@catylast/rich-editor": minor
---

Extend the rich text editor to handle **generic file attachments**
alongside images and videos. The same `onUpload(file)` callback
handles all three media types — your handler decides which node to
insert by setting the `type` field on the result.

**`UploadResult` now supports `type: "file"`** with optional `name`,
`size`, and `mimeType` metadata:

```ts
type UploadResult = {
  url: string;
  type: "image" | "video" | "file";
  name?: string;     // → Attachment label
  size?: number;     // → "1.4 MB" meta line
  mimeType?: string; // → drives the colored extension tile
};
```

Backwards-compatible — existing callers that only return `{ url, type
}` for image/video uploads keep working.

**New Attachment Tiptap extension** — renders a card-like row with:

- a colored "extension tile" on the left (PDF / ZIP / DOC / etc.) —
  the kind of attachment is auto-classified from the MIME type and
  filename extension into one of `image / video / audio / pdf /
  archive / document / spreadsheet / presentation / code / file`,
- the filename,
- a meta line ("1.4 MB · PDF document"),
- a trailing download button that opens the URL in a new tab.

Attachments survive `getJSON()` / `getHTML()` round-trips losslessly —
URL, name, size, and MIME type are stored as node attributes.

**Programmatic API** — drop attachments from outside the toolbar
(custom drop zones, paste handlers, recent-files pickers):

```tsx
editor.chain().focus().setAttachment({
  url, name, size, mimeType,
}).run();
```

**New surfaces:**

- New `attach-file` toolbar item key. Added to the `standard` and
  `full` presets between `video` and `mention`. Renders a paperclip
  button.
- New "File attachment" entry in the +Insert element catalog under the
  `content` category.

**Helpers exposed for consumers:**

- `pickKind(mimeType, name)` — coarse-grained kind classification.
- `pickTileLabel(name, mimeType)` — short uppercase label for the
  colored tile.
- `formatFileSize(bytes)` — human-readable size ("1.4 MB").
- `Attachment` extension and `AttachmentOptions` / `AttachmentKind`
  types.
