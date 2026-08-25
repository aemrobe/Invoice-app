function FormRow({
  id,
  placeholder = "",
  label,
  type = "text",
  className,
  name,
  ...props
}) {
  return (
    <div className={`flex flex-col  ${className}`}>
      <label
        htmlFor={id}
        className="leading-tight-s text-form-label capitalize mb-2.25"
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
        {...props}
      />
    </div>
  );
}

export default FormRow;
