"use client";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";

import EmotionCache from "./emotion-cache";

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({
  children,
}: ThemeProviderProps): React.JSX.Element {
  return (
    <EmotionCache options={{ key: "mui" }}>
      <CssVarsProvider>
        <CssBaseline />
        {children}
      </CssVarsProvider>
    </EmotionCache>
  );
}
