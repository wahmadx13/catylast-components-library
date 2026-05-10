# Changesets

This directory holds changeset files. Each PR that changes a publishable package
should include a changeset describing the change.

## Authoring a changeset

```bash
pnpm changeset
```

Pick the affected packages, pick the bump type (patch / minor / major), write a
short summary. The CLI writes a markdown file here. Commit it with your PR.

## Releasing

CI runs `pnpm version-packages` to consume the changesets, bump versions, and
update `CHANGELOG.md` files. Then `pnpm release` builds and publishes.

See `.changeset/config.json` for configuration.
