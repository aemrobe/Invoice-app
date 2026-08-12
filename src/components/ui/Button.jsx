const buttonVariants = {
  edit: "bg-action-secondary-bg enabled:hover:bg-action-secondary-hover text-action-secondary-text enabled:hover:text-action-secondary-text-hover pl-6 pr-5.75",
  delete:
    "bg-action-danger-bg enabled:hover:bg-action-danger-hover text-white pl-6 pr-6.25 ",
  primary:
    "bg-action-primary-bg enabled:hover:bg-action-primary-hover text-white pl-6.75 pr-7 ",
};

function Button({
  children,
  variant,
  className,
  onClick,
  type = "button",
  ...props
}) {
  const baseStyles = `focusable-ring heading-S2 pt-4.5 pb-3.75 text-center rounded-3xl transition-fast cursor-pointer disabled-button`;

  const selectedVariant = buttonVariants[variant] || buttonVariants.primary;

  return (
    <button
      type={type}
      className={`${baseStyles} ${selectedVariant} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
