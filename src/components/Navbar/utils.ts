import type { NavLinkClassNameProps } from "./types";

export const getTextLinkClass = ({ isActive }: NavLinkClassNameProps): string => {
  return [
    "rounded px-2 py-1 text-sm font-medium transition-colors flex items-center",
    isActive ? "text-primary" : "text-text hover:text-primary",
  ].join(" ");
};
