export interface ConfigItem<T> {
  enabled: boolean;
  config: T;
}

export const mergeOptions = <T, U>(opts: boolean | T, defaults: U): ConfigItem<U> => {
  const enabled = typeof opts === "boolean" ? opts : true;
  const options = typeof opts === "boolean" ? {} : opts;
  return { enabled, config: { ...defaults, ...options } };
};
