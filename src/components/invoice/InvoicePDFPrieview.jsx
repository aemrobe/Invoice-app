"use client";

import { PDFViewer } from "@react-pdf/renderer";
import InvoicePDFDocument from "@/components/invoice/InvoicePDFDocument";
import { useEffect, useState } from "react";

function InvoicePDFPrieview({ invoice }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-[800px] bg-surface-primary flex items-center justify-center rounded-md border border-slate-200 shadow-card">
        <p className="text-content-muted">Loading PDF Preview...</p>
      </div>
    );
  }

  return (
    <PDFViewer width={"100%"} height={"800px"}>
      <InvoicePDFDocument invoice={invoice} />
    </PDFViewer>
  );
}

export default InvoicePDFPrieview;
