import Link from "next/link";
import SpinnerMini from "./SpinnerMini";
import SpinnerMiniContainer from "./SpinnerMiniContainer";

const PRIMARY_STYLES =
  "bg-action-primary-bg enabled:hover:bg-action-primary-hover text-white";
const SECONDARY_STYLES =
  "bg-action-secondary-bg enabled:hover:bg-action-secondary-hover text-action-secondary-text enabled:hover:text-action-secondary-text-hover";
const MUTED_SECONDARY_STYLES =
  "bg-action-secondary-bg enabled:hover:bg-action-secondary-hover text-content-tertiary enabled:hover:text-action-secondary-text-hover";
const TERTIARY_STYLES =
  "text-action-tertiary-text bg-action-tertiary-bg enabled:hover:bg-action-tertiary-bg-hover";
const DANGER_STYLES =
  "bg-action-danger-bg enabled:hover:bg-action-danger-hover text-white";

const buttonVariants = {
  edit: `${SECONDARY_STYLES} pl-6 pr-5.75`,
  cancel: `${SECONDARY_STYLES} px-[1.656rem]`,
  discard: `${SECONDARY_STYLES}  pl-4.5 pr-4.75`,
  cancelModal: `${MUTED_SECONDARY_STYLES} px-6`,
  delete: `${DANGER_STYLES} pl-6 pr-6.25`,
  primary: `${PRIMARY_STYLES} pl-6.75 pr-7`,
  save: `${PRIMARY_STYLES} pl-6 pr-[1.4375rem]`,
  saveAndSend: `${PRIMARY_STYLES} pl-4 pr-3.75`,
  draft: `${TERTIARY_STYLES}  pl-[1.006rem] pr-[0.868rem]`,
};

function Button({
  children,
  variant,
  className,
  onClick,
  href,
  scroll,
  disabled,
  pending = false,
  type = "button",
  ...props
}) {
  const baseStyles = `relative focusable-ring heading-S2 pt-4.5 pb-3.75 text-center rounded-3xl transition-fast cursor-pointer  disabled-button`;

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
      disabled={disabled || pending}
      {...props}
    >
      {pending && <SpinnerMiniContainer />}

      <span className={`${pending ? "opacity-0" : "opacity-100"}`}>
        {children}
      </span>
    </button>
  );
}

export default Button;
