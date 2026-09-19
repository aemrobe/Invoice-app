import Spinner from "@/components/ui/Spinner";

function FullScreenSpinner() {
  return (
    <div
      className={`fixed bg-surface-overlay/60 backdrop-blur-xs inset-0 z-100 flex justify-center items-center transition-fast `}
    >
      <Spinner className={"w-[3.4rem]"} />
    </div>
  );
}

export default FullScreenSpinner;
