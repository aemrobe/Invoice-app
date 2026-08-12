import { ArrowLeftIcon } from "@/components/icons";
import StatusBadge from "@/components/invoice/StatusBadge";
import { formatCurrency, formatDate } from "@/lib/formatters";
import Button from "@/components/ui/Button";
import Link from "next/link";
import invoices from "@/lib/data.json";

const EMPTY_FALLBACK = "—";
const EMPTYFALLBACKSTYLES = "text-content-primary heading-S leading-5";

export async function generateMetadata({ params }) {
  const { invoiceId } = await params;

  return {
    title: `Invoice #${invoiceId.toUpperCase()}`,
  };
}

async function Page({ params }) {
  const { invoiceId } = await params;

  const invoiceItem = invoices.find((invoice) => invoice.id === invoiceId);
  const {
    status = "draft",
    description = "",
    createdAt: invoiceDate = "",
    paymentDue = "",
    clientName = "",
    clientEmail = "",
    items = [],
    total = 0,
  } = invoiceItem;

  const senderAddress = invoiceItem?.senderAddress || {};
  const clientAddress = invoiceItem?.clientAddress || {};

  return (
    <>
      <div className="px-6 mt-8.25">
        <Link
          href="/"
          className="focusable-ring rounded-lg inline-flex items-center gap-x-[1.478rem] heading-S2"
          style={{ "--ring-offset": "8px" }}
        >
          <ArrowLeftIcon className={"w-[0.5287rem] text-brand-primary"} />
          <span className="translate-y-0.5 text-content-primary"> Go back</span>
        </Link>

        <div className="mt-7.75 shadow-card px-6 pt-6 pb-6.75 rounded-md bg-surface-primary flex justify-between items-center">
          <p className="text-status-label capitalize">Status</p>
          <StatusBadge status={status} />
        </div>

        <div className="bg-surface-primary shadow-card mt-4 pt-6.25 px-6 pb-6">
          <div className="mb-7.75">
            <div className="mb-7.5">
              <h1 className="uppercase mb-1 heading-S2 text-content-primary">
                <span className="text-slate-400">#</span>
                {invoiceId}
              </h1>

              <p
                className={`${description ? "text-content-muted" : EMPTYFALLBACKSTYLES}`}
              >
                {description || <EmptyFallback label={"description"} />}
              </p>
            </div>

            <address
              className={`not-italic ${senderAddress?.street ? "text-content-muted" : EMPTYFALLBACKSTYLES}`}
            >
              {senderAddress?.street ? (
                <>
                  <p>{senderAddress.street}</p>
                  <p>{senderAddress.city}</p>
                  <p>{senderAddress.postCode}</p>
                  <p>{senderAddress.country}</p>
                </>
              ) : (
                <p>
                  <EmptyFallback label={"Sender address"} />
                </p>
              )}
            </address>
          </div>

          <div className="flex gap-x-15.25 flex-wrap">
            <div className="flex flex-col gap-7.75">
              <div>
                <p className="text-content-muted leading-tight-s mb-3.25">
                  Invoice Date
                </p>
                <p className="text-content-primary  heading-S leading-5">
                  {invoiceDate ? formatDate(invoiceDate) : <EmptyFallback />}
                </p>
              </div>

              <div>
                <p className="text-content-muted leading-tight-s mb-3.25">
                  Payment Due
                </p>
                <p className="text-content-primary heading-S leading-5">
                  {paymentDue ? formatDate(paymentDue) : <EmptyFallback />}
                </p>
              </div>
            </div>

            <div>
              <p className="leading-tight-s text-content-muted mb-3.25">
                Bill To
              </p>
              <p className="heading-S leading-5 text-content-primary">
                {clientName || <EmptyFallback label="Client name" />}
              </p>

              <address
                className={`mt-1.75 not-italic ${clientAddress?.street ? "text-content-muted" : EMPTYFALLBACKSTYLES}`}
              >
                {clientAddress?.street ? (
                  <>
                    <p>{clientAddress.street}</p>
                    <p>{clientAddress.city}</p>
                    <p>{clientAddress.postCode}</p>
                    <p>{clientAddress.country}</p>
                  </>
                ) : (
                  <p>
                    <EmptyFallback label="Client address" />
                  </p>
                )}
              </address>
            </div>

            <div className="w-full mt-8">
              <p className="text-content-muted leading-tight-s mb-3.25">
                Sent to
              </p>
              <p className="heading-S leading-5 text-content-primary">
                {clientEmail || <EmptyFallback label={"Client email"} />}
              </p>
            </div>
          </div>

          <div className="mt-9.5">
            <ul className="bg-surface-secondary rounded-tl-lg rounded-tr-lg pt-6.25 pb-5.75 px-6 flex flex-col gap-6">
              {items?.length > 0 ? (
                items.map((item, i) => (
                  <li
                    key={`${item.name}-${i}`}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="heading-S2 text-content-primary mb-2">
                        {item.name}
                      </p>
                      <p className="text-content-variant  heading-S2">
                        {item.quantity} x {formatCurrency(item.price)}
                      </p>
                    </div>

                    <p className="heading-S2 text-content-primary">
                      {formatCurrency(item.total)}
                    </p>
                  </li>
                ))
              ) : (
                <li className="heading-S2 text-content-primary text-center">
                  No items listed
                </li>
              )}
            </ul>

            <div className="bg-surface-summary px-6 pt-6.5 pb-5.5 rounded-bl-lg rounded-br-lg flex justify-between items-center">
              <p className="text-content-inverse">Grand Total</p>

              <p className="text-content-inverse heading-M leading-8 tracking-[-0.031rem]">
                {formatCurrency(total)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface-primary shadow-card mt-14 pt-5.25 pb-5.5 px-6 flex justify-center  gap-2">
        <Button variant={"edit"}>Edit</Button>

        <Button variant={"delete"}>Delete</Button>

        <Button variant={"primary"}>Mark as Paid</Button>
      </div>
    </>
  );
}

function EmptyFallback({ label }) {
  const text = label ? `${label} not provided` : "Not provided";

  return (
    <>
      <span aria-hidden="true">{EMPTY_FALLBACK}</span>
      <span className="sr-only">{text}</span>
    </>
  );
}

export default Page;
