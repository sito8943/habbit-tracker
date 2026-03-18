export const cx = (...classes: Array<string | undefined>): string =>
  classes.filter(Boolean).join(" ");
