import { buttonColorClasses, cn, iconButtonBaseClass, iconButtonVariantClasses } from "./styles";
import type { BaseButtonProps } from "./types";

const IconButton = ({
  children,
  className,
  color = "primary",
  style,
  type = "button",
  variant = "text",
  ...props
}: BaseButtonProps) => {
  return (
    <button
      {...props}
      type={type}
      className={cn(
        iconButtonBaseClass,
        buttonColorClasses[color],
        iconButtonVariantClasses[variant],
        className
      )}
      style={style}
    >
      {children}
    </button>
  );
};

export default IconButton;
