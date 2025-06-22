import type { ButtonGroupProps } from "./Button.types";
import { useButtonGroup } from "./useButtonGroup";

export const ButtonGroup = (props: ButtonGroupProps) => {
  const {
    children,
    description,
    buttonGroupProps,
    buttonGroupDescriptionProps,
    buttonsContainerProps,
  } = useButtonGroup(props);

  return (
    <div {...buttonGroupProps}>
      <div {...buttonsContainerProps}> {children}</div>
      {description && <div {...buttonGroupDescriptionProps}>{description}</div>}
    </div>
  );
};
