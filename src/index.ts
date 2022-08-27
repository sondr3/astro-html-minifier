import type { AstroIntegration } from "astro";

import { CSSOptions, defaultCSSOptions, minifyCSS } from "./css.js";
import { defaultHTMLOptions, HTMLOptions, minifyHTML, RequiredHTMLOptions } from "./html.js";
import { ConfigItem, mergeOptions } from "./utils.js";

export interface Options {
  html: boolean | HTMLOptions;
  css: boolean | CSSOptions;
}

const defaultOptions: Options = {
  html: true,
  css: true,
};

interface ConvertedOptions {
  html: ConfigItem<RequiredHTMLOptions>;
  css: ConfigItem<CSSOptions>;
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
          css: mergeOptions(options.css, defaultCSSOptions),
        };
      },
      "astro:build:done": async ({ dir }) => {
        if (config.html.enabled) await minifyHTML(dir, config.html.config);
        if (config.css.enabled) await minifyCSS(dir, config.css.config);
      },
    },
  };
};

// eslint-disable-next-line import/no-default-export
export default createMinifierPlugin;
