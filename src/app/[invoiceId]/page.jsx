import { ArrowLeftIcon } from "@/components/icons";
import StatusBadge from "../../components/invoice/StatusBadge";
import { formatCurrency } from "../../lib/formatters";

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

      <div className="bg-surface-primary mt-4 pt-6.25 px-6 pb-6">
        <div className="mb-7.75">
          <div className="mb-7.5">
            <h1 className="uppercase mb-1 heading-S2 text-content-primary">
              <span className="text-slate-400">#</span>
              xm9141
            </h1>

            <p className="text-content-muted">Graphic Design</p>
          </div>

          <address className="not-italic text-content-muted">
            <p>19 Union Terrace</p>
            <p>London</p>
            <p>E1 3EZ</p>
            <p>United Kingdom</p>
          </address>
        </div>

        <div className="flex gap-x-15.25 flex-wrap">
          <div className="flex flex-col gap-7.75">
            <div>
              <p className="text-content-muted leading-tight-s mb-3.25">
                Invoice Date
              </p>
              <p className="text-content-primary  heading-S leading-5">
                21 Aug 2021
              </p>
            </div>

            <div>
              <p className="text-content-muted leading-tight-s mb-3.25">
                Payment Due
              </p>
              <p className="text-content-primary heading-S leading-5">
                20 Sep 2021
              </p>
            </div>
          </div>

          <div>
            <p className="leading-tight-s text-content-muted mb-3.25">
              Bill To
            </p>
            <p className="heading-S leading-5 text-content-primary">
              Alex Grim
            </p>

            <address className="not-italic mt-1.75 text-content-muted">
              <p>84 Church Way</p>
              <p>Bradford</p>
              <p>BD19PB</p>
              <p>United Kingdom</p>
            </address>
          </div>

          <div className="w-full mt-8">
            <p className="text-content-muted leading-tight-s mb-3.25">
              Sent to
            </p>
            <p className="heading-S leading-5 text-content-primary">
              alexgrim@mail.com
            </p>
          </div>
        </div>

        <div className="mt-9.5">
          <ul className="bg-surface-secondary rounded-tl-lg rounded-tr-lg pt-6.25 pb-5.75 px-6 flex flex-col gap-6">
            <li className="flex items-center justify-between">
              <div>
                <p className="heading-S2 text-content-primary mb-2">
                  Banner Design
                </p>
                <p className="text-content-variant  heading-S2">
                  1 x {formatCurrency(156)}
                </p>
              </div>

              <p className="heading-S2 text-content-primary">
                {formatCurrency(156)}
              </p>
            </li>

            <li className="flex items-center justify-between">
              <div>
                <p className="heading-S2 text-content-primary mb-2">
                  Email Design
                </p>
                <p className="text-content-variant  heading-S2">
                  2 x {formatCurrency(200)}
                </p>
              </div>

              <p className="heading-S2 text-content-primary">
                {formatCurrency(400)}
              </p>
            </li>
          </ul>

          <div className="bg-surface-summary px-6 pt-6.5 pb-5.5 rounded-bl-lg rounded-br-lg flex justify-between items-center">
            <p className="text-content-inverse">Grand Total</p>

            <p className="text-content-inverse heading-M leading-8 tracking-[-0.031rem]">
              {formatCurrency(556)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-surface-primary mt-14 pt-5.25 pb-5.5 px-6"></div>
    </div>
  );
}

export default Page;
