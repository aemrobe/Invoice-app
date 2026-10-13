"use client";

import ConfirmDeleteModal from "@/components/ui/ConfirmDeleteModal";
import Modal from "@/components/ui/Modal";

function DeleteModalWindow({ invoiceId }) {
  return (
    <Modal.Window
      titleId={"delete-modal-title"}
      contentId={"delete-modal-text"}
      initialFocusSelector={"#cancel-modal-button"}
      modalName={"delete-invoice"}
      className="max-w-81.75 md:max-w-120  w-[88%] top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 bg-surface-primary pt-8.5 pb-8 px-8 md:pt-12.75 md:px-12 md:pb-12 rounded-lg"
      overlay="inset-x-0 inset-y-0 bg-black/50 lg:max-w-360 lg:mx-auto"
    >
      <ConfirmDeleteModal invoiceId={invoiceId} />
    </Modal.Window>
  );
}

export default DeleteModalWindow;
