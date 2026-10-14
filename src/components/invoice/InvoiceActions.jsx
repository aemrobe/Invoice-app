"use client";

import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";

import { markAsPaidButton } from "@/lib/actions/invoiceActions";
import { useTransition } from "react";
import { useToast } from "@/context/ToastContext";

function InvoiceActions({ invoice }) {
  const { id } = invoice;

  const [isPending, startTransition] = useTransition();
  const { onShowToastMessage } = useToast();

  const handleMarkAsPaid = () => {
    startTransition(async () => {
      const res = await markAsPaidButton(id);

      if (res?.success) {
        onShowToastMessage({
          text: "Invoice marked as paid successfully",
          focusHeaderOnClose: true,
        });
      } else {
        onShowToastMessage({
          text: res?.error,
          type: "error",
        });
      }
    });
  };

  return (
    <>
      {invoice.status !== "paid" && (
        <Button
          disabled={isPending}
          href={`/invoices/${id}/edit`}
          scroll={false}
          variant={"edit"}
          onClick={(e) => {
            window.__lastModalTriggerElement = e.currentTarget;
          }}
        >
          Edit
        </Button>
      )}

      <Modal.Open modalName={"delete-invoice"}>
        <Button disabled={isPending} variant={"delete"}>
          Delete
        </Button>
      </Modal.Open>

      {invoice.status === "pending" && (
        <Button
          pending={isPending}
          disabled={isPending}
          onClick={handleMarkAsPaid}
          variant={"primary"}
        >
          Mark as Paid
        </Button>
      )}
    </>
  );
}

export default InvoiceActions;
