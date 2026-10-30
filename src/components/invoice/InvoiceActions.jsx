"use client";

import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";

import { markAsPaidButton } from "@/lib/actions/invoiceActions";
import { useTransition } from "react";
import { useToast } from "@/context/ToastContext";
import InvoicePDFDownload from "./InvoicePDFDownload";

function InvoiceActions({ invoice }) {
  const { id, status } = invoice;

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
      {status !== "paid" && (
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

      {status === "pending" && (
        <Button
          pending={isPending}
          disabled={isPending}
          onClick={handleMarkAsPaid}
          variant={"primary"}
        >
          Mark as Paid
        </Button>
      )}

      {status === "paid" && <InvoicePDFDownload invoice={invoice} />}
    </>
  );
}

export default InvoiceActions;
