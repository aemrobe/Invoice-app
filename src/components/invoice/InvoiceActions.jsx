"use client";

import Button from "@/components/ui/Button";
import Link from "next/link";

function InvoiceActions({ invoiceItem }) {
  return (
    <>
      <Button href={`/${invoiceItem.id}/edit`} scroll={false} variant={"edit"}>
        Edit
      </Button>

      <Button variant={"delete"}>Delete</Button>
    </>
  );
}

export default InvoiceActions;
