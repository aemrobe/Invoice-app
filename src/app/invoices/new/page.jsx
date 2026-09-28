import InvoiceForm from "@/components/invoice/InvoiceForm";

export const metadata = {
  title: "Create new invoice",
};

function FullNewInvoicePage() {
  return <InvoiceForm className={"max-w-100"} />;
}

export default FullNewInvoicePage;
