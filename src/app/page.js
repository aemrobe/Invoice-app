import { PlusIcon } from "../components/icons";
import FilterComponent from "../components/ui/FilterComponent";

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
    </div>
  );
}
