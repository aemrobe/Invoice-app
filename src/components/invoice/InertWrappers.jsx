"use client";

import { usePathname, useSelectedLayoutSegment } from "next/navigation";

function InertWrappers({ children }) {
  const modalSegment = useSelectedLayoutSegment("modal");

  // On soft navigation to edit modal, modalSegment will equal "(.)edit" (or "edit")
  // On hard reload or base detail page, modalSegment will equal null
  const isInterceptedModalOpen = modalSegment !== null;

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
