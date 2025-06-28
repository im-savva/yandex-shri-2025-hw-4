import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

describe("Button Component", () => {
  describe("isLoading", () => {
    it("should render loader when is true", () => {
      const { getByTestId } = render(<Button isLoading />);

      expect(getByTestId("animated-loader")).toBeInTheDocument();
    });

    it("should not render loader when is false", () => {
      const { queryByTestId } = render(<Button isLoading={false} />);

      expect(queryByTestId("animated-loader")).toBeNull();
    });
  });

  describe("isDisabled", () => {
    it("should render button as disabled when isDisabled is true", () => {
      const { getByTestId } = render(<Button isDisabled />);

      expect(getByTestId("button")).toBeDisabled();
    });

    it("should render button as enabled when isDisabled is false", () => {
      const { getByTestId } = render(<Button isDisabled={false} />);

      expect(getByTestId("button")).toBeEnabled();
    });
  });

  it('should render button with text "Click Me"', () => {
    const { getByText } = render(<Button text="Click Me" />);

    expect(getByText("Click Me")).toBeDefined();
  });

  describe("onClick", () => {
    it("should process onClick event when is enabled and is not loading", () => {
      const onClick = vi.fn();
      const { getByTestId } = render(<Button onClick={onClick} />);

      getByTestId("button").click();
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("should not process onClick event when is disabled", () => {
      const onClick = vi.fn();
      const { getByTestId } = render(<Button isDisabled onClick={onClick} />);

      getByTestId("button").click();
      expect(onClick).toHaveBeenCalledTimes(0);
    });

    it("should not process onClick event when is loading", () => {
      const onClick = vi.fn();
      const { getByTestId } = render(<Button isLoading onClick={onClick} />);

      getByTestId("button").click();
      expect(onClick).toHaveBeenCalledTimes(0);
    });
  });
});
