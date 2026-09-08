function FormSection({
  title,
  children,
  className = "mb-10.25",
  legendClassName = "",
}) {
  return (
    <fieldset className={className}>
      {title && <legend className={legendClassName}>{title}</legend>}
      {children}
    </fieldset>
  );
}

export default FormSection;
