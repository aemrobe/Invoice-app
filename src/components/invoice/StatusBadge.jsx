import { INVOICE_STATUS_CONFIG } from "@/lib/constants/invoice";
import { ChevronIcon } from "../icons";

function StatusBadge({ status = "draft", chevronIcon = false }) {
  const config = INVOICE_STATUS_CONFIG[status] || INVOICE_STATUS_CONFIG.draft;

  return (
    <div className="row-start-2 md:row-start-auto row-span-2 md:row-span-1 self-end md:self-stretch md:flex md:items-center md:gap-5">
      <div
        className="heading-S2 flex justify-center items-center gap-2 pt-3.5 pb-2.75 w-26 rounded-md"
        style={{
          backgroundColor: `color-mix(in srgb, ${config.colorVar} 5.71%, transparent)`,
          color: `${config.colorVar}`,
        }}
      >
        <span
          aria-hidden="true"
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: `${config.colorVar}`,
          }}
        ></span>

        <span className="sr-only">Status:</span>

        <span className="translate-y-[0.09375rem] capitalize">
          {config.label}
        </span>
      </div>

      {chevronIcon && (
        <ChevronIcon
          orientation={"right"}
          className={"text-brand-primary w-1.5 hidden md:inline-block"}
        />
      )}
    </div>
  );
}

export default StatusBadge;
