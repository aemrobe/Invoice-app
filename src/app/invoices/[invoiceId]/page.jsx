import StatusBadge from "@/components/invoice/StatusBadge";
import { formatCurrency, formatDate } from "@/lib/utils/formatters";
import GoBackBtn from "@/components/ui/GoBackBtn";
import InvoiceActions from "@/components/invoice/InvoiceActions";
import InvoiceItemsMobile from "@/components/invoice/InvoiceItemsMobile";
import PageHeading from "@/components/ui/PageHeading";
import { getInvoice } from "@/lib/services/data-services";
import { notFound } from "next/navigation";
import EmptyFallback from "@/components/ui/EmptyFallback";
import InvoicesItemsTable from "@/components/invoice/InvoicesItemsTable";

const EMPTYFALLBACKSTYLES = "text-content-primary heading-S leading-5";

export async function generateMetadata({ params }) {
  const { invoiceId } = await params;

  return {
    title: `Invoice #${invoiceId.toUpperCase()}`,
  };
}

async function Page({ params }) {
  const { invoiceId } = await params;

  const invoice = await getInvoice(invoiceId);

  if (!invoice) {
    notFound();
  }

  const {
    status = "draft",
    description = "",
    createdAt: invoiceDate = "",
    paymentDue = "",
    clientName = "",
    clientEmail = "",
    items = [],
    total = 0,
  } = invoice;

  const senderAddress = invoice?.senderAddress || {};
  const clientAddress = invoice?.clientAddress || {};

  return (
    <div className="flex-1 flex flex-col justify-between md:max-w-3xl md:mx-auto md:w-full">
      <div className="px-6 md:px-10 mt-8.25 md:mt-12.25  max-w-112.5 md:max-w-none mx-auto md:mx-0">
        <GoBackBtn to={"/invoices"} />

        <div className="mt-7.75 shadow-card px-6 pt-6 pb-6.75 md:px-8 rounded-md bg-surface-primary flex justify-between md:justify-start items-center">
          <p className="text-status-label capitalize md:mr-5">Status</p>
          <StatusBadge status={status} />

          <div className="hidden md:ml-auto md:flex md:gap-x-2">
            <InvoiceActions invoice={invoice} />
          </div>
        </div>

        <div className="bg-surface-primary rounded-md shadow-card mt-4 md:mt-6 pt-6.25 px-6 pb-6 md:pt-8.25 md:px-8 md:pb-8">
          <div className="mb-7.75 md:mb-5.25 md:flex md:justify-between">
            <div className="mb-7.5 md:mt-px">
              <PageHeading className="uppercase mb-1 heading-S2 md:leading-6 text-content-primary">
                <span aria-hidden="true" className="text-slate-400">
                  #
                </span>
                <span className="sr-only">Invoice</span>
                {invoiceId}
              </PageHeading>

              <p
                className={`${description ? "text-content-muted" : EMPTYFALLBACKSTYLES}`}
              >
                {description || (
                  <EmptyFallback text={"description not provided"} />
                )}
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
                  <EmptyFallback text={"Sender address not provided"} />
                </p>
              )}
            </address>
          </div>

          <div className="flex gap-x-15.25 md:gap-x-29.5 flex-wrap">
            <div className="flex flex-col gap-7.75">
              <div>
                <p className="text-content-muted leading-tight-s mb-3.25">
                  Invoice Date
                </p>
                <p className="text-content-primary  heading-S leading-5">
                  {invoiceDate ? (
                    formatDate(invoiceDate)
                  ) : (
                    <EmptyFallback text={"Not Provided"} />
                  )}
                </p>
              </div>

              <div>
                <p className="text-content-muted leading-tight-s mb-3.25">
                  Payment Due
                </p>
                <p className="text-content-primary heading-S leading-5">
                  {paymentDue ? (
                    formatDate(paymentDue)
                  ) : (
                    <EmptyFallback text={"Not Provided"} />
                  )}
                </p>
              </div>
            </div>

            <div>
              <p className="leading-tight-s text-content-muted mb-3.25">
                Bill To
              </p>
              <p className="heading-S leading-5 text-content-primary">
                {clientName || (
                  <EmptyFallback text="Client name not provided" />
                )}
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
                    <EmptyFallback text="Client address not provided" />
                  </p>
                )}
              </address>
            </div>

            <div className="w-full md:w-auto mt-8 md:mt-0">
              <p className="text-content-muted leading-tight-s mb-3.25">
                Sent to
              </p>
              <p className="heading-S leading-5 text-content-primary">
                {clientEmail || (
                  <EmptyFallback text={"Client email not provided"} />
                )}
              </p>
            </div>
          </div>

          <div className="mt-9.5 md:mt-11.75">
            <InvoiceItemsMobile items={items} />
            <InvoicesItemsTable items={items} />

            <div className="bg-surface-summary px-6 pt-6.5 pb-5.5 md:px-8 md:pt-6.75 md:pb-5.25 rounded-bl-lg rounded-br-lg flex justify-between items-center">
              <p className="text-content-inverse md:hidden">Grand Total</p>
              <p className="text-content-inverse hidden md:block">Amount Due</p>
              <p className="text-content-inverse heading-M leading-8 tracking-[-0.031rem]">
                {formatCurrency(total)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface-primary shadow-card mt-14  pt-5.25 pb-5.5 px-6 flex md:hidden justify-center  gap-2">
        <InvoiceActions invoice={invoice} />
      </div>
    </div>
  );
}

export default Page;
