"use client";

import { CheckMarkIcon, ChevronIcon } from "@/components/icons";
import { useEffect, useRef, useState, useTransition } from "react";
import { ANIMATION_DURATION_FILTER_MENU } from "@/lib/constants/durations";
import { useOutsideClicks } from "@/hooks/useOutsideClicks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const DEFAULT_OPTIONS = [
  { label: "Draft", value: "draft" },
  { label: "Pending", value: "pending" },
  { label: "Paid", value: "paid" },
];

function FilterComponent({ options = DEFAULT_OPTIONS }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [__, startTransition] = useTransition();

  const currentStatusParams = searchParams.get("status");
  const urlFilters = currentStatusParams ? currentStatusParams.split(",") : [];

  const [prevStatusParam, setPreviousStatusParam] =
    useState(currentStatusParams);
  const [activeFilters, setActiveFilters] = useState(urlFilters);

  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const buttonRef = useRef(null);

  if (prevStatusParam !== currentStatusParams) {
    setPreviousStatusParam(currentStatusParams);
    setActiveFilters(urlFilters);
  }

  const closeDropdown = () => {
    setVisible(false);
    buttonRef.current?.focus();

    setTimeout(() => {
      setIsOpen(false);
    }, ANIMATION_DURATION_FILTER_MENU);
  };

  const handleDropDown = function () {
    if (isOpen) {
      closeDropdown();
    } else {
      setIsOpen(true);
      setVisible(true);
    }
  };

  const handleFilter = function (filter) {
    const updateFilters = activeFilters.includes(filter)
      ? activeFilters.filter((act) => act !== filter)
      : [...activeFilters, filter];

    setActiveFilters(updateFilters);

    startTransition(() => {
      const params = new URLSearchParams(searchParams);

      if (updateFilters.length > 0) {
        params.set("status", updateFilters.join(","));
      } else {
        params.delete("status");
      }

      router.replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    });
  };

  const handleKeyDown = function (e) {
    if (e.key === "Escape" && isOpen) {
      closeDropdown();
    }
  };

  const dropdownRef = useOutsideClicks(() => {
    if (isOpen) closeDropdown();
  });

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        ref={buttonRef}
        className="flex gap-3 items-center heading-S2 text-content-primary focusable-ring rounded-md py-1 px-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls="filter-menu"
        onClick={handleDropDown}
        onKeyDown={handleKeyDown}
      >
        Filter
        <ChevronIcon
          orientation={"down"}
          className={`w-2.75 h-1.75 text-brand-primary transition-fast ${visible ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      {isOpen && (
        <fieldset
          id="filter-menu"
          onKeyDown={handleKeyDown}
          className={`flex flex-col  w-[calc(100vw-1rem)] max-w-48 rounded-lg gap-3.75 shadow-dropdown absolute top-10 left-1/2 -translate-x-1/2   mx-auto bg-surface-overlay pt-6 pl-6 pb-6  z-10 ${visible ? "open" : "close"}`}
        >
          <legend className="sr-only">Status</legend>

          {options.map((option) => {
            const label = typeof option === "string" ? option : option.label;
            const value = typeof option === "string" ? option : option.value;
            const isChecked = activeFilters.includes(value);

            return (
              <label
                key={value}
                htmlFor={value}
                className="flex gap-3.25 items-center group cursor-pointer capitalize heading-S2"
              >
                <input
                  type="checkbox"
                  id={value}
                  checked={isChecked}
                  onChange={() => handleFilter(value)}
                  name="filter status"
                  className="peer sr-only"
                />

                <span className="flex items-center justify-center border border-control-border group-hover:border-brand-primary peer-checked:border-brand-primary peer-checked:bg-brand-primary peer-checked:[&>svg]:opacity-100 peer-focusable-ring  bg-control-bg rounded-xs w-4 h-4 shrink-0 transition-fast">
                  <CheckMarkIcon
                    className={
                      "text-white w-[7.45px] opacity-0 transition-fast"
                    }
                  />
                </span>

                <span className="inline-block leading-none translate-y-[1.5px]">
                  {label}
                </span>
              </label>
            );
          })}
        </fieldset>
      )}
    </div>
  );
}

export default FilterComponent;
