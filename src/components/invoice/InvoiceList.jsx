import InvoiceCard from "@/components/invoice/InvoiceCard";
import EmptyMessage from "@/components/ui/EmptyMessage";
import FocusManager from "@/components/ui/FocusManager";
import { getInvoices } from "@/lib/services/data-services";
import InvoiceListAnnouncment from "@/components/invoice/InvoiceListAnnouncment";

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
        <EmptyMessage buttonText={"New"} />
      ) : (
        <ul
          className="mt-8 grid justify-center grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(280px,auto))] gap-4"
          role="list"
        >
          {invoices.map((invoice) => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))}
        </ul>
      )}
    </>
  );
}

export default InvoiceList;
