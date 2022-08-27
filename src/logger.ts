const COLORS = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
} as const;

export class Logger {
  private static log(msg: string, prefix = "") {
    // eslint-disable-next-line no-console
    console.log(`%s@sondr3/sastro-minify:%s ${msg}\n`, prefix, prefix ? COLORS.reset : "");
  }

  static info(msg: string) {
    this.log(msg);
  }

  static success(msg: string) {
    this.log(msg, COLORS.green);
  }

  static warn(msg: string) {
    this.log(msg, COLORS.yellow);
  }

  static error(msg: string) {
    this.log(msg, COLORS.red);
  }
}
