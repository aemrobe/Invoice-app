import { ArrowLeftIcon } from "@/components/icons";
import StatusBadge from "../../components/invoice/StatusBadge";

async function Page({ params }) {
  const { invoiceId } = await params;

  return (
    <div className="mt-8.25 px-6">
      <button className="flex items-center gap-x-[1.478rem] heading-S2">
        <ArrowLeftIcon className={"w-[0.5287rem] text-brand-primary"} />
        <span className="translate-y-0.5 text-content-primary"> Go back</span>
      </button>

      <div className="mt-7.75 px-6 pt-6 pb-6.75 rounded-md bg-surface-primary flex justify-between items-center">
        <p className="text-status-label capitalize">Status</p>
        <StatusBadge status="pending" />
      </div>

      <div>
        <div className="bg-surface-primary mt-4 mb-6 pt-6.25 px-6 pb-6">
          <h1 className="uppercase heading-S2 text-content-primary">
            <span className="text-slate-400">#</span>
            xm9141
          </h1>

          <p>Graphic Design</p>
        </div>

        <address className="not-italic">
          <p>19 Union Terrace</p>
          <p>London</p>
          <p>E1 3EZ</p>
          <p>United Kingdom</p>
        </address>
      </div>

      <div>
        <div>
          <div>
            <p>Invoice Date</p>
            <p>21 Aug 2021</p>
          </div>

          <div>
            <p>Payment Due</p>
            <p>20 Sep 2021</p>
          </div>
        </div>

        <div>
          <p>Bill To</p>
          <p>Alex Grim</p>

          <address className="not-italic">
            <p>84 Church Way</p>
            <p>Bradford</p>
            <p>BD19PB</p>
            <p>United Kingdom</p>
          </address>
        </div>

        <div>
          <p>Sent to</p>
          <p>alexgrim@mail.com</p>
        </div>
      </div>
    </div>
  );
}

export default Page;
