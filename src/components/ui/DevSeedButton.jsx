"use client";

import Button from "@/components/ui/Button";
import { seedNewUserData } from "../../lib/services/seedData";

function DevSeedButton() {
  const handleSeed = async () => {
    try {
      const res = await seedNewUserData();

      if (res?.success) {
        alert("Demo data loaded successfully");
      }
    } catch (error) {
      alert(`seeding failed: ${error}`);
    }
  };

  return (
    <Button onClick={handleSeed} variant={"primary"}>
      Seed Initial data
    </Button>
  );
}

export default DevSeedButton;
