import { formatCurrency } from "@/lib/utils/formatters";

function InvoiceItemsMobile({ items }) {
  return (
    <ul className="md:hidden bg-surface-secondary rounded-tl-lg rounded-tr-lg pt-6.25 pb-5.75 px-6 flex flex-col gap-6">
      {items?.length > 0 ? (
        items.map((item, i) => (
          <li
            key={`${item.name}-${i}`}
            className="flex items-center justify-between"
          >
            <div>
              <p className="heading-S2 text-content-primary mb-2">
                {item.name}
              </p>
              <p className="text-content-variant  heading-S2">
                {item.quantity} x {formatCurrency(item.price)}
              </p>
            </div>

            <p className="heading-S2 text-content-primary">
              {formatCurrency(item.total)}
            </p>
          </li>
        ))
      ) : (
        <li className="heading-S2 text-content-primary text-center">
          No items listed
        </li>
      )}
    </ul>
  );
}

export default InvoiceItemsMobile;
