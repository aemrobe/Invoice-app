import StatusCard from "@/components/ui/StatusCard";
import Button from "@/components/ui/Button";

function NotFound() {
  const descriptionId = "notFound-text-id";

  return (
    <StatusCard
      title={"Invoice not found"}
      description={
        " The invoice you are looking for doesn't exist, may have been deleted, or the ID in the link is incorrect."
      }
      descriptionId={descriptionId}
      action={
        <Button
          aria-describedby={descriptionId}
          href="/invoices"
          variant={"primary"}
        >
          Go back home
        </Button>
      }
      isError={true}
    />
  );
}

export default NotFound;
