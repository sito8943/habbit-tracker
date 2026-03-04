import { buttonBaseClass, buttonColorClasses, buttonVariantClasses, cn } from "./styles";
import type { BaseButtonPropsType } from "./types";

const Button = ({
  children,
  className,
  color = "primary",
  style,
  type = "button",
  variant = "text",
  ...props
}: BaseButtonPropsType) => {
  return (
    <button
      {...props}
      type={type}
      className={cn(
        buttonBaseClass,
        buttonColorClasses[color],
        buttonVariantClasses[variant],
        className
      )}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
