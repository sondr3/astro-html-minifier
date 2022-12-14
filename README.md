<h1 align="center">astro-html-minifier</h1>
<p align="center">
    <a href="https://github.com/sondr3/astro-html-minifier/actions"><img alt="GitHub Actions Status" src="https://github.com/sondr3/astro-html-minifier/workflows/pipeline/badge.svg" /></a>
    <a href="https://www.npmjs.com/package/astro-html-minifier"><img src="https://img.shields.io/npm/v/astro-html-minifier" alt="npm version"></a>
</p>

<p align="center">
    <b>A HTML minifier for Astro</b>
</p>

- **Simple**: Set it and forget it
- **Performant**: Uses highly performant libraries to minify
- **Optimal**: By minifying, the server can serve optimal bundles

<details>
<summary>Table of Contents</summary>
<br />

## Table of Contents

- [Quickstart](#quickstart)
- [Usage](#usage)
- [License](#license)
</details>

# Quickstart

Install via your tool of choice:

```sh
# Using NPM
npm run astro add astro-html-minifier
# Using Yarn
yarn astro add astro-html-minifier
# Using PNPM
pnpm astro add astro-html-minifier
```

Then, restart the dev server by typing `CTRL-C` and then `npm run dev` in the terminal window that was running Astro.

# Usage

First, install the package with your favorite package manager: `pnpm add --dev astro-html-minifier`,
then configure it in your `astro.config.*` file in the `integrations` property:

```js
import { defineConfig } from "astro/config";
import minifyHtml from "astro-html-minifier";

export default defineConfig({
  // ...
  integrations: [minifyHtml()],
});
```

# License

MIT.
