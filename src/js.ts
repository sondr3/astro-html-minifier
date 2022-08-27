import { transform, TransformOptions } from "esbuild";
import { globbyStream } from "globby";
import * as fs from "node:fs/promises";
import { hrtime } from "node:process";

import { Logger } from "./logger.js";

export type JSOptions = Omit<TransformOptions, "sourcefile">;

export const defaultJSOptions: JSOptions = {
  minify: true,
  sourcemap: true,
};

export const minifyJS = async (dir: URL, options: JSOptions): Promise<void> => {
  try {
    const start = hrtime.bigint();
    let minifiedFiles = 0;
    for await (let file of globbyStream(`${dir.pathname}**/*.{js,cjs}`)) {
      file = file as string;
      const content = await fs.readFile(file);
      const result = await transform(content, {
        sourcefile: file,
        ...options,
      });

      await fs.writeFile(file, result.code);
      if (options.sourcemap && result.map) await fs.writeFile(`${file}.map`, result.map);
      minifiedFiles += 1;
    }
    const end = hrtime.bigint();

    Logger.success(`minified ${minifiedFiles} JS files in ${(end - start) / 1000000n}ms`);
  } catch (error) {
    const err = error as Error;
    Logger.error(`Could not write JS file: ${err.message}`);
  }
};
