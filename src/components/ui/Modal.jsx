"use client";

import {
  cloneElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ModalOverlay from "@/components/ui/ModalOverlay";
import { useOutsideClicks } from "@/hooks/useOutsideClicks";
import { createPortal } from "react-dom";
import { MODAL_FOCUS_DURATION } from "../../lib/constants/durations";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const [lastFocusableElement, setLastFocusableElement] = useState(null);

  const close = useCallback(() => {
    setOpenName("");
  }, []);

  const restoreFocus = useCallback(() => {
    const returnTarget =
      typeof lastFocusableElement === "string"
        ? document.querySelector(lastFocusableElement)
        : lastFocusableElement;

    if (returnTarget) {
      setTimeout(() => returnTarget.focus(), MODAL_FOCUS_DURATION);
    }
  }, [lastFocusableElement]);

  const open = useCallback((name, returnSelector) => {
    setOpenName(name);
    setLastFocusableElement(returnSelector || document.activeElement);
  }, []);

  useEffect(
    function () {
      const app = document.querySelector("main");
      if (openName !== "") app.setAttribute("inert", "");
      else app.removeAttribute("inert");
    },
    [openName],
  );

  const value = useMemo(
    () => ({
      openName,
      open,
      close,
      restoreFocus,
    }),
    [close, open, openName, restoreFocus],
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

function Open({ children, modalName, returnToSelector }) {
  const { open } = useContext(ModalContext);

  const handleOpen = (e) => {
    open(modalName, returnToSelector);

    if (children.props.onClick) children.props.onClick(e);
  };

  return cloneElement(children, {
    onClick: handleOpen,
  });
}

function Window({
  children,
  modalName,
  titleId,
  contentId,
  ariaLabel,
  overlay = "",
  className = "",
}) {
  const { close, openName, restoreFocus } = useContext(ModalContext);
  const modalRef = useOutsideClicks(() => {
    close();
    restoreFocus();
  });

  const hasFocussedRef = useRef(false);

  useEffect(() => {
    if (modalName !== openName) {
      hasFocussedRef.current = false;
      return;
    }

    if (hasFocussedRef.current) return;

    const modalElement = modalRef.current;

    if (!modalElement) return;

    const focusableSelector =
      'button:not([disabled]), [href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        close();
        restoreFocus();
      }

      if (e.key === "Tab") {
        const focusableElements =
          modalElement.querySelectorAll(focusableSelector);

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    // 1. Give the browser a tiny moment to paint the modal
    const timer = setTimeout(() => {
      const firstFocusable = modalElement.querySelector(focusableSelector);

      const isInput =
        firstFocusable?.tagName === "INPUT" ||
        firstFocusable?.tagName === "SELECT" ||
        firstFocusable?.tagName === "TEXTAREA";

      //it will check if first focusasble element is input and focus on it if it is otherwise allow automatic screen reader announcement of the modal.
      if (firstFocusable && isInput) {
        firstFocusable.focus();
      }

      hasFocussedRef.current = true;
    }, 10); //10sec

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [modalName, openName, close, modalRef, restoreFocus]);

  if (modalName !== openName) return;

  return createPortal(
    <ModalOverlay overlay={overlay}>
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={!titleId && ariaLabel ? ariaLabel : undefined}
        aria-labelledby={titleId || undefined}
        aria-describedby={contentId || undefined}
        tabIndex={"-1"}
        className={`outline-none border-2 border-lime-500 z-50  fixed ${className}`}
      >
        {cloneElement(children, {
          onCloseModal: () => {
            close();
          },
          restoreFocus,
          titleId,
          contentId,
        })}
      </div>
    </ModalOverlay>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
