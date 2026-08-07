import InvoiceCard from "@/components/invoice/InvoiceCard";
import invoices from "@/lib/data.json";

function InvoiceList() {
  return (
    <ul
      className="mt-8 grid justify-items-center grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-y-4 gap-x-2"
      role="list"
    >
      {invoices.map((invoice) => (
        <InvoiceCard key={invoice.id} invoice={invoice} />
      ))}
    </ul>
  );
}

export default InvoiceList;
