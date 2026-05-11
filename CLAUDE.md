# Catylast — Component Library & Design System

This document is the project record. It defines what we are building, why, and how.
Future contributors (and future Claude sessions) should read this first.

---

## 1. What this repo is

`catylast-storybook` is the **design system and component library** that the Catylast
product consumes. It is a long-lived, growing collection of React components, design
tokens, icons, and documentation — published to npm and to a private registry — and
used by the Catylast application (which lives in a separate repo).

This repo is **not** the Catylast app. It does not contain product code, business
logic, backend integrations, or routes. It contains reusable UI building blocks and
the docs site that describes how to use them.

The library is modeled after the structure of public design system sites — every
component has its own page in Storybook with tabbed sub-pages for **Examples**,
**Code**, **Usage**, and **Changelog**. The visual feel of the components targets a
professional project-management tool aesthetic so that adoption inside the Catylast
app feels familiar to users coming from established tools in the same category.

The library will eventually cover the full surface area of the Catylast UI — every
button, form control, layout primitive, overlay, navigation pattern, feedback
element, and data-display component the app needs. We grow it one component at a
time, in priority order set by the product team.

## 2. What we mean by "component library"

A few principles that hold for every component we ship — not just the ones in
flight today:

- **One component, one job.** Each component does one well-defined thing and is
  composable with the others. A `DynamicTable` does not embed a `DateRangePicker`;
  consumers compose them.
- **Headless engine + owned markup, where stateful.** For complex interactive
  components we use a headless library for the state machine and write the markup
  and CSS ourselves. For simple components we write everything.
- **Token-driven.** No component contains a hardcoded color, radius, shadow, or
  font size. Everything resolves through `@catylast/tokens`. This is the rule that
  makes a future Figma swap a one-day job.
- **Theme-agnostic.** No component reads `theme === 'dark'` to branch behavior. If
  a value differs by theme, the difference lives in the token.
- **Accessible by default.** Roles, keyboard handlers, focus management, and ARIA
  attributes are not optional. They ship with the component.
- **Storybook is the source of truth for visual states.** Every component's stories
  cover default, hover, focus-visible, disabled, loading, empty, error, and any
  state-machine variants. Visual regression tests read from Storybook.
- **Original work.** No upstream UI kit is wrapped, embedded, or copied. Every
  component, including its CSS and class names, is original to Catylast. Headless
  dependencies (TanStack, Radix, dnd-kit) ship logic, not visuals — they are fine.

## 3. Component roadmap (categories)

A non-exhaustive map of what the library will eventually contain, grouped by
category. Order within each group is rough; specific build order is set per sprint
based on what the Catylast app needs next.

| Category     | Components                                                                                                                          |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| Foundations  | tokens, theme provider, icons, typography, layout primitives (Box, Stack, Inline, Grid)                                             |
| Actions      | Button, IconButton, Link, ButtonGroup                                                                                               |
| Forms        | TextField, TextArea, Select, Combobox, MultiSelect, Checkbox, Radio, Toggle, Calendar, DatePicker, DateRangePicker, FileUpload, Field wrapper |
| Display      | Avatar, AvatarGroup, Badge, Tag, Pill, Tooltip, Comment, Heading, Text, Code, Kbd                                                   |
| Feedback     | Toast, InlineMessage, Banner, ProgressBar, ProgressCircle, Spinner, Skeleton, EmptyState, ErrorState                                |
| Overlay      | Modal, Drawer, Popover, Menu, DropdownMenu, ContextMenu, ConfirmDialog                                                              |
| Navigation   | Tabs, Breadcrumbs, Pagination, SideNav, TopNav, Stepper                                                                             |
| Data display | DynamicTable, Tree, DescriptionList, Card, Timeline (Gantt)                                                                            |
| Utilities    | Divider, ScrollArea, FocusRing, VisuallyHidden, Portal                                                                              |

