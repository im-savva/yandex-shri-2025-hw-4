import classNames from "classnames";
import menuStyles from "./Menu.module.css";
import type { MenuItemProps } from "./Menu.types";

export const useMenuItem = ({ text, icon, isActive, href }: MenuItemProps) => {
  const menuItemClassName = classNames(
    menuStyles["menu-item"],
    isActive && menuStyles["active"]
  );

  const menuItemProps = {
    className: menuItemClassName,
    to: href,
  } satisfies React.HTMLAttributes<HTMLDivElement> & { to: string };

  const menuItemContentProps: React.HTMLAttributes<HTMLDivElement> = {
    className: menuStyles["menu-item-content"],
  };

  const menuItemIconProps: React.HTMLAttributes<HTMLDivElement> = {
    className: menuStyles["menu-item-icon"],
  };

  return {
    text,
    icon,

    menuItemProps,
    menuItemContentProps,
    menuItemIconProps,
  };
};
