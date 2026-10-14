"use client";

import Button from "@/components/ui/Button";

import { seedDatabaseAction } from "@/lib/actions/invoiceActions";
import { useTransition } from "react";

function DevSeedButton() {
  const [pending, startTransition] = useTransition();

  const handleSeed = async () => {
    startTransition(async () => {
      const res = await seedDatabaseAction();

      if (res?.success) {
        alert("Demo data loaded successfully");
      } else {
        alert(`seeding failed: ${res?.error}`);
      }
    });
  };

  return (
    <Button disabled={pending} onClick={handleSeed} variant={"primary"}>
      {pending ? "Seeding..." : " Seed Test data"}
    </Button>
  );
}

export default DevSeedButton;
