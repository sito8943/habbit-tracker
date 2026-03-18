import { NavLink } from "react-router";
import { baseClasses, buttonVariantClasses, cn } from "./styles";
import type { LinkButtonPropsType } from "./types";

const LinkButton = (props: LinkButtonPropsType) => {
  const { to, children } = props;

  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        cn(baseClasses, isActive ? buttonVariantClasses.filled : buttonVariantClasses.outlined)
      }
    >
      {children}
    </NavLink>
  );
};

export default LinkButton;
