import type { ButtonHTMLAttributes } from "react"

export type ButtonVariant = "text" | "filled" | "outlined"
export type ButtonColor = "primary" | "secondary" | "info" | "success" | "warning" | "error"

export type BaseButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: ButtonColor
  variant?: ButtonVariant
}
