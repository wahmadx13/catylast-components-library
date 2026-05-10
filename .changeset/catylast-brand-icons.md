---
"@catylast/icons": minor
---

Add the Catylast-branded **work-item type** and **priority** icon
families. Both are first-class members of `@catylast/icons` alongside
the existing Lucide-backed `<Icon>` registry.

**`WorkItemTypeIcon`** — 14 brand-colored glyphs covering the full
spectrum of Catylast work-item types: `epic`, `story`, `task`,
`sub-task`, `qa-bug`, `feature`, `frontend`, `backend`,
`api-requirement`, `business-gap`, `change-request`, `figma`,
`integration`, `production-incident`. Each glyph keeps its native
artwork and color so it stays recognizable across surfaces.

**`PriorityIcon`** — 6 priority tiers: `highest`, `high`, `medium`,
`low`, `lowest`, `none`. Each glyph uses its semantic color (red for
highest, blue for low, etc.). `PRIORITY_ORDER` exposes a numeric
ordering for sortable priority columns.

**`previewTitle` prop** — both icon components accept `previewTitle`
to toggle a trailing label. `false` (default) renders the glyph
alone — perfect for dense table cells. `true` renders the canonical
label inline (`WORK_ITEM_TYPE_LABELS[name]` /
`PRIORITY_LABELS[name]`). Pass a custom string to override the label
entirely.

**Public exports added:**

- `WorkItemTypeIcon`, `WORK_ITEM_TYPE_NAMES`,
  `WORK_ITEM_TYPE_LABELS`, `workItemTypeRegistry`, type
  `WorkItemType`, type `WorkItemTypeIconProps`.
- `PriorityIcon`, `PRIORITY_NAMES`, `PRIORITY_LABELS`,
  `PRIORITY_ORDER`, `priorityRegistry`, type `Priority`, type
  `PriorityIconProps`.

**Source SVGs** live under `packages/icons/svgs/work-item-types/`
and `packages/icons/svgs/priorities/` for reference / regeneration.
The components are inlined as JSX in `workItemTypes.tsx` and
`priorities.tsx` so they ship with the bundle (no extra HTTP fetch
at runtime).

**DynamicTable demo** — the work-item type column now uses
`WorkItemTypeIcon` automatically, and the priority column renders
through a new `PriorityCell` helper so the icon picks the right
glyph from the row's `priority` value with no mapping layer. The
demo's `WorkItemType` and `Priority` types now mirror the
icon-registry keys exactly.
