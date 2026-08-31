"use client";

import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import { useEffect, useRef } from "react";

function InertWrappers({ children }) {
  const modalSegment = useSelectedLayoutSegment("modal");

  // On soft navigation to edit modal, modalSegment will equal "(.)edit" (or "edit")
  // On hard reload or base detail page, modalSegment will equal null
  const isInterceptedModalOpen = modalSegment !== null;
  const wasModalOpenRef = useRef(false);

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
    <div
      className="border-4 border-lime-500"
      inert={isInterceptedModalOpen ? true : undefined}
    >
      {children}
    </div>
  );
}

export default InertWrappers;
