"use client";

import { exportInvoicesToCSV } from "@/lib/utils/exportInvoicesToCSV";

function InvoiceCSVExport({ invoices }) {
  const buttonStyle =
    "relative focusable-ring heading-S2 pt-4.5 pb-3.75 text-center rounded-3xl transition-fast disabled-button text-action-tertiary-text bg-action-tertiary-bg enabled:hover:bg-action-tertiary-bg-hover pl-[1.006rem] pr-[0.868rem]";

  return (
    <button
      className={buttonStyle}
      onClick={() => exportInvoicesToCSV(invoices)}
      aria-label="Export invoices to CSV"
    >
      Export CSV
    </button>
  );
}

export default InvoiceCSVExport;
