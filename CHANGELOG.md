## v0.5.1

> 2023-09-06

## Summary

Mark package as deprecated.

### Commits

- [[`d7dbd16`](https://github.com/sondr3/astro-html-minifier)] Mark package as deprecated
- [[`049b3ad`](https://github.com/sondr3/astro-html-minifier)] Bump actions/checkout from 3 to 4
- [[`c1b0f15`](https://github.com/sondr3/astro-html-minifier)] Bump pnpm/action-setup from 2.3.0 to 2.4.0
- [[`270973e`](https://github.com/sondr3/astro-html-minifier)] Bump pnpm/action-setup from 2.2.4 to 2.3.0

## 0.5.0

> 2023-06-19

## Summary

No new functional changes, only dependency bumps.

### Commits

- [[`1719d23`](https://github.com/sondr3/astro-html-minifier)] 0.5.0
- [[`b9f33f1`](https://github.com/sondr3/astro-html-minifier)] Bump dependencies

## v0.4.1

> 2023-01-31

## Summary

Bump Astro dependency to 2.0, update README.

### Commits

- [[`aaf22aa`](https://github.com/sondr3/astro-html-minifier)] Add configuration to README
- [[`ee086d0`](https://github.com/sondr3/astro-html-minifier)] Bump dependencies, minor refactor of default export

## v0.4.0

> 2022-12-29

## Summary

Remove `globby` dependency and use standard library functionality. Fix paths on Windows.

### Commits

- [[`55f723e`](https://github.com/sondr3/astro-html-minifier)] Use fileUrlToPath to fix path on Windows
- [[`3eab843`](https://github.com/sondr3/astro-html-minifier)] Remove globby dependency, use stdlib
- [[`ea9c2c5`](https://github.com/sondr3/astro-html-minifier)] Use shields.io over badge.fury.io

## v0.3.0

> 2022-12-27

## Summary

Bump HTML minifier and other dependencies.

### Commits

- [[`e548841`](https://github.com/sondr3/astro-html-minifier)] Fix release CI step
- [[`fa91401`](https://github.com/sondr3/astro-html-minifier)] Bump dependencies, fix formatting
- [[`3b04925`](https://github.com/sondr3/astro-html-minifier)] Release v0.3.0
- [[`a147ed3`](https://github.com/sondr3/astro-html-minifier)] Bump pnpm/action-setup from 2.2.3 to 2.2.4
- [[`7abb719`](https://github.com/sondr3/astro-html-minifier)] Bump pnpm/action-setup from 2.2.2 to 2.2.3
- [[`7487f66`](https://github.com/sondr3/astro-html-minifier)] Add publish step to build pipeline

## v0.2.0

> 2022-08-27

## Summary

Initial release of a HTML minifier for Astro.

### Commits

- [[`7003730`](https://github.com/sondr3/astro-html-minifier)] Bump version to 0.2.0, fix dist/ not being clean
- [[`a3016b5`](https://github.com/sondr3/astro-html-minifier)] Set version to 0.1.0
- [[`d54c019`](https://github.com/sondr3/astro-html-minifier)] Rename package again
- [[`93809bd`](https://github.com/sondr3/astro-html-minifier)] Set version number to 0.0.1
- [[`ad80149`](https://github.com/sondr3/astro-html-minifier)] Add 'files' property to package.json
- [[`40580f2`](https://github.com/sondr3/astro-html-minifier)] Update README, name
- [[`43a85a2`](https://github.com/sondr3/astro-html-minifier)] Rename library as Astro does CSS/JS minification
- [[`f394beb`](https://github.com/sondr3/astro-html-minifier)] Actually, use console.{log,info,..}
- [[`11d9d40`](https://github.com/sondr3/astro-html-minifier)] Newline added to logger
- [[`7ddc64f`](https://github.com/sondr3/astro-html-minifier)] Add JS configuration using esbuild
- [[`0ea7d17`](https://github.com/sondr3/astro-html-minifier)] Update logger to use process.stdout/process.stderr
- [[`38f26b0`](https://github.com/sondr3/astro-html-minifier)] Disable CSS minifier if using Tailwind
- [[`71b8ee7`](https://github.com/sondr3/astro-html-minifier)] Update built HTML log message
- [[`78e10f2`](https://github.com/sondr3/astro-html-minifier)] Minify CSS with Parcel CSS
- [[`27e4b11`](https://github.com/sondr3/astro-html-minifier)] Extract mergeOptions to utils, make it generic
- [[`1f1b193`](https://github.com/sondr3/astro-html-minifier)] Add configuration for HTML minifier, extract to own file
- [[`0e2fb7c`](https://github.com/sondr3/astro-html-minifier)] Add a simple logger, try/catch for HTML minification
- [[`416cd8e`](https://github.com/sondr3/astro-html-minifier)] Minify HTML files
- [[`8907411`](https://github.com/sondr3/astro-html-minifier)] Add lint scripts
- [[`4c31cac`](https://github.com/sondr3/astro-html-minifier)] First pass at minifying HTML pages
- [[`111c5fe`](https://github.com/sondr3/astro-html-minifier)] In the beginning there was darkness
