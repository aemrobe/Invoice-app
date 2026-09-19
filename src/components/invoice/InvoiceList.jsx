import InvoiceCard from "@/components/invoice/InvoiceCard";
import EmptyMessage from "@/components/ui/EmptyMessage";
import FocusManager from "@/components/ui/FocusManager";
import { getInvoices } from "@/lib/services/data-services";

async function InvoiceList({ filter }) {
  const { invoices } = await getInvoices({ filter });

  return (
    <>
      <FocusManager />

      {invoices?.length === 0 ? (
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
