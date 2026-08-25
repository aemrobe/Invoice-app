function ChevronIcon({ orientation, className }) {
  const isVertical = orientation === "down";

  const paths = {
    left: "M6.342.886L2.114 5.114l4.228 4.228",
    right: "M1 1l4 4-4 4",
    down: "M1 1l4.228 4.228L9.456 1",
  };

  return (
    <svg
      viewBox={isVertical ? "0 0 11 7" : "0 0 7 10"}
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={paths[orientation]}
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default ChevronIcon;
