"use client";

import { useRef, useState } from "react";
import { ANIMATION_DURATION_FILTER_MENU } from "@/lib/constants/durations";
import { ChevronIcon } from "@/components/icons";
import { useOutsideClicks } from "@/hooks/useOutsideClicks";

function CustomSelect({ label, name, options, defaultValue }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(() =>
    defaultValue
      ? options.find((opt) => opt.value === defaultValue)
      : options[0],
  );

  // Track the highlighted index for keyboard navigation
  const [activeIndex, setActiveIndex] = useState(-1);

  const [isKeyboardMode, setIsKeyboardMode] = useState(false);
  const customSelectBoxButtonRef = useRef(null);

  const closeDropDown = function () {
    setIsVisible(false);

    setTimeout(() => {
      setIsOpen(false);
      setIsKeyboardMode(false);
      setActiveIndex(-1); // Reset highlight when closed
    }, ANIMATION_DURATION_FILTER_MENU);
  };

  const closeOutsideClickRef = useOutsideClicks(() => {
    if (isOpen) closeDropDown();
  });

  const toggleDropdown = function () {
    if (isOpen) {
      closeDropDown();
    } else {
      setIsOpen(true);
      setIsVisible(true);

      // Default highlight to the currently selected option index when opening
      const currentIdx = options.findIndex(
        (opt) => opt.value === selectedOption.value,
      );
      setActiveIndex(currentIdx >= 0 ? currentIdx : 0);
    }
  };

  const handleSelect = function (option) {
    setSelectedOption(option);
    closeDropDown();
  };

  const handleKeyDown = function (e) {
    if (["ArrowDown", "ArrowUp", "Home", "End", "Enter", " "].includes(e.key)) {
      setIsKeyboardMode(true);
    }

    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        if (!isOpen) {
          toggleDropdown();
        } else if (activeIndex >= 0 && activeIndex < options.length) {
          const targetedOption = options[activeIndex];
          handleSelect(targetedOption);
        }

        break;
      case "ArrowDown":
        e.preventDefault();
        if (!isOpen) {
          toggleDropdown();
        } else {
          setActiveIndex((prev) =>
            prev < options.length - 1 ? prev + 1 : prev,
          );
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!isOpen) {
          toggleDropdown();
        } else {
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
        }
        break;
      case "Home":
        e.preventDefault();
        if (isOpen) setActiveIndex(0);
        break;
      case "End":
        e.preventDefault();
        if (isOpen) setActiveIndex(options.length - 1);
        break;
      case "Escape":
        // Let the dropdown close immediately if navigating away
        if (isOpen) {
          e.preventDefault();
          e.stopPropagation();
          closeDropDown();
          customSelectBoxButtonRef.current?.focus();
        }
        break;
      case "Tab":
        if (isOpen) {
          closeDropDown();
        }

        break;
      default:
        break;
    }
  };

  return (
    <div ref={closeOutsideClickRef} className="flex flex-col relative">
      <span
        id="label-select"
        className="leading-tight-s text-form-label capitalize mb-2.25"
      >
        {label}
      </span>

      <button
        className="border border-input-border  heading-S2 leading-none text-content-primary bg-input-background 
        cursor-pointer
        hover:border-input-border-active
        focus:outline-none focus-visible:border-input-border-active  transition-fast pt-4.5 pb-3.75 pl-5 pr-4 rounded-sm flex justify-between items-center"
        type="button"
        aria-haspopup="listbox"
        aria-controls="list-box-select"
        aria-expanded={isVisible}
        aria-labelledby={"label-select"}
        aria-activedescendant={
          isOpen && activeIndex >= 0 ? `option-${activeIndex}` : undefined
        }
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        ref={customSelectBoxButtonRef}
      >
        {selectedOption.label}
        <ChevronIcon
          orientation={"down"}
          className={`w-2.75 h-1.75 text-brand-primary transition-fast ${isVisible ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      {name && (
        <input type="hidden" name={name} value={selectedOption?.value ?? ""} />
      )}

      {isOpen && (
        <div
          onMouseMove={() => {
            if (isKeyboardMode) setIsKeyboardMode(false);
          }}
          className={`${isVisible ? "open" : "close"} z-10 absolute top-full inset-x-0 mt-6 rounded-lg bg-surface-overlay shadow-dropdown`}
        >
          <ul
            className="divide-y divide-control-border"
            id="list-box-select"
            role="listbox"
            aria-labelledby={"label-select"}
          >
            {options.map((option, index) => {
              const isHighlighted = index === activeIndex && isKeyboardMode;
              const isSelected = option.value === selectedOption.value;

              const highlightedOptionStyle =
                "outline outline-2 outline-content-interactive-hover";

              return (
                <li
                  key={option.value}
                  role="presentation"
                  className="py-1 cursor-pointer"
                >
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/role-supports-aria-props */}
                  <div
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      handleSelect(option);
                    }}
                    id={`option-${index}`}
                    className={`pt-3.25 rounded-lg pb-3.75 px-4 heading-S2 
                  ${isHighlighted ? highlightedOptionStyle : ""} ${isSelected ? "text-content-interactive-hover" : "text-select-option-text"}
                  hover:text-content-interactive-hover transition-fast `}
                  >
                    <span>{option.label}</span>
                    {isSelected && <span className="sr-only">, selected</span>}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CustomSelect;
