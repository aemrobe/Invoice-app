import InvoiceForm from "@/components/invoice/InvoiceForm";
import InvoiceData from "@/lib/data.json";

export async function generateMetadata({ params }) {
  const { invoiceId } = await params;

  return {
    title: `Edit Invoice #${invoiceId.toUpperCase()}`,
  };
}

async function FullEditPage({ params }) {
  const { invoiceId } = await params;

  const invoiceDetails = InvoiceData.find(
    (invoice) => invoice.id === invoiceId,
  );

  return <InvoiceForm editInvoice={invoiceDetails} />;
}

export default FullEditPage;
