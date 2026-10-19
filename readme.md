# bruno-script-docs

Builds the HTML reference for Bruno's script API (`bru`, `req`, `res`, `test`, `expect`, …) with
[TypeDoc](https://typedoc.org).

The content lives in the Bruno repository: the JSDoc in `packages/bruno-js` is read by
`scripts/generate-script-api.js` there and written to `packages/bruno-js/types/script-api.d.ts`,
which is committed. This repository only fetches that file and renders it, so API changes are
reviewed in Bruno and theme changes are reviewed here.

## Building

```bash
nvm use
npm i
npm run docs        # fetch types/script-api.d.ts, then build dist/
```

`npm run fetch` downloads `types/script-api.d.ts` from the ref pinned in
`scripts/fetch-script-api.js`; bump `SCRIPT_API_REF` to publish a newer API. `npm run build` runs
TypeDoc (`typedoc.json`) on it and writes the site to `dist/`.

The `@types/*` packages the declarations reference (`/// <reference types="…" />` at the top of
the file) must be installed here; today that is `@types/chai`.

## Layout

- `typedoc.json` – TypeDoc options, category order and navigation.
- `tsconfig.json` – how TypeDoc type-checks the declarations.
- `typedoc/plugin.mjs` – registers the `@context` and `@runtime` block tags the generator emits
  and rewrites them as sentences for the reader; defines the `bruno` theme.
- `typedoc/header.html` – the top bar, with a theme switcher as on docs.usebruno.com.
- `typedoc/theme.css`, `typedoc/bruno.svg` – styles and favicon.

The `@context` and `@runtime` values, and the `@category` names in `categoryOrder`, are written in
the JSDoc in Bruno. A new script context or a renamed category needs a matching change in
`typedoc/plugin.mjs` or `typedoc.json`.
