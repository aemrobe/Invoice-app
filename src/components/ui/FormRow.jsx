function FormRow({
  placeholder = "",
  label,
  id,
  type = "text",
  className,
  labelClassName = "mb-2.25",
  name,
  defaultValue,
  onFocus,
  ...props
}) {
  const handleFocus = (e) => {
    const length = e.target.value.length;

    e.target.setSelectionRange(length, length);

    // Call external onFocus prop if provided
    if (onFocus) onFocus(e);
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <label
        htmlFor={id}
        className={`leading-tight-s text-form-label capitalize ${labelClassName}`}
      >
        {label}
      </label>

      <input
        type={type}
        id={id}
        className="border border-input-border  heading-S2 text-content-primary bg-input-background placeholder:text-input-placeholder 
        cursor-pointer
        hover:border-input-border-active
        focus:outline-none focus-visible:border-input-border-active caret-brand-primary transition-fast pt-4.5 pb-3.75 pl-5 pr-4 rounded-sm"
        placeholder={placeholder}
        name={name}
        onFocus={handleFocus}
        defaultValue={defaultValue}
        {...props}
      />
    </div>
  );
}

export default FormRow;
