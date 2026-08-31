"use client";

import { DayPicker, getDefaultClassNames } from "@daypicker/react";
import { useId, useRef, useState } from "react";
import { CalendarIcon, ChevronIcon } from "@/components/icons";
import { format } from "date-fns";
import { useOutsideClicks } from "@/hooks/useOutsideClicks";
import { ANIMATION_DURATION_FILTER_MENU } from "../../lib/constants/durations";

function MyDatePicker({ initialDate, name = "paymentDue" }) {
  const inputId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() =>
    initialDate ? new Date(initialDate) : new Date(),
  );
  const [visible, setVisible] = useState(false);
  const buttonRef = useRef(null);

  const closeDropdown = () => {
    setVisible(false);

    setTimeout(() => {
      setIsOpen(false);
    }, ANIMATION_DURATION_FILTER_MENU);
  };

  const closeDropdownAndRefocus = () => {
    closeDropdown();
    buttonRef.current?.focus();
  };

  const handleSelect = (date) => {
    if (!date) return;

    setSelectedDate(date);
    closeDropdownAndRefocus();
  };

  const handleKeyDown = function (e) {
    if (e.key === "Escape" && isOpen) {
      e.stopPropagation();
      closeDropdownAndRefocus();
    }
  };

  const handleDropDown = function () {
    if (isOpen) {
      closeDropdown();
    } else {
      setIsOpen(true);
      setVisible(true);
    }
  };

  const handleBlur = function (e) {
    if (!e.currentTarget.contains(e.relatedTarget) && isOpen) {
      closeDropdown();
    }
  };

  const dropdownRef = useOutsideClicks(() => {
    if (isOpen) closeDropdown();
  });

  const displayedDateValue = format(selectedDate, "dd MMM yyyy");
  const serverPayloadValue = format(selectedDate, "yyyy-MM-dd");
  const defaultClassNames = getDefaultClassNames();

  return (
    <div
      className="flex flex-col relative"
      onBlur={handleBlur}
      ref={dropdownRef}
    >
      <label
        htmlFor={inputId}
        className="leading-tight-s text-form-label capitalize mb-2.25"
      >
        Invoice Date
      </label>

      <button
        type="button"
        ref={buttonRef}
        aria-expanded={isOpen}
        aria-labelledby={inputId}
        aria-haspopup="dialog"
        onClick={handleDropDown}
        onKeyDown={handleKeyDown}
        className="border border-input-border  heading-S2 text-content-primary/55 bg-input-background 
        cursor-pointer
        hover:border-input-border-active
        focus:outline-none focus-visible:border-input-border-active  transition-fast pt-4.5 pb-3.75 pl-5 pr-4  rounded-sm flex justify-between"
      >
        {displayedDateValue}
        <CalendarIcon className={"w-4 text-slate-400"} />
      </button>

      <input type="hidden" name={name} value={serverPayloadValue} />

      {isOpen && (
        <div
          role="dialog"
          aria-label="Choose invoice date"
          className={`absolute top-full right-0 left-0 w-full max-w-75 mx-auto translate-y-2 ${visible ? "open" : "close"}`}
        >
          <DayPicker
            animate
            mode="single"
            navLayout="around"
            hideWeekdays
            showOutsideDays
            selected={selectedDate}
            onSelect={handleSelect}
            formatters={{
              formatCaption: (date) =>
                date.toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                }),
            }}
            components={{
              Chevron: ChevronIcon,
            }}
            classNames={{
              root: `${defaultClassNames.root} w-full max-w-[300px]  mx-auto  py-[25px]  px-[15px] bg-surface-overlay shadow-dropdown rounded-lg`,
              month_grid: `w-full table-fixed `,
              month_caption: `${defaultClassNames.month_caption}`,
              caption_label: `${defaultClassNames.caption_label} text-calendar-text heading-S2 leading-none`,
              button_previous: `${defaultClassNames.button_previous} rounded-md p-1 focusable-ring`,
              button_next: `${defaultClassNames.button_next} rounded-md p-1 focusable-ring`,
              day: `w-full h-auto aspect-square text-center heading-S2 `,
              day_button: `${defaultClassNames.day_button} text-calendar-text cursor-pointer hover:!text-calendar-day-hover focus-visible:!text-calendar-day-hover focus-visible:!ring-2 focus-visible:!ring-calendar-day-hover focus-visible:outline-none w-full h-full rounded-full `,
              selected:
                "!bg-transparent [&>button]:!bg-transparent [&>button]:!text-calendar-day-hover",
              outside: `text-calendar-day-outside pointer-events-none`,
              day_hidden: "hidden",
              empty: "hidden",
              chevron: `${defaultClassNames.chevron} w-[8.46px]  text-brand-primary`,
            }}
          />
        </div>
      )}
    </div>
  );
}

export default MyDatePicker;
