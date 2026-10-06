import InvoiceForm from "@/components/invoice/InvoiceForm";

function InterceptedNewModal() {
  return <InvoiceForm className={"max-w-100"} navigationMode="intercepted" />;
}

export default InterceptedNewModal;
