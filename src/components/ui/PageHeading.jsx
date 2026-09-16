"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

function PageHeading({ className, children }) {
  const pageHeading = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const isHomePageRoute = pathname === "/" || pathname === "/invoices";

    const focusedInvoiceId = sessionStorage.getItem("focusedInvoiceId");

    const hasModalTrigger = Boolean(window.__lastModalTriggerElement);
    const hasFocusedInvoiceIem = isHomePageRoute && Boolean(focusedInvoiceId);

    if (!hasModalTrigger && !hasFocusedInvoiceIem && pageHeading.current) {
      pageHeading.current.focus();
    }
  }, [pathname]);

  return (
    <h1
      ref={pageHeading}
      tabIndex={"-1"}
      className={`outline-none ${className}`}
    >
      {children}
    </h1>
  );
}

export default PageHeading;
