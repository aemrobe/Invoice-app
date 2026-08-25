"use client";

import GoBackBtn from "@/components/ui/GoBackBtn";
import FormRow from "@/components/ui/FormRow";
import MyDatePicker from "../ui/MyDatePicker";

function InvoiceForm({
  titleId,
  editInvoice = "",
  onCloseModal,
  restoreFocus,
}) {
  return (
    <div className="pt-6.25 pl-6 pr-4 h-full w-full overflow-y-auto custom-scrollbar">
      <GoBackBtn
        onClick={() => {
          onCloseModal();
          restoreFocus();
        }}
      />

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

      <FormSectionTitle className="mt-5.5 mb-6">Bill From </FormSectionTitle>

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

      <MyDatePicker />
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
