"use client";

import InvoiceCard from "@/components/invoice/InvoiceCard";
import EmptyMessage from "@/components/ui/EmptyMessage";
import { useEffect } from "react";

function InvoiceList({ invoices }) {
  useEffect(() => {
    const focusedInvoiceId = sessionStorage.getItem("focusedInvoiceId");

    if (focusedInvoiceId) {
      const element = document.getElementById(focusedInvoiceId);

      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.focus();
      }
    }

    requestAnimationFrame(() => {
      sessionStorage.removeItem("focusedInvoiceId");
    });
  }, []);

  return invoices?.length === 0 ? (
    <EmptyMessage buttonText={"New"} />
  ) : (
    <ul
      className="mt-8 grid justify-center grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(280px,auto))] gap-4"
      role="list"
    >
      {invoices.map((invoice) => (
        <InvoiceCard key={invoice.id} invoice={invoice} />
      ))}
    </ul>
  );
}

export default InvoiceList;
