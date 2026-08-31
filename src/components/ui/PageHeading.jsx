"use client";

import { useEffect, useRef } from "react";

function PageHeading({ className, children }) {
  const pageHeading = useRef(null);

  useEffect(() => {
    pageHeading.current.focus();
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
