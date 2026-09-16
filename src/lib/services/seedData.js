import { initialInvoices } from "@/lib/data/data-invoices";
import { supabase } from "./supabase";
//  {
//       id: inv.id,
//       created_at: inv.createdAt,
//       payment_due: inv.paymentDue,
//       description: inv.description,
//       payment_terms: inv.paymentTerms,
//       status: inv.status,
//       total: inv.total,
//       client_name: inv.clientName,
//       client_email: inv.clientEmail,
//       client_street: inv.clientAddress.street,
//       client_city: inv.clientAddress.city,
//       client_post_code: inv.clientAddress.postCode,
//       client_country: inv.clientAddress.country,
//       sender_street: inv.senderAddress.street,
//       sender_city: inv.senderAddress.city,
//       sender_post_code: inv.senderAddress.postCode,
//       sender_country: inv.senderAddress.country,
//     }

// {
//             invoice_id: createdInvoice.id,
//             name: item.name,
//             quantity: item.quantity,
//             price: item.price,
//             total: item.total,
//           }

export async function seedNewUserData() {
  try {
    const invoicesToInsert = initialInvoices.map((inv) => ({
      id: inv.id,
      created_at: inv.createdAt,
      payment_due: inv.paymentDue,
      description: inv.description,
      payment_terms: inv.paymentTerms,
      status: inv.status,
      total: inv.total,
      client_name: inv.clientName,
      client_email: inv.clientEmail,
      client_street: inv.clientAddress.street,
      client_city: inv.clientAddress.city,
      client_post_code: inv.clientAddress.postCode,
      client_country: inv.clientAddress.country,
      sender_street: inv.senderAddress.street,
      sender_city: inv.senderAddress.city,
      sender_post_code: inv.senderAddress.postCode,
      sender_country: inv.senderAddress.country,
    }));

    const { data: createdInvoices, error: invoiceError } = await supabase
      .from("invoices")
      .insert(invoicesToInsert)
      .select();

    if (invoiceError) throw new Error(invoiceError);

    const itemsToInsert = [];

    initialInvoices.forEach((inv) => {
      const createdInvoice = createdInvoices.find((ci) => ci.id === inv.id);

      if (createdInvoice && inv.items.length > 0) {
        inv.items.forEach((item) => {
          itemsToInsert.push({
            invoice_id: createdInvoice.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            total: item.total,
          });
        });
      }
    });

    if (itemsToInsert.length > 0) {
      const { error: itemsError } = await supabase
        .from("invoice_items")
        .insert(itemsToInsert)
        .select();

      if (itemsError) throw new Error(itemsError.message);
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error(`seeding failed error: ${error.message} `);
  }
}
