import StatusBadge from "@/components/invoice/StatusBadge";
import { formatCurrency, formatDate } from "../../lib/formatters";
import Link from "next/link";

function InvoiceCard({ invoice }) {
  const { id, clientName, paymentDue, total, status } = invoice;

  return (
    <li className="max-w-81.75 w-full">
      <Link
        href={`/${id}`}
        className="shadow-card focusable-ring px-6 pt-6.25 pb-5.5 bg-surface-primary rounded-lg  grid grid-cols-[auto_auto]   justify-between"
      >
        <h2 className="heading-S2 text-content-primary ">
          <span aria-hidden="true" className="text-slate-400">
            #
          </span>

          <span className="sr-only">Invoice </span>
          {id}
        </h2>

        <p className="text-invoice-owner  text-right">
          <span className="sr-only">Client:</span>
          {clientName}
        </p>

        <time
          dateTime={paymentDue}
          className="mb-2.25 mt-6 inline-block text-date-value"
        >
          <span className="text-date-label">Due</span> {formatDate(paymentDue)}
        </time>

        <p className="heading-S text-content-primary  row-start-3">
          <span className="sr-only">Amound Due: </span>
          <span> {formatCurrency(total)}</span>
        </p>

        <StatusBadge status={status} />
      </Link>
    </li>
  );
}

export default InvoiceCard;
