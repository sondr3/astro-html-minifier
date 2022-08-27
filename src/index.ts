import minifyHTML from "@minify-html/node";
import type { AstroIntegration } from "astro";
import { globbyStream } from "globby";
import * as fs from "node:fs/promises";
import { hrtime } from "node:process";

import { Logger } from "./logger.js";

const { minify } = minifyHTML;

export const createMinifierPlugin = (): AstroIntegration => {
  return {
    name: "@sondr3/astro-minify",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        try {
          const start = hrtime.bigint();
          let minifiedPages = 0;
          for await (const page of globbyStream(`${dir.pathname}**/*.html`)) {
            const content = await fs.readFile(page);
            const result = minify(content, {});
            await fs.writeFile(page, result);
            minifiedPages += 1;
          }
          const end = hrtime.bigint();

          Logger.success(`minified ${minifiedPages} pages in ${(end - start) / 1000000n}ms`);
        } catch (error) {
          const err = error as Error;
          Logger.error(`Could not write file: ${err.message}`);
        }
      },
    },
  };
};

// eslint-disable-next-line import/no-default-export
export default createMinifierPlugin;
