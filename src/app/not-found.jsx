import Button from "@/components/ui/Button";
import StatusCard from "../components/ui/StatusCard";

function GlobalNotFound() {
  const descriptionId = "notFound-text-id";

  return (
    <StatusCard
      title={"Page not found"}
      descriptionId={descriptionId}
      description={
        "The page you are looking for doesn't exist, may have been removed, or the link is incorrect."
      }
      action={
        <Button
          href="/invoices"
          aria-describedby={descriptionId}
          variant={"primary"}
        >
          Go back home
        </Button>
      }
      isError={true}
    />
  );
}

export default GlobalNotFound;
