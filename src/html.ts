import * as fs from "node:fs/promises";
import { hrtime } from "node:process";

import minifier from "@minify-html/node";

import { Logger } from "./logger.js";
import { walkDir } from "./utils.js";
const { minify } = minifier;

export interface HTMLOptions {
  /** Do not minify DOCTYPEs. Minified DOCTYPEs may not be spec compliant. */
  doNotMinifyDoctype?: boolean;
  /** Ensure all unquoted attribute values in the output do not contain any characters prohibited by the WHATWG specification. */
  ensureSpecCompliantUnquotedAttributeValues?: boolean;
  /** Do not omit closing tags when possible. */
  keepClosingTags?: boolean;
  /** Do not omit `<html>` and `<head>` opening tags when they don't have attributes. */
  keepHtmlAndHeadOpeningTags?: boolean;
  /** Keep spaces between attributes when possible to conform to HTML standards. */
  keepSpacesBetweenAttributes?: boolean;
  /** Keep all comments. */
  keepComments?: boolean;
  /**
   * If enabled, content in `<script>` tags with a JS or no [MIME type](https://mimesniff.spec.whatwg.org/#javascript-mime-type) will be minified using [minify-js](https://github.com/wilsonzlin/minify-js).
   */
  minifyJs?: boolean;
  /**
   * If enabled, CSS in `<style>` tags and `style` attributes will be minified.
   */
  minifyCss?: boolean;
  /** Remove all bangs. */
  removeBangs?: boolean;
  /** Remove all processing_instructions. */
  removeProcessingInstructions?: boolean;
}

export type RequiredHTMLOptions = Required<HTMLOptions>;

export const defaultHTMLOptions: RequiredHTMLOptions = {
  doNotMinifyDoctype: true,
  ensureSpecCompliantUnquotedAttributeValues: true,
  keepClosingTags: true,
  keepHtmlAndHeadOpeningTags: true,
  keepSpacesBetweenAttributes: true,
  keepComments: false,
  minifyJs: true,
  minifyCss: true,
  removeBangs: false,
  removeProcessingInstructions: false,
};

export const convertUserOptions = (
  options: RequiredHTMLOptions,
): Record<string, boolean | undefined> => {
  return {
    do_not_minify_doctype: options.doNotMinifyDoctype,
    ensure_spec_compliant_unquoted_attribute_values:
      options.ensureSpecCompliantUnquotedAttributeValues,
    keep_closing_tags: options.keepClosingTags,
    keep_html_and_head_opening_tags: options.keepHtmlAndHeadOpeningTags,
    keep_spaces_between_attributes: options.keepSpacesBetweenAttributes,
    keep_comments: options.keepComments,
    minify_js: options.minifyJs,
    minify_css: options.minifyCss,
    remove_bangs: options.removeBangs,
    remove_processing_instructions: options.removeProcessingInstructions,
  };
};

export const minifyHTML = async (dir: string, options: RequiredHTMLOptions): Promise<void> => {
  const cfg = convertUserOptions(options);
  try {
    const start = hrtime.bigint();
    let minifiedPages = 0;

    for await (const page of walkDir(dir)) {
      const content = await fs.readFile(page);
      const result = minify(content, cfg);
      await fs.writeFile(page, result);
      minifiedPages += 1;
    }
    const end = hrtime.bigint();

    Logger.success(`minified ${minifiedPages} HTML files in ${(end - start) / 1000000n}ms`);
  } catch (error) {
    const err = error as Error;
    Logger.error(`Could not write HTML file: ${err.message}`);
  }
};
