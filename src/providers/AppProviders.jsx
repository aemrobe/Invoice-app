"use client";

import { ThemeProvider } from "next-themes";
import Modal from "@/components/ui/Modal";

function AppProviders({ children }) {
  return (
    <ThemeProvider
      attribute={"class"}
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Modal>{children}</Modal>
    </ThemeProvider>
  );
}

export default AppProviders;
