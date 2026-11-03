import InvoiceCard from "@/components/invoice/InvoiceCard";
import EmptyMessage from "@/components/ui/EmptyMessage";
import FocusManager from "@/components/ui/FocusManager";
import { getInvoices } from "@/lib/services/data-services";
import InvoiceListAnnouncment from "@/components/invoice/InvoiceListAnnouncment";
import InvoiceCSVExport from "@/components/invoice/InvoiceCSVExport";

async function InvoiceList({ filter }) {
  const { invoices, count } = await getInvoices({ filter });

  const rawValues = filter?.value;
  const activeFilters = Array.isArray(rawValues)
    ? rawValues.join(", ")
    : rawValues || "";

  return (
    <>
      <FocusManager />

      <InvoiceListAnnouncment count={count} activeFilters={activeFilters} />

      {count === 0 ? (
        <EmptyMessage />
      ) : (
        <>
          <ul className="mt-8 md:mt-13.75 lg:mt-16 grid justify-center grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(280px,auto))] md:grid-cols-1 gap-4">
            {invoices.map((invoice) => (
              <InvoiceCard key={invoice.id} invoice={invoice} />
            ))}
          </ul>

          <div className="mt-8 md:mt-10 flex justify-end">
            <InvoiceCSVExport invoices={invoices} />
          </div>
        </>
      )}
    </>
  );
}

export default InvoiceList;
