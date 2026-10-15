"use client";

import { useRouter } from "next/navigation";
import { ChevronIcon } from "../icons";
import { useEffect, useRef } from "react";

function GoBackBtn({ to, onClick, autoFocus = false, className }) {
  const btnRef = useRef(null);
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
  }

  useEffect(() => {
    if (autoFocus && btnRef.current) {
      const animationId = requestAnimationFrame(() => {
        btnRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        btnRef.current.focus({ preventScroll: true });
      });

      return () => cancelAnimationFrame(animationId);
    }
  }, [autoFocus]);

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={handleClick}
      className={`focusable-ring rounded-lg inline-flex items-center gap-x-[1.478rem] heading-S2 scroll-mt-27 [--ring-offset:8px] ${className}`}
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
