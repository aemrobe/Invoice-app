"use client";

import { useEffect } from "react";

function FocusManager() {
  useEffect(() => {
    const focusedInvoiceId = sessionStorage.getItem("focusedInvoiceId");

    if (focusedInvoiceId) {
      const element = document.getElementById(focusedInvoiceId);

      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.focus();
      }
    }

    requestAnimationFrame(() => {
      sessionStorage.removeItem("focusedInvoiceId");
    });
  }, []);
  return null;
}

export default FocusManager;
