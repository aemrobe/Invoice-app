import { INVOICE_STATUS_CONFIG } from "@/lib/constants/invoice";

function StatusBadge({ status = "draft" }) {
  const config = INVOICE_STATUS_CONFIG[status] || INVOICE_STATUS_CONFIG.draft;

  return (
    <div
      className="heading-S2 sm:row-start-2 sm:row-span-2 self-end flex justify-center items-center gap-2 pt-3.5 pb-2.75 w-26 rounded-md"
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
  );
}

export default StatusBadge;
