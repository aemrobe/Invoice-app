import { useCallback, useEffect, useState } from "react";
import { CloseIcon, SelectedIcon } from "@/components/icons";
import { TOAST_DURATION_MS } from "@/lib/constants/durations";

function ToastMessage({ toastMessageContent, onClose, toastId }) {
  const { text } = toastMessageContent;
  const [showToastMessage, setShowToastMessage] = useState(true);

  const handleDismiss = useCallback(
    function () {
      setShowToastMessage(false);
      setTimeout(function () {
        onClose(toastId);
      }, TOAST_DURATION_MS);
    },
    [onClose, toastId],
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        handleDismiss();
      }
    },
    [handleDismiss],
  );

  useEffect(
    function () {
      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    },
    [handleKeyDown],
  );

  useEffect(
    function () {
      const timer = setTimeout(function () {
        handleDismiss();
      }, TOAST_DURATION_MS);

      return () => {
        clearTimeout(timer);
      };
    },
    [handleDismiss],
  );

  return (
    <div
      className={`${showToastMessage ? "animate-fade-in" : "animate-fade-out"} bg-surface-primary shadow-dropdown p-4 text-content-primary rounded-lg border-l-4 border-status-paid flex gap-4 items-center justify-between w-full max-w-100 text-base pointer-events-auto`}
    >
      <div className={"flex items-center gap-3"}>
        <SelectedIcon className={`text-status-paid w-5 h-5 shrink-0`} />
        <p className={"text-preset-4-bold leading-tight"} role="alert">
          {text}
        </p>
      </div>

      <button
        aria-label="close notification"
        onClick={handleDismiss}
        className="text-content-tertiary hover:text-content-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring rounded-sm"
      >
        <CloseIcon className={"w-5 h-5"} />
      </button>
    </div>
  );
}

export default ToastMessage;
