import { getInvoices } from "../../lib/services/data-services";

async function InvoiceCounter({ filter }) {
  const { count: invoicesNumber } = await getInvoices({ filter });

  return (
    <p className="text-content-tertiary text-left">
      {invoicesNumber === 0 ? (
        "No invoices"
      ) : (
        <>
          <span className="md:hidden">{invoicesNumber} invoices</span>
          <span className="hidden md:inline-block">
            There are {invoicesNumber} total invoices
          </span>
        </>
      )}
    </p>
  );
}

export default InvoiceCounter;
