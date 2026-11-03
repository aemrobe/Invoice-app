export function exportInvoicesToCSV(invoices) {
  if (!invoices || invoices.length === 0) return;

  // Define CSV headers
  const headers = [
    "Invoice ID",
    "Client Name",
    "Client Email",
    "Payment Due",
    "Total",
    "Status",
  ];

  // This will be turned into arrays of array in which each array is a row. a comma separated values are columns
  const rows = invoices.map((inv) => [
    inv.id,
    `"${inv.clientName || ""}"`, // Wrap in quotes in case names contain commas
    inv.clientEmail || "",
    inv.paymentDue || "",
    inv.total || 0,
    inv.status || "draft",
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `invoices-export-${new Date().toISOString().split("T")[0]}.csv`,
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
