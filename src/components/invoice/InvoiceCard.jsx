"use client";

import StatusBadge from "@/components/invoice/StatusBadge";
import { formatCurrency, formatDate } from "@/lib/utils/formatters";
import Link from "next/link";
import EmptyFallback from "../ui/EmptyFallback";
function InvoiceCard({ invoice }) {
  const { id, clientName, paymentDue, total, status } = invoice;

  const handlerCardClick = () => {
    sessionStorage.setItem("focusedInvoiceId", id);
  };

  return (
    <li className="max-w-81.75 w-full md:max-w-none">
      <Link
        id={id}
        href={`/invoices/${id}`}
        onClick={handlerCardClick}
        className="shadow-card focusable-ring px-6 pt-6.25 pb-5.5 md:py-4 lg:pl-8 bg-surface-primary rounded-lg  grid grid-cols-[auto_auto] md:grid-cols-[6rem_1fr_1fr_1fr_auto]  justify-between md:items-center md:justify-stretch md:gap-2"
      >
        <h2 className="heading-S2 text-content-primary ">
          <span aria-hidden="true" className="text-slate-400">
            #
          </span>

          <span className="sr-only">Invoice </span>
          {id}
        </h2>

        <p
          className={`text-invoice-owner text-right truncate md:col-start-3 md:text-left`}
        >
          <span className="sr-only">Client:</span>
          {clientName ? (
            clientName
          ) : (
            <EmptyFallback text={"No client specified"} />
          )}
        </p>

        <time
          dateTime={paymentDue}
          className="mb-2.25 mt-6 md:m-0 md:col-start-2 md:row-start-1    inline-block text-date-value"
        >
          <span className="text-date-label">Due</span> {formatDate(paymentDue)}
        </time>

        <p className="heading-S text-content-primary  row-start-3 md:row-start-auto">
          <span className="sr-only">Amound Due: </span>
          <span> {formatCurrency(total)}</span>
        </p>

        <StatusBadge status={status} chevronIcon={true} />
      </Link>
    </li>
  );
}

export default InvoiceCard;
