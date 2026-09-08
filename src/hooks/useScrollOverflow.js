"use client";

import { useCallback, useEffect, useState } from "react";
import { BUFFER_DISTANCE } from "@/lib/constants/durations";

export function useScrollOverflow(ref) {
  const [hasMoreToScroll, setHasMoreToScroll] = useState(false);

  const checkScroll = useCallback(() => {
    const el = ref.current;

    if (!el) return;

    // ## Checking the scroll container has reached to it's bottom ##

    //scrollHeight = the total content of the scrollbar container
    //clientHeight = the visible window screen to the use user
    //scrollTop = The distance that the user has currently scrolled
    const isBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < BUFFER_DISTANCE;

    setHasMoreToScroll(!isBottom);
  }, [ref]);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    checkScroll();
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll, ref]);

  return hasMoreToScroll;
}
