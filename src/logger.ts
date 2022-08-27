const COLORS = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
} as const;

export class Logger {
  private static format(msg: string, prefix = ""): string {
    const start = prefix;
    const end = prefix ? COLORS.reset : "";
    return `${start}@sondr3/astro-minify:${end} ${msg}\n`;
  }

  static info(msg: string) {
    process.stdout.write(this.format(msg));
  }

  static success(msg: string) {
    process.stdout.write(this.format(msg, COLORS.green));
  }

  static warn(msg: string) {
    process.stderr.write(this.format(msg, COLORS.yellow));
  }

  static error(msg: string) {
    process.stderr.write(this.format(msg, COLORS.red));
  }
}
