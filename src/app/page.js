import { PlusIcon } from "@/components/icons";
import FilterComponent from "@/components/ui/FilterComponent";
import { formatCurrency } from "@/lib/formatters";
import StatusBadge from "@/components/ui/StatusBadge";

export default function Home() {
  return (
    <div className="px-6 py-8">
      <div className="flex justify-between">
        <div>
          <h1 className="heading-M text-content-primary mb-0.75">Invoices</h1>
          <p className="text-content-tertiary">7 invoices</p>
        </div>

        <div className="flex gap-[1.159rem] items-center ">
          <FilterComponent />

          <button className="bg-brand-primary focusable-ring  flex gap-2 items-center pt-1.5 pl-1.5 pb-1.5 pr-3.75 rounded-3xl heading-S2">
            <span className="bg-white w-8 h-8 rounded-full flex items-center justify-center shrink-0">
              <PlusIcon className={"w-2.5 h-2.5 text-brand-primary"} />
            </span>

            <span className="text-white">New</span>
          </button>
        </div>
      </div>

      <ul className="mt-8" role="list">
        <li className="shadow-card px-6 pt-6.25 pb-5.5 bg-surface-primary rounded-lg">
          <article>
            <div className="flex justify-between mb-6">
              <h2 className="heading-S2 text-content-primary">
                <span aria-hidden="true" className="text-slate-400">
                  #
                </span>
                <span className="sr-only">Invoice </span>
                RT3080
              </h2>

              <p className="text-invoice-owner">Jensen Huang</p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <time
                  dateTime="2021-08-19"
                  className="mb-2.25 inline-block text-date-value"
                >
                  <span className="text-date-label">Due</span> 19 Aug 2021
                </time>

                <p className="heading-S text-content-primary">
                  {formatCurrency(1800.9)}
                </p>
              </div>

              <StatusBadge status="paid" />
            </div>
          </article>
        </li>
      </ul>
    </div>
  );
}
