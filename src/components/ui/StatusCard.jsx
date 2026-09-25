import PageHeading from "./PageHeading";

function StatusCard({
  title,
  descriptionId,
  description,
  action,
  isError = false,
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6 text-center">
      <div className="bg-surface-primary shadow-card flex w-full max-w-md flex-col items-center rounded-2xl p-8 transition-medium md:p-12">
        <PageHeading
          className={"heading-M text-content-primary mb-3"}
          isError={isError}
        >
          {title}
        </PageHeading>

        <p
          id={descriptionId}
          className="heading-S font-normal text-content-muted mb-6 max-w-sm"
        >
          {description}
        </p>

        {action}
      </div>
    </div>
  );
}

export default StatusCard;
