"use server";

import { transformInvoiceFormData } from "@/lib/utils/invoiceHelpers";
import {
  createInvoiceApi,
  createInvoiceItemsApi,
  deleteInvoiceApi,
} from "@/lib/services/data-services";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createNewInvoice(data) {
  const { newInvoice, items } = transformInvoiceFormData(data);

  const createdInvoice = await createInvoiceApi(newInvoice);

  const itemsWithInvoiceId = items.map((item) => ({
    ...item,
    invoice_id: createdInvoice.id,
  }));

  await createInvoiceItemsApi(itemsWithInvoiceId);

  revalidatePath("/invoices");
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
}

export async function deleteInvoice(invoiceId) {
  await deleteInvoiceApi(invoiceId);
  revalidatePath("/invoices");

  return {
    success: true,
  };
}
