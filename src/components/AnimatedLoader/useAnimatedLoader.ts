"use client";

import React from "react";
import animatedLoaderStyles from "./AnimatedLoader.module.css";

export function useAnimatedLoader() {
  const animatedLoaderProps: React.HTMLAttributes<HTMLDivElement> & {
    "data-testid": string;
  } = {
    className: animatedLoaderStyles["animated-loader"],
    "data-testid": "animated-loader",
  };

  return {
    animatedLoaderProps,
  };
}
