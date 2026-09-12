import Link from "next/link";

const PRIMARY_STYLES =
  "bg-action-primary-bg hover:bg-action-primary-hover text-white";
const SECONDARY_STYLES =
  "bg-action-secondary-bg hover:bg-action-secondary-hover text-action-secondary-text hover:text-action-secondary-text-hover";
const MUTED_SECONDARY_STYLES =
  "bg-action-secondary-bg hover:bg-action-secondary-hover text-content-tertiary hover:text-action-secondary-text-hover";
const DANGER_STYLES =
  "bg-action-danger-bg hover:bg-action-danger-hover text-white";

const buttonVariants = {
  edit: `${SECONDARY_STYLES} pl-6 pr-5.75`,
  cancel: `${SECONDARY_STYLES} px-[1.656rem]`,
  cancelModal: `${MUTED_SECONDARY_STYLES} px-6`,
  delete: `${DANGER_STYLES} pl-6 pr-6.25`,
  primary: `${PRIMARY_STYLES} pl-6.75 pr-7`,
  save: `${PRIMARY_STYLES} pl-6 pr-[1.4375rem]`,
};

function Button({
  children,
  variant,
  className,
  onClick,
  href,
  scroll,
  type = "button",
  ...props
}) {
  const baseStyles = `focusable-ring heading-S2 pt-4.5 pb-3.75 text-center rounded-3xl transition-fast cursor-pointer  disabled-button`;

  const selectedVariant = buttonVariants[variant] || buttonVariants.primary;
  const combinedClasses = `${baseStyles} ${selectedVariant} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        scroll={scroll}
        className={combinedClasses}
        onClick={onClick}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
