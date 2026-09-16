import InvoiceForm from "@/components/invoice/InvoiceForm";
import { getInvoice } from "../../../../lib/services/data-services";

export async function generateMetadata({ params }) {
  const { invoiceId } = await params;

  return {
    title: `Edit Invoice #${invoiceId.toUpperCase()}`,
  };
}

async function FullEditPage({ params }) {
  const { invoiceId } = await params;

  const invoiceDetails = await getInvoice(invoiceId);

  return <InvoiceForm editInvoice={invoiceDetails} className={"max-w-100"} />;
}

export default FullEditPage;
