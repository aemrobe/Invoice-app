import InertWrappers from "../../components/invoice/InertWrappers";

function InvoiceLayout({ children, modal }) {
  return (
    <>
      <InertWrappers> {children}</InertWrappers>

      {modal}
    </>
  );
}

export default InvoiceLayout;
