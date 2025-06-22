import type { MenuProps } from "./Menu.types";
import { useMenu } from "./useMenu";

export const Menu = (props: MenuProps) => {
  const { children, menuProps } = useMenu(props);

  return <div {...menuProps}>{children}</div>;
};
