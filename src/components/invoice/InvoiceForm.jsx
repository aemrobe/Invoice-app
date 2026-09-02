"use client";

import GoBackBtn from "@/components/ui/GoBackBtn";
import FormRow from "@/components/ui/FormRow";
import MyDatePicker from "../ui/MyDatePicker";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { useOutsideClicks } from "@/hooks/useOutsideClicks";
import CustomSelect from "@/components/ui/CustomSelect";

function InvoiceForm({ editInvoice = "", overlay, className }) {
  const router = useRouter();

  const titleId = "invoice-modal-title";

  const handleGoback = useCallback(() => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(`/invoices/${editInvoice.id}`);
    }
  }, [router, editInvoice.id]);

  const modalRef = useOutsideClicks(handleGoback, {
    ignoreSelectors: "header",
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    const modalElement = modalRef.current;

    if (!modalElement) return;

    const focusableSelector =
      'button:not([disabled]), [href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleGoback();
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

    // Wait for 2 paint frames to ensure layout finishes completely on hard reloads
    let innerFrameId;
    const outerFrameId = requestAnimationFrame(() => {
      innerFrameId = requestAnimationFrame(() => {
        const inputElement = document.getElementById("senderAddress-street");
        if (inputElement) {
          inputElement.focus();
        }
      });
    });

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      cancelAnimationFrame(outerFrameId);
      cancelAnimationFrame(innerFrameId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleGoback]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className={`fixed z-30 transparent inset-x-0 bottom-0 top-18 ${overlay}`}
    >
      <div
        ref={modalRef}
        className={`outline-none fixed z-20  bg-surface-modal inset-x-0 top-18 bottom-0 pt-2  pr-2 ${className}`}
      >
        <div className="pt-6.25 pl-6 pr-4 h-full w-full overflow-y-auto custom-scrollbar">
          <GoBackBtn onClick={handleGoback} />

          <h1
            id={titleId}
            className="text-content-primary   heading-M leading-8 tracking-[-0.5px] mt-6.5"
          >
            {editInvoice ? (
              <span>
                Edit{" "}
                <span aria-hidden="true" className="text-heading-prefix">
                  #
                </span>
                <span className="sr-only">Invoice</span>
                {editInvoice.id}
              </span>
            ) : (
              "New invoice"
            )}
          </h1>

          <FormSectionTitle className="mt-5.5 mb-6">
            Bill From{" "}
          </FormSectionTitle>

          <FormRow
            name={"senderAddress.street"}
            id={"senderAddress-street"}
            label={"Street Address"}
            className={"mb-6.25"}
          />

          <AddressFields prefix={"senderAddress"} className={"mb-10.25"} />

          <FormSectionTitle className="mb-6">Bill to </FormSectionTitle>

          <div className="flex flex-col gap-6.25 mb-6.25">
            <FormRow
              name={"clientName"}
              id={"client-name"}
              label={"Client's Name"}
            />

            <FormRow
              name={"clientEmail"}
              id={"client-email"}
              label={"Client’s Email"}
              placeholder="e.g. email@example.com"
            />

            <FormRow
              name="clientAddress.street"
              id={"clientAddress-street"}
              label={"Street Address"}
            />
          </div>

          <AddressFields prefix={"clientAddress"} className={"mb-10.25"} />

          <div className="flex flex-col gap-6.25 mb-6.25">
            <MyDatePicker />

            <CustomSelect
              defaultValue={1}
              name={"paymentTerms"}
              options={[
                { label: "Net 1 Day", value: 1 },
                { label: "Net 7 Days", value: 7 },
                { label: "Net 14 Days", value: 14 },
                { label: "Net 30 Days", value: 30 },
              ]}
              label={"Payment Terms"}
            />
          </div>

          <FormRow
            name={"projectDescription"}
            id={"project-description"}
            label={"Project Description"}
          />
        </div>
      </div>
    </div>
  );
}

function FormSectionTitle({ children, className = "" }) {
  return (
    <p className={`heading-S2 text-brand-primary capitalize  ${className}`}>
      {children}
    </p>
  );
}

function AddressFields({ prefix, className }) {
  return (
    <div className={`grid grid-cols-2 gap-x-5.75 gap-y-6.25 ${className}`}>
      <FormRow name={`${prefix}.city`} id={`${prefix}-city`} label={"City"} />

      <FormRow
        name={`${prefix}.postcode`}
        id={`${prefix}-postCode`}
        label={"Post Code"}
      />

      <FormRow
        name={`${prefix}.country`}
        id={`${prefix}-country`}
        label={"country"}
        className={"row-start-2 col-span-2"}
      />
    </div>
  );
}
export default InvoiceForm;
