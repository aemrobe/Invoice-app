"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon, ChevronIcon } from "../icons";

function GoBackBtn({ to, onClick }) {
  const router = useRouter();

  function handleClick() {
    if (onClick) {
      onClick();
      return;
    }

    if (to) {
      router.push(to);
      return;
    }

    router.back();
  }

  return (
    <button
      onClick={handleClick}
      className="focusable-ring rounded-lg inline-flex items-center gap-x-[1.478rem] heading-S2"
      style={{ "--ring-offset": "8px" }}
    >
      <ChevronIcon
        orientation={"left"}
        className={"w-[0.5287rem] text-brand-primary"}
      />
      <span className="translate-y-0.5 text-content-primary hover:text-slate-400 transition-fast">
        Go back
      </span>
    </button>
  );
}

export default GoBackBtn;
