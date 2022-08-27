import minifyHTML from "@minify-html/node";
import type { AstroIntegration } from "astro";
import { globbyStream } from "globby";
import * as fs from "node:fs/promises";

const { minify } = minifyHTML;

export const createMinifierPlugin = (): AstroIntegration => {
  return {
    name: "@sondr3/astro-minify",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        for await (const page of globbyStream(`${dir.pathname}**/*.html`)) {
          const content = await fs.readFile(page);
          const result = minify(content, {});
          await fs.writeFile(page, result);
        }
      },
    },
  };
};

// eslint-disable-next-line import/no-default-export
export default createMinifierPlugin;
