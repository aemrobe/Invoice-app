import { ArrowDownIcon, CheckMarkIcon, PlusIcon } from "../components/icons";

export default function Home() {
  return (
    <div className="px-6 py-8">
      <div className="flex justify-between">
        <div>
          <h1 className="heading-M text-content-primary mb-0.75">Invoices</h1>
          <p className="text-content-tertiary">7 invoices</p>
        </div>

        <div className="flex gap-[1.159rem] items-center">
          <div className=" relative">
            <button className="flex gap-3 items-center heading-S2 text-content-primary">
              Filter
              <ArrowDownIcon className={"w-2.75 h-1.75 text-brand-primary"} />
            </button>

            <div className="flex flex-col gap-3.75 shadow-dropdown absolute top-9 -left-10 mx-auto   bg-surface-overlay pt-6 pl-6 pb-6 w-48">
              {["draft", "pending", "paid"].map((status) => (
                <label
                  key={status}
                  htmlFor={status}
                  className="flex gap-3.25 items-center group cursor-pointer capitalize heading-S2"
                >
                  <input
                    type="checkbox"
                    id={status}
                    name="filter status"
                    className="peer sr-only"
                  />

                  <span className="flex items-center justify-center border border-control-border group-hover:border-brand-primary peer-checked:border-brand-primary peer-checked:bg-brand-primary peer-checked:[&>svg]:opacity-100  bg-control-bg rounded-xs w-4 h-4 shrink-0 transition-fast">
                    <CheckMarkIcon
                      className={
                        "text-white w-[7.45px] opacity-0 transition-fast"
                      }
                    />
                  </span>

                  <span className="inline-block leading-none translate-y-[1.5px]">
                    {status}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button className="bg-brand-primary  flex gap-2 items-center pt-1.5 pl-1.5 pb-1.5 pr-3.75 rounded-3xl heading-S2">
            <span className="bg-white w-8 h-8 rounded-full flex items-center justify-center shrink-0">
              <PlusIcon className={"w-2.5 h-2.5 text-brand-primary"} />
            </span>

            <span className="text-white">New</span>
          </button>
        </div>
      </div>
    </div>
  );
}
