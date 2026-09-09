"use client";

import { useEffect, useRef } from "react";

function PageHeading({ className, children }) {
  const pageHeading = useRef(null);

  useEffect(() => {
    const hasModalTrigger = Boolean(window.__lastModalTriggerElement);
    const hasUrlHash = Boolean(window.location.hash);

    if (!hasModalTrigger && !hasUrlHash && pageHeading.current) {
      pageHeading.current.focus();
    }
  }, []);

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
