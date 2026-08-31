"use client";

import Button from "@/components/ui/Button";

function InvoiceActions({ invoiceItem }) {
  return (
    <>
      <Button
        href={`/${invoiceItem.id}/edit`}
        scroll={false}
        variant={"edit"}
        onClick={(e) => {
          window.__lastModalTriggerElement = e.currentTarget;
        }}
      >
        Edit
      </Button>

      <Button variant={"delete"}>Delete</Button>
    </>
  );
}

export default InvoiceActions;
