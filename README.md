# Catylast Component Library

The design system and component library for the Catylast product. Read
[`CLAUDE.md`](./CLAUDE.md) for the full project record — scope, architecture,
conventions, and process.

## Requirements

- Node.js 22+
- pnpm 9+ (managed via corepack — `corepack enable` then `corepack prepare pnpm@9.15.0 --activate`)

## Quick start

```bash
pnpm install     # install workspace deps
pnpm dev         # run Storybook in watch mode (after Storybook is set up)
pnpm build       # build all packages
pnpm test        # run unit tests
pnpm lint        # ESLint + Prettier check
```

## Repo layout

```
apps/
  storybook/                 # docs site (coming soon)
packages/
  tokens/                    # @catylast/tokens
  theme/                     # @catylast/theme
  icons/                     # @catylast/icons
  primitives/                # @catylast/primitives
  card/                      # @catylast/card
  rich-editor/               # @catylast/rich-editor
  dynamic-table/             # @catylast/dynamic-table
```

See [`CLAUDE.md`](./CLAUDE.md) for the component roadmap, shipped status, and
contributor process.
