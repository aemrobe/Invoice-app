"use client";

import { useWatch } from "react-hook-form";
import { FIELD_REQUIRED_MESSAGE } from "../../lib/constants/invoice";
import { DeleteIcon } from "../icons";
import FormRow from "../ui/FormRow";
import FormSection from "../ui/FormSection";

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

  const total = ((Number(quantity) || 0) * (Number(price) || 0)).toFixed(2);

  return (
    <FormSection
      className="mb-0"
      legendClassName="sr-only"
      title={`Item ${index + 1}`}
    >
      <div className="flex flex-wrap gap-y-6.25 gap-x-4">
        <FormRow
          id={`name-${index}-id`}
          label={"Item Name"}
          error={errors.items?.[index]?.name?.message}
          className={"w-full"}
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
          className={"w-16"}
          labelClassName={"md:sr-only mb-2.25"}
          {...register(`items.${index}.quantity`, {
            required: FIELD_REQUIRED_MESSAGE,
            min: {
              value: 1,
              message: "must be at least 1",
            },
          })}
        />

        <FormRow
          id={`price-${index}-id`}
          label={"price"}
          error={errors.items?.[index]?.price?.message}
          errorPosition="bottom"
          className={"w-25"}
          labelClassName={"md:sr-only mb-2.25"}
          {...register(`items.${index}.price`, {
            required: FIELD_REQUIRED_MESSAGE,
            validate: (value) => value > 0 || "must be > 0",
          })}
        />

        <div className="flex flex-col">
          <span className="leading-tight-s text-form-label capitalize mb-2.25 md:sr-only">
            Total
          </span>

          <span className="heading-S2 text-slate-300 pt-4.5 pb-3.75 ">
            {total}
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
