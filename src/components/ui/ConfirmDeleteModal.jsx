import Button from "@/components/ui/Button";
import { useTransition } from "react";
import { deleteInvoice } from "@/lib/actions/invoiceActions";
import { useRouter } from "next/navigation";

function ConfirmDeleteModal({
  titleId,
  contentId,
  onCloseModal,
  restoreFocus,
  initialFocusSelector,
  invoiceId,
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleDeleteInvoice() {
    startTransition(async () => {
      const res = await deleteInvoice(invoiceId);

      if (res?.success) {
        onCloseModal();
        router.replace("/invoices");
      }
    });
  }

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
          disabled={isPending}
          variant={"cancelModal"}
          onClick={() => {
            restoreFocus();
            onCloseModal();
          }}
        >
          Cancel
        </Button>

        <Button
          pending={isPending}
          disabled={isPending}
          variant={"delete"}
          id={initialFocusSelector}
          onClick={handleDeleteInvoice}
        >
          Delete
        </Button>
      </div>
    </>
  );
}

export default ConfirmDeleteModal;
