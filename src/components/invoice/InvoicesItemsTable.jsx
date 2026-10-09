import { formatCurrency } from "../../lib/utils/formatters";
import EmptyFallback from "../ui/EmptyFallback";

function InvoicesItemsTable({ items }) {
  const hasItems = items?.length > 0;

  return (
    <div className="hidden md:block bg-surface-secondary rounded-tl-lg rounded-tr-lg pt-8.25 px-8 pb-9.75">
      {hasItems ? (
        <table className="w-full text-left">
          <thead>
            <tr className="mb-8 grid grid-cols-[1fr_1.625rem_3.5rem_3.5rem] gap-x-15 text-content-muted">
              <th>Item Name</th>
              <th className="text-center">
                <span aria-hidden="true">QTY.</span>
                <span className="sr-only">Quantity</span>
              </th>
              <th className="text-right">Price</th>
              <th className="text-right">Total</th>
            </tr>
          </thead>

          <tbody className="flex flex-col gap-y-8">
            {items?.map((item, index) => {
              const quantity = Number(item.quantity) || 0;
              const price = Number(item.price) || 0;
              const itemTotal = item.total ?? quantity * price;

              return (
                <tr
                  key={`${item.name}-${index}`}
                  className="grid grid-cols-[1fr_1.625rem_3.5rem_3.5rem] text-content-primary heading-S2 gap-x-15"
                >
                  <td className="truncate">
                    {item.name?.trim() ? (
                      item.name
                    ) : (
                      <span>
                        <EmptyFallback text={"Unnamed item"} />
                      </span>
                    )}
                  </td>
                  <td className="text-content-muted text-center whitespace-nowrap">
                    {quantity}
                  </td>
                  <td className="text-content-muted whitespace-nowrap text-right">
                    {formatCurrency(price)}
                  </td>
                  <td className="whitespace-nowrap text-right">
                    {formatCurrency(itemTotal)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className="heading-S2 text-content-muted text-center">
          No items listed
        </p>
      )}
    </div>
  );
}

export default InvoicesItemsTable;
