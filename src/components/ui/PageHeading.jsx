"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

function PageHeading({ className, children, isError = false }) {
  const pageHeading = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const isHomePageRoute = pathname === "/" || pathname === "/invoices";

    const focusedInvoiceId = sessionStorage.getItem("focusedInvoiceId");

    const hasModalTrigger = Boolean(window.__lastModalTriggerElement);
    const hasFocusedInvoiceIem = isHomePageRoute && Boolean(focusedInvoiceId);

    const shouldSkipFocus =
      !isError && (hasModalTrigger || hasFocusedInvoiceIem);

    if (!shouldSkipFocus && pageHeading.current) {
      pageHeading.current.focus({ preventScroll: true });

      requestAnimationFrame(() => {
        pageHeading.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  }, [pathname, isError]);

  return (
    <h1
      ref={pageHeading}
      tabIndex={"-1"}
      className={`outline-none scroll-mt-27 ${className}`}
    >
      {children}
    </h1>
  );
}

export default PageHeading;
