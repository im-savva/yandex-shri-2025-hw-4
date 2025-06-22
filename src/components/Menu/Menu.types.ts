export interface MenuProps {
  children: React.ReactNode;
}

export interface MenuItemProps {
  text: string;
  icon?: React.ReactNode;

  isActive?: boolean;

  href: string;
}
