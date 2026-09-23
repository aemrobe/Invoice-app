function FormRow({
  placeholder = "",
  label,
  id,
  type = "text",
  className,
  labelClassName = "mb-2.25",

  onFocus,
  errorId = "",
  error,
  errorPosition = "top",
  ...props
}) {
  const resolvedErrorId = errorId || (id ? `${id}-error` : undefined);

  const handleFocus = (e) => {
    const length = e.target.value.length;

    e.target.setSelectionRange(length, length);

    // Call external onFocus prop if provided
    if (onFocus) onFocus(e);
  };

  const isTopError = error && errorPosition === "top";
  const isBottomError = error && errorPosition === "bottom";

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex justify-between">
        <label
          htmlFor={id}
          className={`leading-tight-s ${error ? "text-error" : "text-form-label"} capitalize ${labelClassName}`}
        >
          {label}
        </label>

        {isTopError && (
          <p
            id={resolvedErrorId}
            className="body-variant tracking-[-0.1px] text-error"
          >
            {error}
          </p>
        )}
      </div>

      <input
        type={type}
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? resolvedErrorId : undefined}
        className={`border ${error ? "border-error text-error" : "border-input-border focus-visible:border-input-border-active hover:border-input-border-active text-content-primary"} heading-S2  bg-input-background placeholder:text-input-placeholder 
        cursor-pointer focus:outline-none caret-brand-primary transition-fast pt-4.5 pb-3.75 pl-5 pr-4 rounded-sm`}
        placeholder={placeholder}
        onFocus={handleFocus}
        {...props}
      />

      {isBottomError && (
        <p
          id={resolvedErrorId}
          className="mt-1.25 body-variant tracking-[-0.1px] text-error"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default FormRow;
