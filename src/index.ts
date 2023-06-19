import { fileURLToPath } from "node:url";

import type { AstroIntegration } from "astro";

import {
  defaultHTMLOptions,
  type HTMLOptions,
  minifyHTML,
  type RequiredHTMLOptions,
} from "./html.js";
import { Logger } from "./logger.js";
import { type ConfigItem, mergeOptions } from "./utils.js";

export interface Options {
  html: boolean | HTMLOptions;
}

const defaultOptions: Options = {
  html: true,
};

interface ConvertedOptions {
  html: ConfigItem<RequiredHTMLOptions>;
}

// eslint-disable-next-line import/no-default-export
export default (opts: Options = defaultOptions): AstroIntegration => {
  const options = { ...defaultOptions, ...opts };
  const config: ConvertedOptions = {
    html: mergeOptions(options.html, defaultHTMLOptions),
  };

  return {
    name: "astro-html-minifier",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        const path = fileURLToPath(dir);
        if (config.html.enabled) await minifyHTML(path, config.html.config);

        Logger.success("Minification finished\n");
      },
    },
  };
};