Each component lands as part of one of the existing packages or as its own package,
based on bundle and dependency considerations described in §6.

## 4. Shipped components

Living status table. Updated by the PR that ships each component.

| Component / package          | Version | Status      | Storybook |
| ---------------------------- | ------- | ----------- | --------- |
| `@catylast/tokens`           | 0.1.0   | Beta        | Foundations/Tokens |
| `@catylast/theme`            | 0.1.0   | Beta        | Foundations/Theme  |
| `@catylast/icons`            | 0.2.0   | Beta        | Foundations/Icons (Lucide-backed `<Icon>` plus brand-colored `WorkItemTypeIcon` (14 types: epic, story, task, sub-task, qa-bug, feature, frontend, backend, api-requirement, business-gap, change-request, figma, integration, production-incident) and `PriorityIcon` (6 tiers: highest → none) — both with `previewTitle` to toggle the inline label) |
| `@catylast/primitives` | 0.8.0   | Beta        | Actions/* · Display/* · Forms/* · Overlay/* (Button family — Button, IconButton, LinkButton, LinkIconButton, SplitButton, ButtonGroup — plus Calendar, DatePicker (input + Calendar popover, locale-aware parse / format), TimePicker (input + time list, 12h / 24h, type-to-filter), Checkbox (full state model — isChecked, isIndeterminate, isDisabled, isInvalid, isRequired), Comment (avatar / author / type / time / restricted / actions / nested replies, with isSaving and highlighted states), Avatar (deterministic name-hashed colored initials, named-preset and custom-palette overrides), DropdownMenu family (DropdownMenu container · DropdownItem · DropdownItemGroup with title + separator · DropdownItemCheckbox · DropdownItemRadioGroup + DropdownItemRadio · sub-menus · per-item appearance + iconBefore/iconAfter/description), Badge, Select, Combobox, Tooltip, Popover, Menu (with Sub), ContextMenu (with Sub)) |
| `@catylast/dynamic-table` | 0.1.0   | Beta        | Data/DynamicTable  |
| `@catylast/rich-editor`      | 0.3.0   | Beta        | Forms/RichEditor (Tiptap-backed editor, dynamic toolbar with `basic`/`standard`/`full` presets, click-to-edit, slash menu, mentions, panels, custom block DnD, image / video / file-attachment uploads with kind-aware Attachment cards) |
| `@catylast/card`             | 0.1.0   | Beta        | Display/Card (variants, states, slots, sizing knobs, image patterns, polymorphic `as`, CSS-var escape hatch) |

Statuses: `Not started`, `In progress`, `Beta`, `Stable`, `Deprecated`.
When a component or package reaches Beta, add a row pointing to its Storybook page.
When it reaches Stable, bump its row's version to the first stable release.

## 5. Current focus

**Sprint goal:** ship `@catylast/dynamic-table` (the "dynamic table") at Beta,
plus all foundations it depends on.

The DynamicTable is the first real component because it is the most complex thing the
Catylast app needs and exercises the full stack — tokens, theme, primitives,
keyboard handling, virtualization, accessibility. Building it first surfaces every
gap in the foundations early, while the cost of fixing them is still small.

**Deferred for a later milestone:** a `Timeline` (Gantt-style roadmap) composite
that will be built on top of `DynamicTable`. The DynamicTable's API must not preclude
this — it needs row pinning, hierarchical expansion, and custom cell renderers so
Timeline can layer on top without rework.

### 5.1 DynamicTable feature checklist

| Feature                                          | Source                                               |
| ------------------------------------------------ | ---------------------------------------------------- |
| Sticky / pinned columns                          | TanStack column pinning + `position: sticky`         |
| Horizontal scroll for unpinned columns           | Native overflow on the scroll container              |
| Hierarchical row expansion (parent → children)   | TanStack `getExpandedRowModel`                       |
| Group/section header rows                        | TanStack `getGroupedRowModel`                        |
| Row selection (single + multi)                   | TanStack row selection, controlled                   |
| Sorting per column                               | TanStack sorting                                     |
| Resizable columns                                | TanStack `enableColumnResizing`                      |
| Density modes (compact / standard / comfortable) | Token-driven row height                              |
| Custom cell renderers                            | First-class `cell` render prop                       |
| Inline row creator (e.g. "+ Create")             | `renderCreator` slot rendered after last row         |
| Right-click context menu per row                 | Wraps Radix `ContextMenu`, items passed via prop     |
| Virtualization for large datasets                | `@tanstack/react-virtual` opt-in                     |
| Empty / loading / error states                   | First-class slots                                    |
| Keyboard navigation (arrows, Enter, Space)       | Custom layer; not from TanStack                      |
| Theme-aware (light / dark / system)              | Reads semantic tokens                                |
| Generic over row shape                           | Full TypeScript generics; consumer keeps type safety |

Public API target (rough):

```tsx
<DynamicTable<Row>
  columns={columns}
  data={rows}
  pinnedColumns={['title']}
  expandable
  selection="multi"
  density="standard"
  virtualized
  onRowContextMenu={(row) => /* menu items */}
