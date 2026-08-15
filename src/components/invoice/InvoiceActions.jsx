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
        overlay="top-18 bottom-0 inset-x-0"
        className="top-18 bottom-0 inset-x-0 bg-surface-modal"
      >
        <InvoiceForm editInvoice={invoiceItem} />
      </Modal.Window>

      <Button variant={"delete"}>Delete</Button>
    </Modal>
  );
}

export default InvoiceActions;
