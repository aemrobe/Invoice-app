"use client";

import { useState } from "react";

function ToolTip({ children, content, show }) {
  const [isVisible, setIsVisible] = useState(false);

  if (!show) return children;

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}

      {isVisible && (
        <div
          role="tooltip"
          className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-content-primary px-3 py-1.5 text-surface-secondary shadow-lg transition-slow z-10 pointer-events-none"
        >
          {content}

          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-content-primary" />
        </div>
      )}
    </div>
  );
}

export default ToolTip;
