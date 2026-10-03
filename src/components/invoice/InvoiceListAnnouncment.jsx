"use client";

import { useEffect, useState } from "react";
import { ACCESSIBILITY_ANNOUNCEMENT_DELAY_MS } from "../../lib/constants/durations";

function InvoiceListAnnouncment({ count, activeFilters }) {
  const [annoucment, setAnnoucment] = useState("");

  useEffect(() => {
    const filterText = activeFilters ? `${activeFilters} ` : "";

    const message =
      count === 0
        ? `No ${filterText}invoice found`
        : `Showing ${count} ${filterText}invoice${count > 1 ? "s" : ""}`;

    setTimeout(() => {
      setAnnoucment(message);
    }, ACCESSIBILITY_ANNOUNCEMENT_DELAY_MS);
  }, [count, activeFilters]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {annoucment}
    </div>
  );
}

export default InvoiceListAnnouncment;
