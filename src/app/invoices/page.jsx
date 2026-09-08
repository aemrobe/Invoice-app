import FilterComponent from "@/components/ui/FilterComponent";
import invoices from "@/lib/data.json";
import InvoiceList from "@/components/invoice/InvoiceList";
import PageHeading from "@/components/ui/PageHeading";
import CreateInvoiceBtn from "@/components/invoice/CreateInvoiceBtn";

export default function Home() {
  return (
    <div className="px-6 py-8">
      <div className="flex justify-between">
        <div>
          <PageHeading className={"heading-M text-content-primary mb-0.75"}>
            Invoices
          </PageHeading>
          <p className="text-content-tertiary text-center sm:text-left ">
            {invoices.length === 0
              ? "No invoices"
              : `${invoices.length} invoices`}
          </p>
        </div>

        <div className="flex  gap-[1.159rem] items-center ">
          <FilterComponent />
          <CreateInvoiceBtn />
        </div>
      </div>

      <InvoiceList />
    </div>
  );
}
