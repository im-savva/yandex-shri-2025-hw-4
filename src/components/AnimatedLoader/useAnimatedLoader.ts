"use client";

import React from "react";
import animatedLoaderStyles from "./AnimatedLoader.module.css";

export function useAnimatedLoader() {
  const animatedLoaderProps: React.HTMLAttributes<HTMLDivElement> = {
    className: animatedLoaderStyles["animated-loader"],
  };

  return {
    animatedLoaderProps,
  };
}