/>
```

## 6. Tech stack

| Layer                  | Choice                                                         |
| ---------------------- | -------------------------------------------------------------- |
| Language               | TypeScript (strict)                                            |
| UI runtime             | React 18+ (peer dep — supports 19)                             |
| Package manager        | pnpm with workspaces                                           |
| Build orchestration    | Turborepo                                                      |
| Library bundler        | tsup (ESM + CJS + d.ts per package)                            |
| Component CSS          | vanilla-extract                                                |
| Token runtime          | CSS custom properties                                          |
| Headless table         | @tanstack/react-table                                          |
| Headless primitives    | Radix UI                                                       |
| Icons (placeholder)    | Lucide React (MIT) — swappable                                 |
| Storybook              | v10 with @storybook/react-vite                                 |
| Unit tests             | Vitest + @testing-library/react                                |
| Interaction tests      | Storybook play functions                                       |
| Visual regression      | Storybook Test Runner + Playwright (Chromatic optional later)  |
| Linting                | ESLint flat config + Prettier                                  |
| Versioning / changelog | Changesets                                                     |
| Browser support        | Last 2 versions of Chrome, Edge, Firefox, Safari (modern only) |

### 6.1 Why these choices

- **Plain React, not Next.js** — the library targets any React consumer; we do
  not couple to a framework. Components that require client APIs are marked
  `"use client"` so they remain RSC-compatible in apps that use them.
- **Monorepo** — each concern is an independently versioned package. The Catylast
  app installs only what it uses.
- **CSS variables for tokens** — instant theme switching via DOM attribute flip,
  no JS in the critical render path, and apps can override any token at any DOM
  scope by setting the variable on a wrapper.
- **vanilla-extract** — zero-runtime, type-safe, references tokens by typed import
  so a token rename surfaces as a TypeScript error rather than a silent visual
  break.
- **TanStack + Radix** — best-in-class headless logic with no styling opinions,
  small bundles, strong accessibility primitives. We get the hard parts (keyboard
  nav, focus traps, ARIA) right and own everything visual.

## 7. Repo structure

```
catylast-storybook/
├── apps/
│   └── storybook/                 # public-facing docs site
├── packages/
│   ├── tokens/                    # @catylast/tokens
│   ├── theme/                     # @catylast/theme
│   ├── icons/                     # @catylast/icons
│   ├── primitives/                # @catylast/primitives
│   ├── card/                      # @catylast/card
│   ├── rich-editor/               # @catylast/rich-editor
│   └── dynamic-table/             # @catylast/dynamic-table
├── .changeset/
├── .github/workflows/
├── pnpm-workspace.yaml
├── turbo.json
├── tsconfig.base.json
├── package.json
└── CLAUDE.md
```

New components default to landing inside `primitives` if they are small,
shared dependencies for many other components. Heavier or more specialized
components get their own package (like `dynamic-table`) so consumers don't pay
for code they don't use. This decision is made when the component is planned, not
retroactively.

Package names drop the `react-` prefix even though every component is React.
The framework is implied by the peer dependency, not by the name. This matches
the convention used by Mantine, Radix UI, and other modern React libraries.
Framework-agnostic packages (`@catylast/tokens`, `@catylast/theme`,
`@catylast/icons`) follow the same naming.

Each package owns its own `package.json`, `tsup.config.ts`, `tsconfig.json`, and
`README.md`. Packages publish independently; their versions are managed by
Changesets.

## 8. Token model

Three tiers, in `packages/tokens/src`:

1. **Primitive tokens** — raw, theme-agnostic values. Color ramps, the spacing
   scale, the radius scale, the typography scale, the elevation scale. These never
   appear in component code.
2. **Semantic tokens** — purpose-named, theme-aware. Surface backgrounds, text
   colors at varying emphasis, borders, accent backgrounds, focus rings, selection
   states, etc. Defined separately for `light` and `dark`. **All component code
   references only semantic tokens.**
3. **Component tokens** _(optional, only when needed)_ — aliases of semantic
   tokens scoped to one component. Useful when a component needs a knob the app
   should be able to override without touching the semantic layer.

The build step emits:

- `dist/light.css` and `dist/dark.css` — CSS variable definitions wrapped in
  `[data-theme="light"]` and `[data-theme="dark"]` selectors.
- `dist/tokens.json` — flat JSON for Figma sync (Tokens Studio compatible) once
  the designer's Figma file is ready.
- `dist/index.js` — typed JS exports of token names, so vanilla-extract code can
  reference tokens with autocomplete and compile-time safety.

Initial token values are reverse-engineered visual approximations. When the Figma
file lands, swapping to the real values is a one-file edit.

## 9. Component conventions

These rules apply to every component, not just the one in flight today.

- **No hardcoded colors, sizes, radii, shadows, or font sizes in component code.**
  Everything goes through `@catylast/tokens` semantic tokens. PR review rejects any
  literal hex value, px value (outside borders/hairlines), or rem value not derived
  from a token.
- **Accessible by default.** Correct roles, keyboard handlers, focus management,
  and ARIA attributes ship with the component. Components built on Radix inherit
  most of this; components built from scratch must implement it explicitly.
- **Theme-agnostic.** No `if (theme === 'dark')` branches. Theme differences are
  expressed as token values, not as component logic.
- **Generic and composable.** Public APIs use TypeScript generics where the
  component is parametric over data (e.g., `DynamicTable<Row>`, `Combobox<Item>`).
  Consumers retain full type safety.
- **Stories cover every state.** Default, hover, focus-visible, disabled, loading,
  empty, error, and any state-machine variants the component exposes.
- **Public API is documented in MDX.** The Usage tab for each component explains
  _when_ and _why_ to use it, not just _how_.
- **Each package has a README** with install command, basic usage, and a link
  back to its Storybook page.
- **No comments that describe what code does** — names should carry that.
  Comments explain non-obvious _why_ (a constraint, a known browser quirk, an
  invariant).

## 10. Storybook docs convention

Every component gets the same documentation shape so the experience is consistent
across the library:

- **Examples** — interactive Storybook stories, one per meaningful variant. The
  default landing tab.
- **Code** — autodocs page rendered from the component's TS types and JSDoc.
- **Usage** — an MDX page describing when to reach for this component, when not
  to, accessibility notes, and integration patterns.
- **Changelog** — rendered from the package's `CHANGELOG.md`, which Changesets
  generates from PR-authored changeset files. Same source of truth as the
  published version.

The Storybook manager theme is customized so the docs site has a consistent
Catylast look rather than the default Storybook chrome.

## 11. Process: adding a new component

When the team picks up a new component, follow these steps:

1. **Plan.** Decide the package it belongs in (existing or new), its public API,
   and the states it must cover. Add an entry to §3 if a category is missing.
2. **Update §4** — add the component to the Shipped table with `In progress`.
3. **Implement.** Build with the conventions in §9. If new tokens are needed,
   add them to `@catylast/tokens` first and use the semantic tier in the
   component.
4. **Stories.** Cover every state listed in §9. Add an MDX Usage page.
5. **Tests.** Unit tests for logic, interaction tests via Storybook play
   functions, visual regression via the Storybook Test Runner.
6. **Changeset.** Author a changeset describing the change for the Changelog.
7. **PR review.** Reviewer checks for hardcoded values, accessibility, story
   coverage, and that §4 was updated.
8. **Release.** When merged, CI versions and publishes via Changesets. Update
   the §4 row from `In progress` to `Beta` (or `Stable` if it's been stable for
   one app integration cycle).

## 12. Build order (foundations)

Strict order — each step blocks the next. This applies to bootstrapping the
library, not to subsequent component additions.

1. Monorepo scaffold + tooling (pnpm, Turbo, TS, ESLint, Prettier, Changesets).
2. Storybook 10 app with theme switcher in the manager toolbar.
3. `@catylast/tokens` — token system end to end, with light + dark CSS emit.
4. `@catylast/theme` — ThemeProvider, useTheme, system mode.
5. `@catylast/icons` — Lucide-backed `<Icon name="…" />` API.
6. `@catylast/primitives` — Button, IconButton, Checkbox, Avatar, Badge,
   Tooltip, Menu, Popover, ContextMenu. Each gets stories.
7. `@catylast/dynamic-table` — full feature set in §5.1. Stories cover every
   state.
8. Visual regression in CI (Playwright Test, see §16).
9. Cut `0.1.0` releases via Changesets.

We do not skip ahead. Tokens before primitives, primitives before composite
components, because each layer is the substrate for the next and rework cascades
downward. After step 9 the project is in steady-state and §11 is the process
for everything new.

## 13. Workflow commands

These will exist after the scaffold lands:

```bash
pnpm install                  # install all workspace deps
pnpm dev                      # run Storybook in watch mode
pnpm build                    # build all packages via Turbo
pnpm test                     # run unit tests across the workspace
pnpm lint                     # ESLint + Prettier check
pnpm changeset                # author a changeset for a PR
pnpm release                  # version bump + publish (CI only)

