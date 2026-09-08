"use client";

import GoBackBtn from "@/components/ui/GoBackBtn";
import FormRow from "@/components/ui/FormRow";
import MyDatePicker from "../ui/MyDatePicker";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useOutsideClicks } from "@/hooks/useOutsideClicks";
import CustomSelect from "@/components/ui/CustomSelect";
import { DeleteIcon } from "@/components/icons";
import Button from "@/components/ui/Button";
import { useScrollOverflow } from "@/hooks/useScrollOverflow";
import FormSection from "../ui/FormSection";

const SECTION_TITLE_STYLES = "heading-S2 text-brand-primary capitalize mb-6";

function InvoiceForm({ editInvoice = "", overlay, className }) {
  const isEditMode = !!editInvoice;

  const router = useRouter();
  const scrollRef = useRef();
  const hasMoreToScroll = useScrollOverflow(scrollRef);

  const [items, setItems] = useState(editInvoice?.items || []);

  const titleId = "invoice-modal-title";

  const handleGoback = useCallback(() => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(isEditMode ? `/invoices/${editInvoice.id}` : "/invoices");
    }
  }, [router, editInvoice.id, isEditMode]);

  const handleSave = function () {
    console.log("changes saved");

    handleGoback();
  };

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
      className={`fixed  z-30 transparent inset-x-0 bottom-0 top-18 ${overlay} bg-black/50`}
    >
      <div
        ref={modalRef}
        className={`outline-none fixed flex flex-col  z-20  bg-surface-modal inset-x-0 top-18 bottom-0 pt-2  pr-2 ${className}`}
      >
        <div
          ref={scrollRef}
          className="pt-6.25 pl-6 pr-4 pb-22 w-full flex-1 min-h-0 overflow-y-auto custom-scrollbar "
        >
          <GoBackBtn onClick={handleGoback} />

          <h1
            id={titleId}
            className="text-content-primary   heading-M leading-8 tracking-[-0.5px] mt-6.5"
          >
            {isEditMode ? (
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

          <FormSection
            className="mt-5.5 mb-10.25"
            title={"Bill From"}
            legendClassName={`${SECTION_TITLE_STYLES}`}
          >
            <FormRow
              name={"senderAddress.street"}
              id={"senderAddress-street"}
              label={"Street Address"}
              className={"mb-6.25"}
            />

            <AddressFields prefix={"senderAddress"} />
          </FormSection>

          <FormSection
            title={"Bill To"}
            legendClassName={`${SECTION_TITLE_STYLES}`}
          >
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

            <AddressFields prefix={"clientAddress"} />
          </FormSection>

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
            className={"mb-17.25"}
          />

          <FormSection
            className="mb-0"
            title={"Item List"}
            legendClassName={`text-[1.125rem] ${isEditMode ? "mb-5.5" : "mb-3.75"} font-bold leading-8 tracking-[-0.38px] text-slate-380`}
          >
            <div className="flex flex-col gap-y-12.25">
              {items.map((item, index) => (
                <FormSection
                  key={index}
                  className="mb-0"
                  legendClassName="sr-only"
                  title={`Item ${index + 1}`}
                >
                  <div className="flex flex-wrap gap-y-6.25 gap-x-4">
                    <FormRow
                      name={`items[${index}].name`}
                      id={`name-${index}-id`}
                      label={"Item Name"}
                      defaultValue={item.name}
                      className={"w-full"}
                      labelClassName={"md:sr-only  mb-3.75"}
                    />

                    <FormRow
                      name={`items[${index}].quantity`}
                      id={`quantity-${index}-id`}
                      label={"Qty."}
                      defaultValue={item.quantity}
                      className={"w-16"}
                      labelClassName={"md:sr-only mb-2.25"}
                    />

                    <FormRow
                      name={`price-${index + 1}`}
                      id={`price-${index}-id`}
                      label={"price"}
                      defaultValue={item.price}
                      className={"w-25"}
                      labelClassName={"md:sr-only mb-2.25"}
                    />

                    <div className="flex flex-col">
                      <span className="leading-tight-s text-form-label capitalize mb-2.25 md:sr-only">
                        Total
                      </span>

                      <span className="heading-S2 text-slate-300 pt-4.5 pb-3.75 ">
                        {Number(item.quantity) * Number(item.price)}
                      </span>
                    </div>

                    <div className=" ml-auto  flex flex-col items-center">
                      <span
                        aria-hidden="true"
                        className="leading-tight-s text-form-label capitalize  mb-2.25 md:hidden invisible  select-none"
                      >
                        D
                      </span>

                      <div className="pt-4.5 pb-1.75">
                        <button
                          type="button"
                          className="focusable-ring rounded-xs"
                          style={{
                            "--ring-offset": "6px",
                          }}
                        >
                          <span className="sr-only">Delete {item.name}</span>
                          <DeleteIcon className={"text-slate-300 w-3.25"} />
                        </button>
                      </div>
                    </div>
                  </div>
                </FormSection>
              ))}
            </div>

            <Button
              variant="edit"
              className={`w-full ${isEditMode ? "mt-12" : ""}`}
            >
              + Add New item
            </Button>
          </FormSection>
        </div>

        <div className="shrink-0 relative">
          <div
            className={`h-16 pointer-events-none absolute right-0 left-0 z-10 -top-16 bg-linear-to-b from-transparent via-black/5  to-black/10   ${hasMoreToScroll ? "opacity-100" : "opacity-0"} `}
          ></div>

          <div className=" bg-surface-primary pt-5.25 pb-5.5 px-6 flex gap-x-2 justify-end">
            <Button variant="cancel" onClick={handleGoback}>
              Cancel
            </Button>
            <Button variant="save" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
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
