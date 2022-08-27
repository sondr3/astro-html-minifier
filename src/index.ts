import * as minifyHtml from "@minify-html/node";
import type { AstroConfig, AstroIntegration } from "astro";
import { globby } from "globby";
import fs from "node:fs/promises";

export const createMinifierPlugin = (): AstroIntegration => {
  // @ts-ignore
  let config: AstroConfig;

  return {
    name: "@sondr3/astro-minify",
    hooks: {
      "astro:config:done": ({ config: cfg }) => {
        config = cfg;
      },
      "astro:build:done": async ({ dir }) => {
        console.log(dir);
        const pages = globby([dir.pathname, "**/*.html"]);

        for (const page of await pages) {
          console.log(page);
          const content = await fs.readFile(page);
          const result = minifyHtml.minify(content, {});
          await fs.writeFile(page, result);
        }
      },
    },
  };
};

// eslint-disable-next-line import/no-default-export
export default createMinifierPlugin;
