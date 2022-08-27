import type { AstroIntegration } from "astro";

import { CSSOptions, defaultCSSOptions, minifyCSS } from "./css.js";
import { defaultHTMLOptions, HTMLOptions, minifyHTML, RequiredHTMLOptions } from "./html.js";
import { defaultJSOptions, JSOptions, minifyJS } from "./js.js";
import { Logger } from "./logger.js";
import { ConfigItem, mergeOptions } from "./utils.js";

export interface Options {
  html: boolean | HTMLOptions;
  css: boolean | CSSOptions;
  js: boolean | JSOptions;
}

const defaultOptions: Options = {
  html: true,
  css: true,
  js: true,
};

interface ConvertedOptions {
  html: ConfigItem<RequiredHTMLOptions>;
  css: ConfigItem<CSSOptions>;
  js: ConfigItem<JSOptions>;
}

export const createMinifierPlugin = (opts: Options = defaultOptions): AstroIntegration => {
  let config: ConvertedOptions;

  return {
    name: "@sondr3/astro-minify",
    hooks: {
      "astro:config:done": ({ config: cfg }) => {
        const options = { ...defaultOptions, ...opts };

        config = {
          html: mergeOptions(options.html, defaultHTMLOptions),
          css: mergeOptions(options.css, defaultCSSOptions),
          js: mergeOptions(options.js, defaultJSOptions),
        };

        // Disable CSS minification if using Tailwind
        const hasTailwind = cfg.integrations.some((i) => i.name === "@astrojs/tailwind");
        if (hasTailwind) {
          Logger.warn(
            "Disabled CSS minification because '@astrojs/tailwind' integration is active",
          );
          config.css.enabled = false;
        }
      },
      "astro:build:done": async ({ dir }) => {
        if (config.html.enabled) await minifyHTML(dir, config.html.config);
        if (config.css.enabled) await minifyCSS(dir, config.css.config);
        if (config.js.enabled) await minifyJS(dir, config.js.config);

        process.stdout.write("\n\n");
      },
    },
  };
};

// eslint-disable-next-line import/no-default-export
export default createMinifierPlugin;
