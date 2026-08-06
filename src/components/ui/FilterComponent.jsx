"use client";

import { ArrowDownIcon, CheckMarkIcon } from "@/components/icons";
import { useState } from "react";

function FilterComponent() {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropDown = function () {
    setIsOpen((open) => !open);
  };

  return (
    <div className=" relative">
      <button
        className="flex gap-3 items-center heading-S2 text-content-primary focusable-ring rounded-md py-1 px-2 "
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls="filter-menu"
        onClick={handleDropDown}
      >
        Filter
        <ArrowDownIcon className={"w-2.75 h-1.75 text-brand-primary"} />
      </button>

      {isOpen && (
        <fieldset
          id="filter-menu"
          className="flex flex-col gap-3.75 shadow-dropdown absolute top-10 -left-10 mx-auto bg-surface-overlay pt-6 pl-6 pb-6 w-48 z-10"
        >
          <legend className="sr-only">Status</legend>

          {["draft", "pending", "paid"].map((status) => (
            <label
              key={status}
              htmlFor={status}
              className="flex gap-3.25 items-center group cursor-pointer capitalize heading-S2"
            >
              <input
                type="checkbox"
                id={status}
                name="filter status"
                className="peer sr-only"
              />

              <span className="flex items-center justify-center border border-control-border group-hover:border-brand-primary peer-checked:border-brand-primary peer-checked:bg-brand-primary peer-checked:[&>svg]:opacity-100 peer-focusable-ring  bg-control-bg rounded-xs w-4 h-4 shrink-0 transition-fast">
                <CheckMarkIcon
                  className={"text-white w-[7.45px] opacity-0 transition-fast"}
                />
              </span>

              <span className="inline-block leading-none translate-y-[1.5px]">
                {status}
              </span>
            </label>
          ))}
        </fieldset>
      )}
    </div>
  );
}

export default FilterComponent;
