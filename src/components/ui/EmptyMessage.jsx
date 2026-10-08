import { EmptyInvoiceIllustration } from "@/components/illustrations";

function EmptyMessage() {
  return (
    <div className="mt-25.5 md:mt-52.25 flex flex-col items-center text-center">
      <EmptyInvoiceIllustration
        className={"w-full max-w-48.25 md:max-w-60.25"}
      />

      <h2 className="heading-M text-content-primary mb-5.75 mt-10.5 md:mt-16.75">
        There is nothing here
      </h2>

      <p className="text-content-tertiary max-w-46.25 md:max-w-48.25">
        Create an invoice by clicking the{" "}
        <span className="font-bold md:hidden">New</span>
        <span className="font-bold hidden md:inline-block">
          New Invoice
        </span>{" "}
        button and get started
      </p>
    </div>
  );
}

export default EmptyMessage;
