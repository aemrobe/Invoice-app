"use client";

import Button from "@/components/ui/Button";
import StatusCard from "@/components/ui/StatusCard";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

function Error({ error, reset }) {
  const descriptionId = "error-text-id";
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleTryAgain = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  return (
    <StatusCard
      title={"Something went wrong!"}
      description={
        error?.message || "An unexpected error occured while loading this page"
      }
      descriptionId={descriptionId}
      action={
        <Button
          pending={isPending}
          disabled={isPending}
          aria-describedby={descriptionId}
          variant={"primary"}
          onClick={handleTryAgain}
        >
          Try again
        </Button>
      }
      isError={true}
    />
  );
}

export default Error;
