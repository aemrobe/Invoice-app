import SpinnerMini from "./SpinnerMini";

function SpinnerMiniContainer() {
  return (
    <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <SpinnerMini />
    </span>
  );
}

export default SpinnerMiniContainer;
