"use server";

import { transformInvoiceFormData } from "@/lib/utils/invoiceHelpers";
import {
  createInvoiceApi,
  createInvoiceItemsApi,
  deleteInvoiceApi,
  deleteInvoiceItemsApi,
  getInvoice,
  updateInvoiceApi,
} from "@/lib/services/data-services";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

export async function createNewInvoice(data) {
  const { newInvoice, items } = transformInvoiceFormData(data);

  const createdInvoice = await createInvoiceApi(newInvoice);

  const itemsWithInvoiceId = items.map((item) => ({
    ...item,
    invoice_id: createdInvoice.id,
  }));

  await createInvoiceItemsApi(itemsWithInvoiceId);

  revalidatePath("/invoices");

  return {
    success: true,
  };
}

export async function createDraftInvoice(data) {
  const { newInvoice, items } = transformInvoiceFormData(data, "draft");

  const createdInvoice = await createInvoiceApi(newInvoice);

  if (items.length > 0) {
    const itemsWithInvoiceId = items.map((item) => ({
      ...item,
      invoice_id: createdInvoice.id,
    }));

    await createInvoiceItemsApi(itemsWithInvoiceId);
  }

  revalidatePath("/invoices");

  return {
    success: true,
  };
}

export async function deleteInvoice(invoiceId) {
  await deleteInvoiceApi(invoiceId);
  revalidatePath("/invoices");

  return {
    success: true,
  };
}

export async function updatedInvoice(invoiceId, updatedData) {
  const invoice = await getInvoice(invoiceId);
  if (!invoice) {
    throw new Error("Invoice not found.");
  }

  if (invoice.status === "paid") {
    throw new Error("Paid invoice couldn't be edited.");
  }

  const { newInvoice, items } = transformInvoiceFormData(
    updatedData,
    "pending",
    invoiceId,
  );

  await updateInvoiceApi({ id: newInvoice.id, updatedData: newInvoice });

  await deleteInvoiceItemsApi(invoiceId);

  const itemsWithInvoiceId = items.map((item) => ({
    ...item,
    invoice_id: invoiceId,
  }));

  await createInvoiceItemsApi(itemsWithInvoiceId);

  revalidatePath(`/invoices/${invoiceId}`);

  return {
    success: true,
  };
}

export async function markAsPaidButton(invoiceId) {
  const invoice = await getInvoice(invoiceId);

  if (!invoice) {
    throw new Error("Invoice not found.");
  }

  if (invoice.status !== "pending") {
    throw new Error("Only pending invoices can be marked as paid.");
  }

  await updateInvoiceApi({
    id: invoiceId,
    updatedData: {
      status: "paid",
    },
  });

  revalidatePath(`invoices/${invoiceId}`);
  revalidatePath("/invoices");

  return {
    success: true,
  };
}
