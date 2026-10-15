"use client";

import { ThemeProvider } from "next-themes";
import Modal from "@/components/ui/Modal";
import { ToastProvider } from "@/context/ToastContext";

function AppProviders({ children }) {
  return (
    <ThemeProvider
      attribute={"class"}
      defaultTheme="system"
      enableSystem
      enableColorScheme={false}
      disableTransitionOnChange
    >
      <ToastProvider>
        <Modal>{children}</Modal>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default AppProviders;
