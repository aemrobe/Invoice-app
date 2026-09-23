"use client";

import GoBackBtn from "@/components/ui/GoBackBtn";
import FormRow from "@/components/ui/FormRow";
import MyDatePicker from "../ui/MyDatePicker";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useOutsideClicks } from "@/hooks/useOutsideClicks";
import CustomSelect from "@/components/ui/CustomSelect";
import Button from "@/components/ui/Button";
import { useScrollOverflow } from "@/hooks/useScrollOverflow";
import FormSection from "@/components/ui/FormSection";
import { useFieldArray, useForm } from "react-hook-form";
import { FIELD_REQUIRED_MESSAGE } from "@/lib/constants/invoice";
import InvoiceItemRow from "./InvoiceItemRow";

const SECTION_TITLE_STYLES = "heading-S2 text-brand-primary capitalize mb-6";

const DEFAULT_FORM_VALUES = {
  senderAddress: { street: "", city: "", postcode: "", country: "" },
  clientName: "",
  clientEmail: "",
  clientAddress: { street: "", city: "", postcode: "", country: "" },
  createdAt: new Date().toISOString().split("T")[0],
  paymentTerms: 30,
  description: "",
  items: [],
};

const validateRequired = (value) =>
  value.trim() !== "" || FIELD_REQUIRED_MESSAGE;

