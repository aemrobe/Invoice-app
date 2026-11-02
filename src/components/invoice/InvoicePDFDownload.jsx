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

  const buttonStyle =
    "bg-action-secondary-bg text-action-secondary-text pl-6 pr-6 relative focusable-ring heading-S2 pt-4.5 pb-3.75 text-center rounded-3xl transition-fast inline-block";

  if (!isClient) {
    return (
      <button
        disabled
        aria-disabled="true"
        className={`${buttonStyle} opacity-70 cursor-not-allowed`}
      >
        Download Pdf
      </button>
    );
  }

  return (
    <PDFDownloadLink
      document={<InvoicePDFDocument invoice={invoice} />}
      fileName={`invoice-${invoice.id}.pdf`}
      className={`${buttonStyle} hover:bg-action-secondary-hover hover:text-action-secondary-text-hover`}
    >
      {({ loading }) => (loading ? "Download Pdf" : "Download Pdf")}
    </PDFDownloadLink>
  );
}

export default InvoicePDFDownload;
