import InvoiceCard from "@/components/invoice/InvoiceCard";
import EmptyMessage from "@/components/ui/EmptyMessage";
import invoices from "@/lib/data.json";

function InvoiceList() {
  return invoices?.length === 0 ? (
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
  );
}

export default InvoiceList;