function InvoiceForm({ editInvoice = null, overlay, className }) {
  const isEditMode = !!editInvoice;
  const { id = "" } = isEditMode ? editInvoice : {};

  const {
    register,
    handleSubmit,
    control,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: DEFAULT_FORM_VALUES,
    values: isEditMode
      ? {
          senderAddress:
            editInvoice.senderAddress || DEFAULT_FORM_VALUES.senderAddress,
          clientName: editInvoice.clientName || "",
          clientEmail: editInvoice.clientEmail || "",
          clientAddress:
            editInvoice.clientAddress || DEFAULT_FORM_VALUES.clientAddress,
          createdAt: editInvoice.createdAt || DEFAULT_FORM_VALUES.createdAt,
          paymentTerms: editInvoice.paymentTerms || 30,
          description: editInvoice.description || "",
          items: editInvoice.items?.length > 0 ? editInvoice.items : [],
        }
      : undefined,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
    rules: {
      validate: (value) => {
        return (
          (Array.isArray(value) && value.length > 0) ||
          "- An item must be added"
        );
      },
    },
  });

  const emptyItemsLength = fields.length === 0;
  const noItemError = errors.items?.root;

  const router = useRouter();
  const scrollRef = useRef();
  const hasMoreToScroll = useScrollOverflow(scrollRef);

  const titleId = "invoice-modal-title";

  const handleGoback = useCallback(() => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(isEditMode ? `/invoices/${id}` : "/invoices");
    }
  }, [router, isEditMode, id]);

  const handleRemoveItem = (index) => {
    const nextFocusIndex = index < fields.length - 1 ? index : index - 1;

    remove(index);

    requestAnimationFrame(() => {
      if (nextFocusIndex >= 0) {
        const targetInput = document.getElementById(
          `name-${nextFocusIndex}-id`,
        );

        targetInput?.focus();
      } else {
        document.getElementById("add-item-btn")?.focus();
      }
    });
  };

  const handleAddItem = () => {
    append({
      name: "",
      quantity: 1,
      price: 0,
    });

    clearErrors("items.root");
  };

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

  const onSubmit = async (data) => {
    console.log("submit", data);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className={`fixed  z-30 transparent inset-x-0 bottom-0 top-18 ${overlay} bg-black/50`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          ref={modalRef}
          className={`outline-none fixed flex flex-col  z-20  bg-surface-modal inset-x-0 top-18 bottom-0 pt-2  pr-2 ${className}`}
        >
          <div
            ref={scrollRef}
            className={`pt-6.25 pl-6 pr-4 ${noItemError ? "pb-0" : "pb-22"} w-full flex-1 min-h-0 overflow-y-auto custom-scrollbar`}
          >
            <GoBackBtn onClick={handleGoback} />

            <h1
              id={titleId}
              className="text-content-primary heading-M leading-8 tracking-[-0.5px] mt-6.5"
            >
              {isEditMode ? (
                <span>
                  Edit{" "}
                  <span aria-hidden="true" className="text-heading-prefix">
                    #
                  </span>
                  <span className="sr-only">Invoice</span>
                  {id}
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
                id={"senderAddress-street"}
                label={"Street Address"}
                className={"mb-6.25"}
                error={errors.senderAddress?.street?.message}
                {...register("senderAddress.street", {
                  validate: validateRequired,
                })}
              />

              <AddressFields
                register={register}
                prefix={"senderAddress"}
                errors={errors}
              />
            </FormSection>

            <FormSection
              title={"Bill To"}
              legendClassName={`${SECTION_TITLE_STYLES}`}
            >
              <div className="flex flex-col gap-6.25 mb-6.25">
                <FormRow
                  id={"client-name"}
                  label={"Client's Name"}
                  error={errors.clientName?.message}
                  {...register("clientName", {
                    validate: validateRequired,
                  })}
                />

                <FormRow
                  id={"client-email"}
                  label={"Client’s Email"}
                  placeholder="e.g. email@example.com"
                  error={errors.clientEmail?.message}
                  {...register("clientEmail", {
                    validate: validateRequired,
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                />

                <FormRow
                  id={"clientAddress-street"}
                  label={"Street Address"}
                  error={errors.clientAddress?.street?.message}
                  {...register("clientAddress.street", {
                    validate: validateRequired,
                  })}
                />
              </div>

              <AddressFields
                register={register}
                errors={errors}
                prefix={"clientAddress"}
              />
            </FormSection>

            <div className="flex flex-col gap-6.25 mb-6.25">
              <MyDatePicker
                initialDate={editInvoice?.createdAt || new Date()}
                register={register}
                name={"createdAt"}
              />

              <CustomSelect
                defaultValue={editInvoice?.paymentTerms || 30}
                options={[
                  { label: "Net 1 Day", value: 1 },
                  { label: "Net 7 Days", value: 7 },
                  { label: "Net 14 Days", value: 14 },
                  { label: "Net 30 Days", value: 30 },
                ]}
                label={"Payment Terms"}
                name={"paymentTerms"}
                register={register}
              />
            </div>

            <FormRow
              id={"project-description"}
              label={"Project Description"}
              className={"mb-17.25"}
              error={errors?.description?.message}
              {...register("description", {
                validate: validateRequired,
              })}
            />

            <FormSection
              className="mb-0"
              title={"Item List"}
              legendClassName={`text-[1.125rem] ${!emptyItemsLength ? "mb-5.5" : "mb-3.75"} font-bold leading-8 tracking-[-0.38px] text-slate-380`}
            >
              <div className="flex flex-col gap-y-12.25">
                {fields.map((field, index) => (
                  <InvoiceItemRow
                    key={field.id}
                    field={field}
                    index={index}
                    register={register}
                    control={control}
                    errors={errors}
                    remove={() => handleRemoveItem(index)}
                  />
                ))}
              </div>

              <Button
                id="add-item-btn"
                onClick={handleAddItem}
                variant="edit"
                className={`w-full  ${!emptyItemsLength ? "mt-12" : ""}`}
              >
                + Add New item
              </Button>
            </FormSection>

            {noItemError && (
              <p className="pt-8.25 pb-10.75 text-[10px] tracking-[-0.21px] leading-tight-s text-error">
                {errors.items.root.message}
              </p>
            )}
          </div>

          <div className="shrink-0 relative">
            <div
              className={`h-16 pointer-events-none absolute right-0 left-0 z-10 -top-16 bg-linear-to-b from-transparent via-black/5  to-black/10   ${hasMoreToScroll ? "opacity-100" : "opacity-0"} `}
            ></div>

            <div
              className={`bg-surface-primary pt-5.25 pb-5.5 px-6 flex ${isEditMode ? "gap-x-2" : "gap-x-1.75"} justify-end`}
            >
              {isEditMode ? (
                <>
                  <Button variant="cancel" onClick={handleGoback}>
                    Cancel
                  </Button>
                  <Button variant="save" onClick={handleSave}>
                    Save Changes
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="discard" onClick={handleGoback}>
                    Discard
                  </Button>
                  <Button variant="draft" onClick={handleGoback}>
                    Save as Draft
                  </Button>
                  <Button type="submit" variant="saveAndSend">
                    Save & Send
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function AddressFields({ prefix, register, errors, className }) {
  return (
    <div className={`grid grid-cols-2 gap-x-5.75 gap-y-6.25 ${className}`}>
      <FormRow
        id={`${prefix}-city`}
        label={"City"}
        error={errors?.[prefix]?.city?.message}
        {...register(`${prefix}.city`, {
          validate: validateRequired,
        })}
      />

      <FormRow
        id={`${prefix}-postCode`}
        label={"Post Code"}
        error={errors?.[prefix]?.postcode?.message}
        {...register(`${prefix}.postcode`, {
          validate: validateRequired,
        })}
      />

      <FormRow
        id={`${prefix}-country`}
        label={"country"}
        className={"row-start-2 col-span-2"}
        error={errors?.[prefix]?.country?.message}
        {...register(`${prefix}.country`, {
          validate: validateRequired,
        })}
      />
    </div>
  );
}
export default InvoiceForm;
