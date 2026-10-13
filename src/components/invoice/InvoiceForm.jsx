"use client";

import GoBackBtn from "@/components/ui/GoBackBtn";
import FormRow from "@/components/ui/FormRow";
import MyDatePicker from "../ui/MyDatePicker";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { useOutsideClicks } from "@/hooks/useOutsideClicks";
import CustomSelect from "@/components/ui/CustomSelect";
import Button from "@/components/ui/Button";
import { useScrollOverflow } from "@/hooks/useScrollOverflow";
import FormSection from "@/components/ui/FormSection";
import { useFieldArray, useForm } from "react-hook-form";
import { FIELD_REQUIRED_MESSAGE } from "@/lib/constants/invoice";
import InvoiceItemRow from "./InvoiceItemRow";
import { ACCESSIBILITY_ANNOUNCEMENT_DELAY_MS } from "@/lib/constants/durations";
import {
  createDraftInvoice,
  createNewInvoice,
} from "@/lib/actions/invoiceActions";
import SaveChangesAction from "./SaveChangesAction";

const SECTION_TITLE_STYLES = "heading-S2 text-brand-primary capitalize mb-6";

const validateRequired = (value) =>
  value.trim() !== "" || FIELD_REQUIRED_MESSAGE;

function InvoiceForm({
  editInvoice = null,
  overlay,
  className,
  navigationMode = "standalone",
}) {
  const defaultFormValues = {
    senderAddress: { street: "", city: "", postcode: "", country: "" },
    clientName: "",
    clientEmail: "",
    clientAddress: { street: "", city: "", postcode: "", country: "" },
    createdAt: new Date().toISOString(),
    paymentTerms: 30,
    description: "",
    items: [],
  };

  const { onShowToastMessage } = useToast();
  const [isPending, startTransition] = useTransition();
  const [pendingAction, setPendingAction] = useState("");

  const [annoucement, setAnnoucement] = useState("");
  const isEditMode = !!editInvoice;
  const { id = "" } = isEditMode ? editInvoice : {};

  const fallbackUrl = isEditMode ? `/invoices/${id}` : "/invoices";

  const announceStatus = (message) => {
    setTimeout(() => {
      setAnnoucement(message);
    }, ACCESSIBILITY_ANNOUNCEMENT_DELAY_MS);
  };

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    ...(isEditMode
      ? {
          values: {
            senderAddress:
              editInvoice.senderAddress || defaultFormValues.senderAddress,
            clientName: editInvoice.clientName || "",
            clientEmail: editInvoice.clientEmail || "",
            clientAddress:
              editInvoice.clientAddress || defaultFormValues.clientAddress,
            createdAt: editInvoice.createdAt || defaultFormValues.createdAt,
            paymentTerms: editInvoice.paymentTerms || 30,
            description: editInvoice.description || "",
            items: editInvoice.items?.length > 0 ? editInvoice.items : [],
          },
        }
      : {
          defaultValues: defaultFormValues,
        }),
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

  const closeAfterSave = function () {
    if (navigationMode === "intercepted") {
      router.back();
    } else {
      router.replace(fallbackUrl);
    }
  };

  const handleGoback = useCallback(() => {
    if (navigationMode === "intercepted") {
      router.back();
    } else {
      router.replace(fallbackUrl);
    }
  }, [router, fallbackUrl, navigationMode]);

  const handleRemoveItem = (index) => {
    const noOfItems = fields.length;
    const nextFocusIndex = index < noOfItems - 1 ? index : index - 1;
    const newCount = noOfItems - 1;

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

      const message =
        newCount === 0
          ? `Item deleted. No item remaining.`
          : `Item deleted. ${newCount} item${newCount === 1 ? "" : "s"} remaining.`;

      announceStatus(message);
    });
  };

  const handleAddItem = () => {
    const noOfItems = fields.length;
    const newCount = noOfItems + 1;
    append({
      name: "",
      quantity: 1,
      price: 0,
    });

    clearErrors("items.root");

    requestAnimationFrame(() => {
      const newIndex = noOfItems;

      document.getElementById(`name-${newIndex}-id`)?.focus();

      const message = `New item added. ${newCount} item${newCount === 1 ? "" : "s"} in an invoice.`;

      announceStatus(message);
    });
  };

  const handleSaveDraft = () => {
    const draftData = getValues();
    setPendingAction("draft");

    startTransition(async () => {
      const res = await createDraftInvoice(draftData);

      if (res?.success) {
        onShowToastMessage({
          text: `Draft successfully created`,
        });

        closeAfterSave();
      }
    });
  };

  const handleSaveAndSend = async (data) => {
    setPendingAction("saveAndSend");
    startTransition(async () => {
      const res = await createNewInvoice(data);

      if (res?.success) {
        closeAfterSave();
        onShowToastMessage({
          text: `Invoice successfully created`,
        });
      }
    });
  };

  const onError = (errors) => {
    const rootError = errors.items?.root;

    const hasOtherErrors = Object.keys(errors).some((key) => {
      if (key !== "items") return true;

      return Array.isArray(errors.items) && errors.items.some(Boolean);
    });

    if (rootError && !hasOtherErrors) {
      const addButton = document.getElementById("add-item-btn");

      if (addButton) {
        addButton.scrollIntoView({ behavior: "smooth", block: "center" });
        addButton.focus({ preventScroll: true });
      }
    }
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
        const allFocusable = modalElement.querySelectorAll(focusableSelector);

        // This filter out the interactive elements which have a hidden class inside them.
        const focusableElements = Array.from(allFocusable).filter(
          (el) => el.offsetParent !== null,
        );

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
      className={`fixed z-30 transparent inset-x-0 bottom-0 top-18 md:top-20 lg:top-0  lg:max-w-360 lg:mx-auto ${overlay} bg-black/50`}
    >
      <form onSubmit={handleSubmit(handleSaveAndSend, onError)}>
        <div
          ref={modalRef}
          className={`outline-none fixed lg:absolute flex flex-col  z-20  bg-surface-modal inset-x-0 top-18 bottom-0 md:top-20  lg:top-0 lg:left-0 pt-2 md:pt-34  ${className} max-w-100 md:max-w-154 lg:max-w-179.75 md:rounded-tr-[1.25rem] md:rounded-br-[1.25rem]  md:pt-0`}
        >
          <div className="flex-1 min-h-0 flex flex-col pr-2 md:pr-8">
            <div
              ref={scrollRef}
              className={`pt-6.25 pl-6 pr-4 md:pt-0 md:pl-14 lg:pl-39.75 md:pr-6 ${noItemError ? "pb-0" : "pb-22 md:pb-4"} w-full flex-1 min-h-0 overflow-y-auto custom-scrollbar`}
            >
              <div className="md:absolute z-50 md:top-14.75  md:bg-surface-modal">
                <GoBackBtn onClick={handleGoback} className={"md:hidden"} />

                <h1
                  id={titleId}
                  className="text-content-primary heading-M leading-8 tracking-[-0.5px] mt-6.5 md:mt-0"
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
              </div>

              <div>
                <FormSection
                  className="mt-5.5 md:mt-0 mb-10.25 md:mb-12.25"
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
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6.25 md:gap-6 mb-6.25">
                  <MyDatePicker
                    initialDate={
                      isEditMode
                        ? editInvoice?.createdAt
                        : defaultFormValues.createdAt
                    }
                    setValue={setValue}
                    name={"createdAt"}
                    disabled={isEditMode}
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
                    setValue={setValue}
                  />
                </div>

                <FormRow
                  id={"project-description"}
                  label={"Project Description"}
                  className={"mb-17.25 md:mb-6.75 lg:mb-8.75"}
                  error={errors?.description?.message}
                  {...register("description", {
                    validate: validateRequired,
                  })}
                />

                <div
                  className="sr-only"
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {annoucement}
                </div>

                <FormSection
                  className="mb-0"
                  title={"Item List"}
                  legendClassName={`text-[1.125rem] ${!emptyItemsLength ? "mb-5.5 md:mb-3.5" : "mb-3.75 md:mb-3.5"} font-bold leading-8 tracking-[-0.38px] text-slate-380`}
                >
                  <div className="hidden md:grid md:grid-cols-[1fr_46px_100px_43px_36px] md:gap-x-4 leading-tight-s text-form-label md:mb-3.75">
                    <p>Item Name</p>
                    <p>
                      <span className="sr-only">Quantity</span>
                      <span aria-hidden="true">Qty.</span>
                    </p>
                    <p>Price</p>
                    <p>Total</p>
                    <p className="sr-only">Actions</p>
                  </div>

                  <div className="flex flex-col gap-y-12.25 md:gap-y-4.5">
                    {fields.map((field, index) => (
                      <InvoiceItemRow
                        key={`${field.id}-${index}`}
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
                    aria-describedby={
                      noItemError ? "items-root-error" : undefined
                    }
                    onClick={handleAddItem}
                    variant="edit"
                    className={`w-full  ${!emptyItemsLength ? "mt-12 md:mt-4.5" : "md:mt-3.75"}`}
                  >
                    + Add New item
                  </Button>
                </FormSection>

                {noItemError && (
                  <p
                    id="items-root-error"
                    className="pt-8.25 pb-10.75 text-[10px] tracking-[-0.21px] leading-tight-s text-error"
                  >
                    {errors.items.root.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div
            className={`shrink-0 relative md:rounded-br-[1.25rem]  ${hasMoreToScroll ? "bg-black/10" : ""}`}
          >
            <div
              className={`h-16 pointer-events-none absolute right-0 left-0 z-10 -top-16 bg-linear-to-b from-transparent via-black/5  to-black/10   ${hasMoreToScroll ? "opacity-100" : "opacity-0"} `}
            ></div>

            <div
              className={`bg-surface-primary md:bg-surface-modal md:rounded-tr-[1.25rem]  md:rounded-br-[1.25rem] pt-5.25 pb-5.5 px-6 md:py-7.75 md:px-14 lg:pl-39.75  flex ${isEditMode ? "gap-x-2" : "gap-x-1.75 md:gap-x-2"} justify-end`}
            >
              {isEditMode ? (
                <>
                  <Button
                    disabled={isPending}
                    variant="cancel"
                    onClick={handleGoback}
                  >
                    Cancel
                  </Button>

                  <SaveChangesAction
                    startTransition={startTransition}
                    pendingAction={pendingAction}
                    setPendingAction={setPendingAction}
                    closeAfterSave={closeAfterSave}
                    editInvoice={editInvoice}
                    control={control}
                    isPending={isPending}
                    handleSubmit={handleSubmit}
                    onError={onError}
                  />
                </>
              ) : (
                <>
                  <Button
                    disabled={isPending}
                    variant="discard"
                    onClick={handleGoback}
                    className={"md:mr-auto"}
                  >
                    Discard
                  </Button>
                  <Button
                    pending={isPending && pendingAction === "draft"}
                    disabled={isPending}
                    variant="draft"
                    onClick={handleSaveDraft}
                  >
                    Save as Draft
                  </Button>
                  <Button
                    pending={isPending && pendingAction === "saveAndSend"}
                    disabled={isPending}
                    type="submit"
                    variant="saveAndSend"
                  >
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

function AddressFields({ prefix, register, errors, className = "" }) {
  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-3 gap-x-5.75 md:gap-x-6 gap-y-6.25 ${className}`}
    >
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
        className={"row-start-2 md:row-start-auto col-span-2 md:col-span-1"}
        error={errors?.[prefix]?.country?.message}
        {...register(`${prefix}.country`, {
          validate: validateRequired,
        })}
      />
    </div>
  );
}
export default InvoiceForm;
