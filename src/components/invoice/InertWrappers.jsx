"use client";

import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import { useEffect, useRef } from "react";

function InertWrappers({ children }) {
  const modalSegment = useSelectedLayoutSegment("modal");

  // On soft navigation to edit modal, modalSegment will equal "(.)edit" (or "edit")
  // On hard reload or base detail page, modalSegment will equal null
  const isInterceptedModalOpen = modalSegment !== null;
  const wasModalOpenRef = useRef(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      if (isInterceptedModalOpen) {
        containerRef.current.setAttribute("inert", "");
      } else {
        containerRef.current.removeAttribute("inert");
      }
    }
  }, [isInterceptedModalOpen]);

  useEffect(() => {
    if (isInterceptedModalOpen) {
      wasModalOpenRef.current = true;
    } else {
      if (wasModalOpenRef.current) {
        wasModalOpenRef.current = false;

        requestAnimationFrame(() => {
          if (window.__lastModalTriggerElement) {
            window.__lastModalTriggerElement.focus();
            window.__lastModalTriggerElement = null;
          }
        });
      }
    }
  }, [isInterceptedModalOpen]);

  return (
    <div ref={containerRef} className="contents">
      {children}
    </div>
  );
}

export default InertWrappers;
