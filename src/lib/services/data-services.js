import { cache } from "react";
import { supabase } from "./supabase";

export const getInvoices = cache(async ({ filter }) => {
  let query = supabase
    .from("invoices")
    .select(
      "id,createdAt:created_at,paymentDue:payment_due,description,paymentTerms:payment_terms,status,total,clientName:client_name,clientEmail:client_email,clientStreet:client_street,clientCity:client_city,clientPostCode:client_post_code,clientCountry:client_country,senderStreet:sender_street,senderCity:sender_city,senderPostCode:sender_post_code,senderCountry:sender_country,items:invoice_items(*)",
      {
        count: "exact",
      },
    );

  // ## Filter ##
  if (filter && filter.value) {
    const method = filter.method || (Array.isArray(filter.value) ? "in" : "eq");

    query = query[method](filter.field, filter.value);
  }

  const { data, error, count } = await query;

  // await new Promise((res) => setTimeout(res, 3000));
  if (error) {
    console.error(`${error.message}`);
    throw new Error("Invoices couldn't be loaded");
  }

  const invoices = data.map((invoice) => ({
    id: invoice.id,
    createdAt: invoice.createdAt,
    paymentDue: invoice.paymentDue,
    description: invoice.description,
    paymentTerms: invoice.paymentTerms,
    status: invoice.status,
    total: invoice.total,
    clientName: invoice.clientName,
    clientEmail: invoice.clientEmail,
    senderAddress: {
      street: invoice.senderStreet,
      city: invoice.senderCity,
      postcode: invoice.senderPostCode,
      country: invoice.senderCountry,
    },
    clientAddress: {
      street: invoice.clientStreet,
      city: invoice.clientCity,
      postcode: invoice.clientPostCode,
      country: invoice.clientCountry,
    },
    items: invoice.items || [],
  }));

  return { invoices, count };
});

export async function getInvoice(id) {
  let { data: invoice, error } = await supabase
    .from("invoices")
    .select(
      "id,createdAt:created_at,paymentDue:payment_due,description,paymentTerms:payment_terms,status,total,clientName:client_name,clientEmail:client_email,clientStreet:client_street,clientCity:client_city,clientPostCode:client_post_code,clientCountry:client_country,senderStreet:sender_street,senderCity:sender_city,senderPostCode:sender_post_code,senderCountry:sender_country,items:invoice_items(*)",
    )
    .eq("id", id)
    .single();

  // await new Promise((res) => setTimeout(res, 3000));
  if (error) {
    throw new Error(error.message);
  }

  if (!invoice) {
    return null;
  }

  return {
    id: invoice.id,
    createdAt: invoice.createdAt,
    paymentDue: invoice.paymentDue,
    description: invoice.description,
    paymentTerms: invoice.paymentTerms,
    status: invoice.status,
    total: invoice.total,
    clientName: invoice.clientName,
    clientEmail: invoice.clientEmail,
    senderAddress: {
      street: invoice.senderStreet,
      city: invoice.senderCity,
      postcode: invoice.senderPostCode,
      country: invoice.senderCountry,
    },
    clientAddress: {
      street: invoice.clientStreet,
      city: invoice.clientCity,
      postcode: invoice.clientPostCode,
      country: invoice.clientCountry,
    },
    items: invoice.items || [],
  };
}
