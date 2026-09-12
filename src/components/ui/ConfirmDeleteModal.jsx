import Button from "@/components/ui/Button";

function ConfirmDeleteModal({
  titleId,
  contentId,
  onCloseModal,
  restoreFocus,
  initialFocusSelector,
  invoiceId,
}) {
  return (
    <>
      <h2
        id={titleId}
        className="heading-M text-content-primary mb-2 tracking-[-0.5px] leading-8"
      >
        Confirm Deletion
      </h2>

      <p id={contentId} className="leading-5.5 mb-5.5 text-slate-300">
        Are you sure you want to delete invoice
        {` ${invoiceId}`}? This action cannot be undone.
      </p>

      <div className="flex gap-2 justify-end">
        <Button
          variant={"cancelModal"}
          onClick={() => {
            restoreFocus();
            onCloseModal();
          }}
        >
          Cancel
        </Button>

        <Button
          variant={"delete"}
          id={initialFocusSelector}
          onClick={() => {
            onCloseModal();
            console.log("delete invoice");
          }}
        >
          Delete
        </Button>
      </div>
    </>
  );
}

export default ConfirmDeleteModal;
