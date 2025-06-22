import classNames from "classnames";
import buttonStyles from "./Button.module.css";
import type { ButtonGroupProps } from "./Button.types";

export const useButtonGroup = ({ children, description }: ButtonGroupProps) => {
  const buttonGroupClassName = classNames(buttonStyles["button-group"]);
  const buttonsContainerClassName = classNames(
    buttonStyles["buttons-container"]
  );
  const buttonGroupDescriptionClassName = classNames(
    buttonStyles["button-group-description"]
  );

  const buttonGroupProps: React.HTMLAttributes<HTMLDivElement> = {
    className: buttonGroupClassName,
  };

  const buttonsContainerProps: React.HTMLAttributes<HTMLDivElement> = {
    className: buttonsContainerClassName,
  };

  const buttonGroupDescriptionProps: React.HTMLAttributes<HTMLDivElement> = {
    className: buttonGroupDescriptionClassName,
  };

  return {
    children,
    description,

    buttonGroupProps,
    buttonsContainerProps,
    buttonGroupDescriptionProps,
  };
};
