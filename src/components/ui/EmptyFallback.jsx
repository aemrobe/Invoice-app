import { EMPTY_FALLBACK } from "@/lib/constants/invoice";

function EmptyFallback({ text }) {
  return (
    <>
      <span aria-hidden="true">{EMPTY_FALLBACK}</span>
      <span className="sr-only">{text}</span>
    </>
  );
}

export default EmptyFallback;
