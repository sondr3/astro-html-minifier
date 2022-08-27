export const mergeOptions = <T>(opts: boolean | T, defaults: Required<T>): Required<T> => {
  const options = typeof opts === "boolean" ? {} : opts;
  return { ...defaults, ...options };
};
