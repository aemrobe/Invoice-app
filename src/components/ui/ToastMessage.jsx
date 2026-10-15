import { useCallback, useEffect, useState } from "react";
import { CloseIcon, SelectedIcon } from "@/components/icons";
import {
  SUCCESS_TOAST_DURATION_MS,
  ERROR_TOAST_DURATION_MS,
  ANIMATION_DURATION_TOAST,
} from "@/lib/constants/durations";

function ToastMessage({ toastMessageContent, onClose, toastId }) {
  const { text, type = "action" } = toastMessageContent;
  const [showToastMessage, setShowToastMessage] = useState(true);
  const isErrorToast = type === "error";

  const duration = isErrorToast
    ? ERROR_TOAST_DURATION_MS
    : SUCCESS_TOAST_DURATION_MS;

  const handleDismiss = useCallback(
    function () {
      setShowToastMessage(false);
      setTimeout(function () {
        onClose(toastId);
      }, ANIMATION_DURATION_TOAST);
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
      }, duration);

      return () => {
        clearTimeout(timer);
      };
    },
    [handleDismiss, duration],
  );

  return (
    <div
      className={`${showToastMessage ? "animate-fade-in" : "animate-fade-out"} bg-surface-primary shadow-dropdown p-4 text-content-primary rounded-lg border-l-4 ${isErrorToast ? "border-error" : "border-status-paid"} flex gap-4 items-center justify-between w-full max-w-100 text-base pointer-events-auto`}
    >
      <div className={"flex items-center gap-3"}>
        <SelectedIcon
          className={`${isErrorToast ? "text-error" : "text-status-paid"} w-5 h-5 shrink-0`}
        />
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
