import { useEmptyBanner } from "./useEmptyBanner";

export const EmptyBanner = () => {
  const { emptyBannerProps } = useEmptyBanner();

  return (
    <div {...emptyBannerProps}>
      Здесь
      <br />
      появятся хайлайты
    </div>
  );
};
