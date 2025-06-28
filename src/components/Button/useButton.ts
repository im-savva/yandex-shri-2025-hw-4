import classNames from "classnames";
import buttonStyles from "./Button.module.css";
import type { ButtonProps } from "./Button.types";

export const useButton = ({
  color = "white",
  theme = "tinted",

  isDisabled,
  isLoading,

  onClick,

  icon,
  text,

  style = {},

  title = "",
}: ButtonProps) => {
  const className = classNames(
    buttonStyles["button"],
    buttonStyles[`color-${color}`],
    buttonStyles[`theme-${theme}`],
    icon ? buttonStyles["icon-only"] : "",
    isLoading ? buttonStyles["loading"] : ""
  );

  const buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    "data-testid": string;
  } = {
    onClick: (event) => {
      if (isDisabled || isLoading) return;
      event.stopPropagation();
      onClick?.();
    },
    className,
    disabled: isDisabled,
    style,
    "data-testid": "button",
    title,
  };

  const animatedLoaderContainerProps: React.HTMLAttributes<HTMLDivElement> = {
    className: buttonStyles["animated-loader"],
  };

  return {
    children: icon || text,
    buttonProps,
    animatedLoaderContainerProps,

    isLoading,
  };
};
