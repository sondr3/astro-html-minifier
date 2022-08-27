import type { AstroIntegration } from "astro";

import { defaultHTMLOptions, HTMLOptions, minifyHTML, RequiredHTMLOptions } from "./html.js";
import { Logger } from "./logger.js";
import { ConfigItem, mergeOptions } from "./utils.js";

export interface Options {
  html: boolean | HTMLOptions;
}

const defaultOptions: Options = {
  html: true,
};

interface ConvertedOptions {
  html: ConfigItem<RequiredHTMLOptions>;
}

export const createMinifierPlugin = (opts: Options = defaultOptions): AstroIntegration => {
  const options = { ...defaultOptions, ...opts };
  const config: ConvertedOptions = {
    html: mergeOptions(options.html, defaultHTMLOptions),
  };

  return {
    name: "@sondr3/astro-html-minifier",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        if (config.html.enabled) await minifyHTML(dir, config.html.config);

        Logger.success("Minification finished\n");
      },
    },
  };
};

// eslint-disable-next-line import/no-default-export
export default createMinifierPlugin;
