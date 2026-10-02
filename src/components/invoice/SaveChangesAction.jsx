import { updatedInvoice } from "@/lib/actions/invoiceActions";
import { useToast } from "@/context/ToastContext";
import { useFormState } from "react-hook-form";
import Button from "@/components/ui/Button";
import ToolTip from "../ui/ToolTip";

function SaveChangesAction({
  pendingAction,
  setPendingAction,
  closeModalAndRefresh,
  editInvoice,
  control,
  isPending,
  handleSubmit,
  onError,
  startTransition,
}) {
  const saveHintId = "save-hint-id";

  const { onShowToastMessage } = useToast();

  const { isDirty } = useFormState({ control });

  const handleSaveChanges = async (data) => {
    if (!isDirty) return;

    setPendingAction("saveChanges");

    startTransition(async () => {
      const res = await updatedInvoice(editInvoice.id, data);

      if (res?.success) {
        onShowToastMessage({
          text: `Invoice successfully updated`,
        });

        closeModalAndRefresh();
      }
    });
  };

  return (
    <>
      <ToolTip content={"No Changes made yet"} show={!isDirty}>
        <Button
          pending={isPending && pendingAction === "saveChanges"}
          disabled={isPending}
          variant="save"
          aria-describedby={!isDirty ? saveHintId : undefined}
          onClick={handleSubmit(handleSaveChanges, onError)}
        >
          Save Changes
        </Button>
      </ToolTip>

      <p className="sr-only" id={saveHintId}>
        Your form hasn&apos;t been changed, please make some changes before
        trying to submit.
      </p>
    </>
  );
}

export default SaveChangesAction;
