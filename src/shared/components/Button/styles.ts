import type { ButtonColor, ButtonVariant } from "./types";

export const buttonColorClasses: Record<ButtonColor, string> = {
  primary: "btn--primary",
  secondary: "btn--secondary",
  info: "btn--info",
  success: "btn--success",
  warning: "btn--warning",
  error: "btn--error",
};

export const buttonBaseClass = "btn";
export const iconButtonBaseClass = "btn btn--icon";

export const buttonVariantClasses: Record<ButtonVariant, string> = {
  text: "btn--text",
  filled: "btn--filled",
  outlined: "btn--outlined",
};

export const iconButtonVariantClasses: Record<ButtonVariant, string> = {
  text: "icon-btn--text",
  filled: "btn--filled",
  outlined: "btn--outlined",
};

export const cn = (...classes: Array<string | undefined>) => classes.filter(Boolean).join(" ");

export const baseClasses = cn(buttonBaseClass, buttonColorClasses.primary);
