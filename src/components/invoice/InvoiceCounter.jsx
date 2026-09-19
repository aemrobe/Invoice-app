import { getInvoices } from "../../lib/services/data-services";

async function InvoiceCounter({ filter }) {
  const { count: invoicesNumber } = await getInvoices({ filter });

  return (
    <p className="text-content-tertiary :text-left ">
      {invoicesNumber === 0 ? "No invoices" : `${invoicesNumber} invoices`}
    </p>
  );
}

export default InvoiceCounter;
