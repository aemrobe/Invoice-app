import invoiceData from "@/lib/data.json";
import { notFound } from "next/navigation";
import InvoiceForm from "@/components/invoice/InvoiceForm";

async function InterceptedEditModal({ params }) {
  const { invoiceId } = await params;

  const invoice = invoiceData.find((item) => item.id === invoiceId);

  if (!invoice) {
    notFound();
  }

  return <InvoiceForm editInvoice={invoice} className={"max-w-100"} />;
}

export default InterceptedEditModal;
