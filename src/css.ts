import { transform, TransformOptions } from "@parcel/css";
import { globbyStream } from "globby";
import * as fs from "node:fs/promises";
import { hrtime } from "node:process";

import { Logger } from "./logger.js";

export type CSSOptions = Omit<TransformOptions, "filename" | "code">;

export const defaultCSSOptions: CSSOptions = {
  minify: true,
  sourceMap: true,
};

export const minifyCSS = async (dir: URL, options: CSSOptions): Promise<void> => {
  try {
    const start = hrtime.bigint();
    let minifiedFiles = 0;
    for await (let file of globbyStream(`${dir.pathname}**/*.css`)) {
      file = file as string;
      const content = await fs.readFile(file);
      const result = transform({
        filename: file,
        code: content,
        ...options,
      });

      await fs.writeFile(file, result.code);
      if (options.sourceMap && result.map) await fs.writeFile(`${file}.map`, result.map);
      minifiedFiles += 1;
    }
    const end = hrtime.bigint();

    Logger.success(`minified ${minifiedFiles} CSS files in ${(end - start) / 1000000n}ms`);
  } catch (error) {
    const err = error as Error;
    Logger.error(`Could not write CSS file: ${err.message}`);
  }
};
