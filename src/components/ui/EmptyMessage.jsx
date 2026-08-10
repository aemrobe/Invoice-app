import { EmptyInvoiceIllustration } from "@/components/illustrations";

function EmptyMessage({ buttonText = "New" }) {
  return (
    <div className="mt-25.5 flex flex-col items-center text-center">
      <EmptyInvoiceIllustration className={"w-full max-w-48.25"} />

      <h2 className="heading-M text-content-primary mb-5.75 mt-10.5">
        There is nothing here
      </h2>

      <p className="text-content-tertiary max-w-46.25">
        Create an invoice by clicking the{" "}
        <span className="font-bold">{buttonText}</span> button and get started
      </p>
    </div>
  );
}

export default EmptyMessage;
