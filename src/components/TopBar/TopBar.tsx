import { Link, useLocation } from "react-router-dom";
import schoolsLogoUrl from "../../assets/logos/schools.svg";
import serviceLogoUrl from "../../assets/logos/service.svg";
import GenerateIcon from "../icons/GenerateIcon";
import HistoryIcon from "../icons/HistoryIcon";
import UploadIcon from "../icons/UploadIcon";
import { Menu } from "../Menu/Menu";
import { MenuItem } from "../Menu/MenuItem";
import { useTopBar } from "./useTopBar";

const menuItems: {
  text: string;
  icon: React.ReactNode;
  href: string;
}[] = [
  {
    text: "CSV Аналитик",
    icon: <UploadIcon />,
    href: "/",
  },
  {
    text: "CSV Генератор",
    icon: <GenerateIcon />,
    href: "generate",
  },
  {
    text: "История",
    icon: <HistoryIcon />,
    href: "history",
  },
];

export const TopBar = () => {
  const { topBarProps, topBarGroupProps, logoProps } = useTopBar();

  const location = useLocation();
  const activeHref =
    location.pathname === "/" ? "/" : location.pathname.split("/")[1];

  return (
    <div {...topBarProps}>
      <div {...topBarGroupProps}>
        <Link to={"/"} {...logoProps}>
          <img src={schoolsLogoUrl} />
        </Link>
        <Link to={"/"} {...logoProps}>
          <img src={serviceLogoUrl} />
        </Link>
      </div>
      <div {...topBarGroupProps}>
        <Menu>
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              {...item}
              isActive={item.href === activeHref}
            />
          ))}
        </Menu>
      </div>
    </div>
  );
};
