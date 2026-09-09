"use client";

import InvoiceCard from "@/components/invoice/InvoiceCard";
import EmptyMessage from "@/components/ui/EmptyMessage";
import invoices from "@/lib/data.json";
import { useEffect } from "react";

function InvoiceList() {
  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const targetId = hash.replace("#", "");
      const element = document.getElementById(targetId);

      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.focus();
      }
    }
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
