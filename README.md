<h1 align="center">astro-html-minifier</h1>
<p align="center">
    <a href="https://github.com/sondr3/astro-html-minifier/actions"><img alt="GitHub Actions Status" src="https://github.com/sondr3/astro-html-minifier/workflows/pipeline/badge.svg" /></a>
    <a href="https://www.npmjs.com/package/astro-html-minifier"><img src="https://img.shields.io/npm/v/astro-html-minifier" alt="npm version"></a>
</p>

<p align="center">
    <b>A HTML minifier for Astro</b>
</p>

**DEPRECATED: You don't need this anymore!**

Since [Astro 2.5](https://astro.build/blog/astro-250/#html-minification) HTML minification is built in.

- **Simple**: Set it and forget it
- **Performant**: Uses highly performant libraries to minify
- **Optimal**: By minifying, the server can serve optimal bundles

<details>
<summary>Table of Contents</summary>
<br />

## Table of Contents

- [Quickstart](#quickstart)
- [Usage](#usage)
  - [Configuration](#configuration)
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

## Configuration

While the default options should serve most users well, you may want to change the options
yourself. The options are as follows:

```js
export interface HTMLOptions {
  /** Do not minify DOCTYPEs. Minified DOCTYPEs may not be spec compliant. */
  doNotMinifyDoctype?: boolean; // true
  /** Ensure all unquoted attribute values in the output do not contain any characters prohibited by the WHATWG specification. */
  ensureSpecCompliantUnquotedAttributeValues?: boolean; // true
  /** Do not omit closing tags when possible. */
  keepClosingTags?: boolean; // true
  /** Do not omit `<html>` and `<head>` opening tags when they don't have attributes. */
  keepHtmlAndHeadOpeningTags?: boolean; // true
  /** Keep spaces between attributes when possible to conform to HTML standards. */
  keepSpacesBetweenAttributes?: boolean; // true
  /** Keep all comments. */
  keepComments?: boolean; // false
  /**
   * If enabled, content in `<script>` tags with a JS or no [MIME type](https://mimesniff.spec.whatwg.org/#javascript-mime-type) will be minified using [minify-js](https://github.com/wilsonzlin/minify-js).
   */
  minifyJs?: boolean; // true
  /**
   * If enabled, CSS in `<style>` tags and `style` attributes will be minified.
   */
  minifyCss?: boolean; // true
  /** Remove all bangs. */
  removeBangs?: boolean; // false
  /** Remove all processing_instructions. */
  removeProcessingInstructions?: boolean; // false
}

import { defineConfig } from "astro/config";
import minifyHtml from "astro-html-minifier";

export default defineConfig({
  // ...
  integrations: [minifyHtml({ keepComments: true, minifyJs: false })],
});
```

# License

MIT.
