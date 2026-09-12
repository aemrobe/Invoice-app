"use client";

import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import ConfirmDeleteModal from "@/components/ui/ConfirmDeleteModal";

function InvoiceActions({ invoiceItem }) {
  const { id } = invoiceItem;

  return (
    <>
      <Button
        href={`/invoices/${id}/edit`}
        scroll={false}
        variant={"edit"}
        onClick={(e) => {
          window.__lastModalTriggerElement = e.currentTarget;
        }}
      >
        Edit
      </Button>

      <Modal.Open modalName={"delete-invoice"}>
        <Button variant={"delete"}>Delete</Button>
      </Modal.Open>

      <Modal.Window
        titleId={"delete-modal-title"}
        contentId={"delete-modal-text"}
        initialFocusSelector={"#cancel-modal-button"}
        modalName={"delete-invoice"}
        className="max-w-81.75  w-[88%] top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 bg-surface-primary pt-8.5 pb-8 px-8 rounded-lg"
        overlay="inset-x-0 inset-y-0 bg-black/50"
      >
        <ConfirmDeleteModal invoiceId={id} />
      </Modal.Window>
    </>
  );
}

export default InvoiceActions;
