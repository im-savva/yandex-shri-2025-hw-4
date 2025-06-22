import emptyBannerStyles from "./EmptyBanner.module.css";

export const useEmptyBanner = () => {
  const emptyBannerProps: React.HTMLAttributes<HTMLDivElement> = {
    className: emptyBannerStyles["empty-banner"],
  };

  return {
    emptyBannerProps,
  };
};
