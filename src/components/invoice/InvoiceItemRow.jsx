"use client";

import { useWatch } from "react-hook-form";
import { FIELD_REQUIRED_MESSAGE } from "../../lib/constants/invoice";
import { DeleteIcon } from "../icons";
import FormRow from "../ui/FormRow";
import FormSection from "../ui/FormSection";
import { useState } from "react";

function InvoiceItemRow({ index, register, control, errors, remove }) {
  const name = useWatch({
    control,
    name: `items.${index}.name`,
  });

  const quantity = useWatch({
    control,
    name: `items.${index}.quantity`,
  });

  const price = useWatch({
    control,
    name: `items.${index}.price`,
  });

  const [isVisible, setIsVisible] = useState(false);

  const expandTotalNumber = () => setIsVisible(true);
  const collapseTotalNumber = () => setIsVisible(false);

  const total = ((Number(quantity) || 0) * (Number(price) || 0)).toFixed(2);

  const showTotalPriceStyle =
    "absolute z-50 bg-surface-modal px-2 py-1 shadow-md hover:border-slate-400 dark:hover:border-slate-600 whitespace-nowrap    top-6 left-0 md:-top-1 md:-left-2";

  return (
    <FormSection
      className="mb-0"
      legendClassName="sr-only"
      title={`Item ${index + 1}`}
    >
      <div className="flex flex-wrap gap-y-6.25 gap-x-4 md:grid md:grid-cols-[1fr_46px_100px_minmax(43px,100px)_36px]  md:gap-y-0">
        <FormRow
          id={`name-${index}-id`}
          label={"Item Name"}
          error={errors.items?.[index]?.name?.message}
          className={"w-full"}
          errorPosition="top md:bottom"
          labelClassName={"md:sr-only  mb-3.75"}
          {...register(`items.${index}.name`, {
            required: FIELD_REQUIRED_MESSAGE,
          })}
        />

        <FormRow
          id={`quantity-${index}-id`}
          label={"Qty."}
          error={errors.items?.[index]?.quantity?.message}
          errorPosition="bottom"
          className={"w-16 md:w-auto"}
          labelClassName={"md:sr-only mb-2.25"}
          {...register(`items.${index}.quantity`, {
            required: FIELD_REQUIRED_MESSAGE,
            validate: (value) => value > 0 || "must be > 0",
          })}
        />

        <FormRow
          id={`price-${index}-id`}
          label={"price"}
          error={errors.items?.[index]?.price?.message}
          errorPosition="bottom"
          className={"w-25 md:w-auto"}
          labelClassName={"md:sr-only mb-2.25"}
          {...register(`items.${index}.price`, {
            required: FIELD_REQUIRED_MESSAGE,
            validate: (value) => value > 0 || "must be > 0",
          })}
        />

        <div className="flex flex-col relative">
          <span className="leading-tight-s text-form-label capitalize mb-2.25 md:sr-only">
            Total
          </span>

          <output
            tabIndex={"0"}
            className={`heading-S2 border border-transparent rounded outline-none text-slate-300 pt-4.5 pb-3.75 transition-fast ${isVisible ? `${showTotalPriceStyle}` : "truncate"}`}
            onMouseOver={expandTotalNumber}
            onMouseOut={collapseTotalNumber}
            onFocus={expandTotalNumber}
            onBlur={collapseTotalNumber}
          >
            <span className="sr-only">Total:</span>
            {total}
          </output>
        </div>

        <div className="ml-auto md:ml-0 flex flex-col items-center md:justify-center">
          <span
            aria-hidden="true"
            className="leading-tight-s text-form-label capitalize  mb-2.25 md:hidden invisible  select-none"
          >
            D
          </span>

          <div className=" pt-4.5 pb-1.75 md:p-0 md:flex md:items-center">
            <button
              type="button"
              className="focusable-ring rounded-xs"
              style={{
                "--ring-offset": "6px",
              }}
              onClick={remove}
            >
              <span className="sr-only">Delete {name}</span>
              <DeleteIcon className={"text-slate-300 w-3.25"} />
            </button>
          </div>
        </div>
      </div>
    </FormSection>
  );
}

export default InvoiceItemRow;
