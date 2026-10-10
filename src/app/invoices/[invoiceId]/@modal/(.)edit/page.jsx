import InvoiceForm from "@/components/invoice/InvoiceForm";
import { getInvoice } from "@/lib/services/data-services";

async function InterceptedEditModal({ params }) {
  const { invoiceId } = await params;

  const invoiceDetails = await getInvoice(invoiceId);

  return (
    <InvoiceForm editInvoice={invoiceDetails} navigationMode="intercepted" />
  );
}

export default InterceptedEditModal;