# Visual regression (run from apps/storybook, see §16)
pnpm --filter @catylast/storybook test:visual:install   # one-time chromium install
pnpm --filter @catylast/storybook build                 # build storybook-static
pnpm --filter @catylast/storybook test:visual:update    # generate / refresh baselines
pnpm --filter @catylast/storybook test:visual           # diff against baselines
```

## 14. Open questions / decisions deferred

- **Real Catylast data shapes.** Components like DynamicTable, Combobox, and Tree
  are generic over their data, but stories should mirror real usage. Once API
  access or sample payloads are available, replace placeholder example data
  with realistic shapes.
- **Designer Figma handoff.** When the Figma file is ready, replace placeholder
  token values in `packages/tokens/src` and swap the icon set in
  `packages/icons/src`. Both are designed to be one-file changes.
- **Chromatic vs self-hosted visual regression.** Start with Playwright + Storybook
  Test Runner (free). Reassess Chromatic when the library starts being consumed
  by the Catylast app and the cost of regressions becomes higher than the
  subscription.
- **Public docs site.** Storybook 10 is the docs site for v0.x. If marketing later
  wants something more branded, a separate Next.js site can sit in `apps/docs`
  and embed Storybook stories — non-blocking for shipping the library.
- **Component priority order after DynamicTable.** Set per sprint based on what the
  Catylast app needs next.

## 15. How to work in this repo

- Read this file end-to-end before starting work.
- For bootstrapping work, follow the build order in §12. Do not skip ahead.
- For new components after bootstrap, follow §11.
- For any decision not covered here, prefer the smaller, more reversible option,
  and add a note to §14 so it's tracked.
- When scope changes, update §3, §4, and §5 in the same PR that introduces the
  change.

## 16. Visual regression

Visual regression lives in `apps/storybook` and uses **Playwright Test** running
against the static `storybook-static/` build. Each story is screenshotted twice
— once with `data-theme="light"` and once with `data-theme="dark"` — by passing
`globals=themeMode:<mode>` to Storybook's iframe URL.

### Files

- `apps/storybook/playwright.config.ts` — Playwright config. Spins up a local
  `http-server` on port 6006 to serve `storybook-static/`, retries twice on CI,
  rejects more than 1% pixel difference.
- `apps/storybook/tests/visual.spec.ts` — single spec that reads
  `storybook-static/index.json`, filters to `type === "story"` entries, and
  generates a Playwright test for each `(story, theme)` pair.
- `apps/storybook/tests/visual.spec.ts-snapshots/` — committed baseline PNGs.
  Playwright auto-creates this folder on first `--update-snapshots` run.

### First-time setup

```bash
pnpm --filter @catylast/storybook test:visual:install   # downloads chromium
pnpm --filter @catylast/storybook build                 # produces storybook-static
pnpm --filter @catylast/storybook test:visual:update    # generates baselines
git add apps/storybook/tests/visual.spec.ts-snapshots
git commit -m "test: add visual regression baselines"
```

### Subsequent runs

```bash
pnpm --filter @catylast/storybook build
pnpm --filter @catylast/storybook test:visual           # diff vs baselines
```

A failing run produces a side-by-side diff in `apps/storybook/test-results/`.
Inspect it. If the change is intentional, re-run with `--update-snapshots` and
commit the new baselines.

### Cross-platform note

Browser font rendering varies between Windows / macOS / Linux. Baselines
generated on one platform will fail elsewhere. The recommended path is to
generate baselines in CI (Linux container) and require all developers to
trigger updates through the same CI workflow rather than committing local
screenshots. For early development, generating locally and re-running
`--update-snapshots` whenever the platform changes is acceptable.

## 17. Card — design approach

This section records the architectural decision behind how Card is built in
Catylast, including the prior art we looked at and the reasoning. Read this
before starting work on `Card` or `WorkItemCard`.

### 17.1 Why some design systems don't ship a `Card`

Several mature design systems deliberately do **not** ship a `Card` component.
Instead, they provide:

- **Layout primitives** — `Box`, `Stack`, `Inline`, `Flex`, `Grid`, `Bleed`
- **Interaction primitives** — `Pressable`, `Anchor`, `Focusable`
- **Content building blocks** — `Heading`, `Text`, `Tile`, `Avatar`, `Badge`,
  `Tag`

The philosophy: a "card" is a *composition* of a bordered/elevated surface
(`Box` with token-driven styling), a vertical layout (`Stack`), and whatever
content the consumer needs. Packaging that into a single `Card` component
would either lock consumers into one rigid layout or balloon into a
multi-slot kitchen sink that's harder to use than the primitives it wraps.
This is the same reasoning behind not shipping a `Modal` primitive
(use `Dialog` slots instead), and it follows the pattern philosophy used
by Adobe Spectrum and Radix.

The closest thing those libraries do ship is something like **`Tile`** —
a rounded square that displays a single asset (logo, app icon, document
thumbnail). It is *not* a content card; it is a thumbnail.

### 17.2 What ticket trackers actually render as a "card"

Issue-tracking products are built on top of a design system but typically
add a recognizable **work-item card** that appears on every board, backlog
row, and search result. It is not a primitive — it is an app-level
composition built from the DS primitives above. Its slots:

- **Cover stripe** (optional) — color or image
- **Top row** — work-item type icon + key (e.g. `CAT-123`) on the left,
  status / priority indicators on the right
- **Title** — single primary heading
- **Body** — optional epic chip, parent breadcrumb, custom field chips
- **Bottom row** — assignee avatar(s), story-point or estimate badge,
  sub-task progress, due date, label dots / pills

Kanban-style boards add: cover image, label patterns (colorblind-aware),
attachment / checklist / comment / vote badges, member avatars, stickers,
custom fields. Same pattern, more decoration.

### 17.3 Our approach — two layers

We follow the compositional design-system philosophy **for the primitives**
but ship the ticket-style work-item composition ourselves so the Catylast
app doesn't reinvent it in every consuming surface. Concretely:

1. **`Card` primitive (in `@catylast/card`)** — a thin styled surface. Not
   domain-specific. Equivalent to `Box` with card affordances added on top.
   Lives in its own package (rather than `primitives`) so consumers
   that only need the card surface — e.g. a marketing site or a dashboard
   widget consumer — don't pull in the rest of the primitives library. It is what consumers reach for when they need *any*
   contained block: dashboard widgets, settings tiles, profile blocks,
   empty-state surfaces, modal content.

   - **Variants:** `outlined`, `elevated`, `filled`
   - **States:** default, hover, pressed, selected, disabled
   - **Slots:** `cover` (image/color top), `header`, `body`, `footer`
   - **Interaction:** `interactive` flag turns the whole card into a
     `Pressable`-style affordance (keyboard + screen-reader semantics);
     omitting it renders a static surface.
   - **Tokens:** background, border, radius, elevation, padding, hover /
     selected state — all pulled from `@catylast/tokens` semantic layer.
     No hardcoded values.

2. **`WorkItemCard` composition (separate package, e.g.
   `@catylast/work-item` — TBD)** — the ticket-style work-item card built
   *on top of* `Card`. Domain-shaped props:

   - `id`, `title`, `type` (story / bug / task / epic / subtask), `status`,
     `priority`, `assignee`, `reporter`, `dueDate`, `points`, `labels[]`,
     `parent` (epic chip), `subtaskProgress`, `commentCount`,
     `attachmentCount`, `coverImage?`
   - **Variants:** `compact` (backlog list row), `standard` (board card),
     `expanded` (sidebar / detail panel preview)
   - **Drag affordance** — works with the future board's DnD without
     hardcoding a library.
   - This package only ships when the Catylast app's work-item shape is
     stable enough to standardize. Until then, the Catylast app composes
     the issue card from `Card` + primitives in its own codebase.

### 17.4 What this means in practice

- **Phase 1 (now):** ship the `Card` primitive in its own `@catylast/card` package.
  Storybook covers cover/header/body/footer slot examples, all variants,
  all states. Visual regression baselines included.
- **Phase 2 (after work-item shape is known):** ship `WorkItemCard` as a
  separate package consuming `Card`.
- **The Catylast app builds its own issue card right now** by composing
  `Card` + `Avatar` + `Badge` + `Lozenge` + `Stack` + `Inline`. Once the
  pattern stabilizes across screens, lift it into `WorkItemCard`.

### 17.5 Why not skip the primitive and only ship `WorkItemCard`?

Tempting — but every other surface that wants a "contained block" (dashboard
widgets, settings tiles, empty states, modal cards) would either build its
own Card or misuse `WorkItemCard`. Shipping the primitive first means
consistency across all those surfaces and turns `WorkItemCard` into a
20-line composition instead of a 200-line one. It also lets us ship Phase 1
*now*, before the work-item shape is locked.

### 17.6 Why not skip both and ship only primitives?

Two reasons. First, every Catylast surface needs a card-shaped container
and we don't want six developers writing six slightly different "Box with a
border" implementations. Second, the design intent for Catylast (a modern
ticket / project management product) means board cards are a load-bearing
UI — they justify shipping a primitive that makes them trivial to compose.
