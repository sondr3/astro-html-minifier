import type { AstroIntegration } from "astro";

import { defaultHTMLOptions, HTMLOptions, minifyHTML, RequiredHTMLOptions } from "./html.js";
import { mergeOptions } from "./utils.js";

export interface Options {
  html: boolean | HTMLOptions;
}

const defaultOptions: Options = {
  html: true,
};

interface ConvertedOptions {
  html: RequiredHTMLOptions;
}

export const createMinifierPlugin = (opts: Options = defaultOptions): AstroIntegration => {
  let config: ConvertedOptions;

  return {
    name: "@sondr3/astro-minify",
    hooks: {
      "astro:config:done": () => {
        const options = { ...defaultOptions, ...opts };
        config = {
          html: mergeOptions(options.html, defaultHTMLOptions),
        };
      },
      "astro:build:done": async ({ dir }) => {
        await minifyHTML(dir, config.html);
      },
    },
  };
};

// eslint-disable-next-line import/no-default-export
export default createMinifierPlugin;
