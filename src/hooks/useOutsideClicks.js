import { useEffect, useRef } from "react";

export function useOutsideClicks(handler, options = {}) {
  const { ignoreSelectors = "", listenCapturing = false } = options;

  const ref = useRef(null);

  useEffect(
    function () {
      const handleClick = function (e) {
        // Since using e.target gets null when the theme is switched we should use e.composedPath() that checks an ordered path of DOM nodes the event traveled at the exact moment the click was initiated.
        const path = e.composedPath ? e.composedPath() : [];

        const isIgnored = ignoreSelectors
          ? path.some(
              (el) => el instanceof HTMLElement && el.matches(ignoreSelectors),
            )
          : false;
        const isModalClick = ref.current && path.includes(ref.current);

        if (!isModalClick && !isIgnored) {
          handler();
        }
      };

      document.addEventListener("click", handleClick);

      return () => {
        document.removeEventListener("click", handleClick);
      };
    },
    [handler, ignoreSelectors],
  );

  return ref;
}
