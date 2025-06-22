import menuStyles from "./Menu.module.css";
import type { MenuProps } from "./Menu.types";

export const useMenu = ({ children }: MenuProps) => {
  const menuProps: React.HTMLAttributes<HTMLDivElement> = {
    className: menuStyles["menu"],
  };

  return { children, menuProps };
};
