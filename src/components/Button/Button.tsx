import { AnimatedLoader } from "../AnimatedLoader/AnimatedLoader";
import type { ButtonProps } from "./Button.types";
import { useButton } from "./useButton";

export const Button = (props: ButtonProps) => {
  const { children, buttonProps, animatedLoaderContainerProps } =
    useButton(props);

  return (
    <button {...buttonProps}>
      <div>{children}</div>
      <div {...animatedLoaderContainerProps}>
        <AnimatedLoader />
      </div>
    </button>
  );
};
