import type { NoticeTone } from "./types";

export const toneClasses: Record<NoticeTone, string> = {
  neutral: "border-border bg-base-light text-text",
  info: "border-bg-info bg-bg-info text-info",
  success: "border-bg-success bg-bg-success text-success",
  warning: "border-bg-warning bg-bg-warning text-warning",
  error: "border-error bg-bg-error text-error",
};
