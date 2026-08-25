"use client";

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import InvoiceForm from "@/components/invoice/InvoiceForm";

function InvoiceActions({ invoiceItem }) {
  return (
    <Modal>
      <Modal.Open modalName={"edit-invoice"}>
        <Button variant={"edit"}>Edit</Button>
      </Modal.Open>

      <Modal.Window
        modalName={"edit-invoice"}
        titleId={"edit-invoice-title"}
        contentId={"edit-invoice-content"}
        overlay="bg-red-500 inset-x-0 bottom-0 top-18"
        className="bg-surface-modal inset-x-0 top-18 bottom-0 pt-2  pr-2"
        initialFocusSelector={"#senderAddress-street"}
      >
        <InvoiceForm editInvoice={invoiceItem} />
      </Modal.Window>

      <Button variant={"delete"}>Delete</Button>
    </Modal>
  );
}

export default InvoiceActions;
