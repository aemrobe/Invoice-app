import FilterComponent from "@/components/ui/FilterComponent";
import InvoiceList from "@/components/invoice/InvoiceList";
import PageHeading from "@/components/ui/PageHeading";
import CreateInvoiceBtn from "@/components/invoice/CreateInvoiceBtn";
import InvoiceCounter from "@/components/invoice/InvoiceCounter";
import Spinner from "@/components/ui/Spinner";
import { Suspense } from "react";

export default async function Home({ searchParams }) {
  const resolvedSearchParams = await searchParams;

  const statusParam = resolvedSearchParams?.status;
  const statusValues = statusParam ? statusParam.split(",") : [];

  const filter =
    statusValues.length > 0
      ? { field: "status", value: statusValues, method: "in" }
      : null;

  return (
    <div className={`px-6 py-8 md:py-15.25 md:px-12`}>
      <div className="flex justify-between">
        <div>
          <PageHeading
            className={
              "heading-M md:heading-L md:tracking-[-1.13px] text-content-primary mb-0.75 md:mb-1.5"
            }
          >
            Invoices
          </PageHeading>

          <Suspense
            fallback={
              <p className="text-content-tertiary">
                Loading <span className="loading-dots" />
              </p>
            }
            key={statusParam || "all"}
          >
            <InvoiceCounter filter={filter} />
          </Suspense>
        </div>

        <div className="flex  gap-[1.159rem] md:gap-[2.533rem] items-center ">
          <FilterComponent />
          <CreateInvoiceBtn />
        </div>
      </div>

      <Suspense
        fallback={<Spinner className={"w-[3.4rem] mx-auto mt-54"} />}
        key={statusParam || "all"}
      >
        <InvoiceList filter={filter} />
      </Suspense>
    </div>
  );
}
