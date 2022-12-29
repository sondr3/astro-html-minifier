import { readdir } from "node:fs/promises";
import { extname, resolve } from "node:path";

export interface ConfigItem<T> {
  enabled: boolean;
  config: T;
}

export const mergeOptions = <T, U>(opts: boolean | T, defaults: U): ConfigItem<U> => {
  const enabled = typeof opts === "boolean" ? opts : true;
  const options = typeof opts === "boolean" ? {} : opts;
  return { enabled, config: { ...defaults, ...options } };
};

export async function* walkDir(dir: string): AsyncGenerator<string> {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const name = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkDir(name);
    } else if (extname(name) == ".html") {
      yield name;
    }
  }
}
