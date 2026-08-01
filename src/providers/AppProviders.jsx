"use client";

import { ThemeProvider } from "next-themes";

function AppProviders({ children }) {
  return (
    <ThemeProvider
      attribute={"class"}
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}

export default AppProviders;
