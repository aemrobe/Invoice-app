"use client";

import Button from "@/components/ui/Button";
import StatusCard from "@/components/ui/StatusCard";

function Error({ error, reset }) {
  const descriptionId = "error-text-id";

  return (
    <StatusCard
      title={"Something went wrong!"}
      description={
        error?.message || "An unexpected error occured while loading this page"
      }
      descriptionId={descriptionId}
      action={
        <Button
          aria-describedby={descriptionId}
          variant={"primary"}
          onClick={reset}
        >
          Try again
        </Button>
      }
      isError={true}
    />
  );
}

export default Error;
