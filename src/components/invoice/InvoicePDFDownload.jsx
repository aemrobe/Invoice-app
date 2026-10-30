"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDFDocument from "@/components/invoice/InvoicePDFDocument";
import { useEffect, useState } from "react";

function InvoicePDFDownload({ invoice }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsClient(true);
    }, 0);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-200 bg-surface-primary flex items-center justify-center rounded-md border border-slate-200 shadow-card">
        <p className="text-content-muted">Loading PDF Download...</p>
      </div>
    );
  }

  return (
    <PDFDownloadLink
      document={<InvoicePDFDocument invoice={invoice} />}
      fileName={`invoice-${invoice.id}.pdf`}
      className="bg-action-secondary-bg hover:bg-action-secondary-hover aria-disabled:hover:bg-action-secondary-bg  text-action-secondary-text hover:text-action-secondary-text-hover aria-disabled:hover:text-action-secondary-text pl-6 pr-6 relative focusable-ring heading-S2 pt-4.5 pb-3.75 text-center rounded-3xl transition-fast disabled-button"
    >
      {({ loading }) => (loading ? "Preparing document..." : "Download Pdf")}
    </PDFDownloadLink>
  );
}

export default InvoicePDFDownload;
