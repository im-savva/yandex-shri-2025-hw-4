import topBarStyles from "./TopBar.module.css";

export const useTopBar = () => {
  const topBarProps: React.HTMLAttributes<HTMLDivElement> = {
    className: topBarStyles["top-bar"],
  };

  const topBarGroupProps: React.HTMLAttributes<HTMLDivElement> = {
    className: topBarStyles["group"],
  };

  const logoProps = {
    className: topBarStyles["logo"],
  } satisfies React.HTMLAttributes<HTMLDivElement>;

  return { topBarProps, topBarGroupProps, logoProps };
};
