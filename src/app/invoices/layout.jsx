import InertWrappers from "@/components/invoice/InertWrappers";

export default function Layout({ children, modal }) {
  return (
    <>
      <InertWrappers>{children}</InertWrappers>
      {modal}
    </>
  );
}
