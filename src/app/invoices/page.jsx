import FilterComponent from "@/components/ui/FilterComponent";
import InvoiceList from "@/components/invoice/InvoiceList";
import PageHeading from "@/components/ui/PageHeading";
import CreateInvoiceBtn from "@/components/invoice/CreateInvoiceBtn";
import { getInvoices } from "../../lib/services/data-services";

export default async function Home({ searchParams }) {
  const invoices = await getInvoices();

  const resolvedSearchParams = await searchParams;

  const statusFilter = resolvedSearchParams?.status;

  const resolvedStatusFilter = statusFilter ? statusFilter.split(",") : "";

  let displayedInvoices = invoices;

  if (resolvedStatusFilter.length > 0) {
    displayedInvoices = invoices.filter((invoice) =>
      resolvedStatusFilter.includes(invoice.status),
    );
  }
  return (
    <div className="px-6 py-8">
      <div className="flex justify-between">
        <div>
          <PageHeading className={"heading-M text-content-primary mb-0.75"}>
            Invoices
          </PageHeading>
          <p className="text-content-tertiary text-center sm:text-left ">
            {displayedInvoices.length === 0
              ? "No invoices"
              : `${displayedInvoices.length} invoices`}
          </p>
        </div>

        <div className="flex  gap-[1.159rem] items-center ">
          <FilterComponent />
          <CreateInvoiceBtn />
        </div>
      </div>

      <InvoiceList invoices={displayedInvoices} />
    </div>
  );
}
