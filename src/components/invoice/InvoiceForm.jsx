"use client";

import GoBackBtn from "@/components/ui/GoBackBtn";

function InvoiceForm({
  titleId,
  contentId,
  editInvoice = "",
  onCloseModal,
  restoreFocus,
}) {
  return (
    <div>
      <GoBackBtn
        onClick={() => {
          onCloseModal();
          restoreFocus();
        }}
      />
      <h1 id={titleId}>
        {editInvoice ? `Edit ${editInvoice.id}` : "New invoice"}
      </h1>
      <p id={contentId}>This is the modal form</p>
    </div>
  );
}

export default InvoiceForm;
