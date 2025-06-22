import { Link } from "react-router-dom";
import type { MenuItemProps } from "./Menu.types";
import { useMenuItem } from "./useMenuItem";

export const MenuItem = (props: MenuItemProps) => {
  const {
    text,
    icon,

    menuItemProps,
    menuItemContentProps,
    menuItemIconProps,
  } = useMenuItem(props);

  return (
    <Link {...menuItemProps}>
      {icon && <div {...menuItemIconProps}>{icon}</div>}
      <div {...menuItemContentProps}>{text}</div>
    </Link>
  );
};
