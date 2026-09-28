import { BiLoaderAlt } from "react-icons/bi";

function SpinnerMini({ className = "text-xl" }) {
  return (
    <span role="status">
      <BiLoaderAlt className={`animate-spin text-current ${className}`} />
      <span className="sr-only"> Loading</span>
    </span>
  );
}

export default SpinnerMini;
