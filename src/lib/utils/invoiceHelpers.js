export function generateInvoiceId() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // randomLetters: Math.random() gives us a random decimal number between 0 and 1 and multiplying it by 26 gives us these number between 0 and 26 but not 26 and wrapping it inside Math.floor will round the number to lowest integer so it will give us a number between 0 and 25
  const randomLetters =
    letters[Math.floor(Math.random() * 26)] +
    letters[Math.floor(Math.random() * 26)];
  //randomNumbers: Math.random gives us a random decimal number between 0 and 1 and multipying it with 9000 gives us a number between 0 and 9000 but not exactly 9000 and wrapping it inside Math.floor will round it to the nearest interger it will give us an integers between 0 and 8999 and adding 1000 to it will give a random number between 1000 and 9999.
  const randomNumbers = Math.floor(1000 + Math.random() * 9000);

  return `${randomLetters}${randomNumbers}`;
}

export function calculatePaymentDue(createdAtString, paymentTermDays) {
  const date = new Date(createdAtString);

  // sets the date of the month according to the new date that we pass in and adjust the date for us.
  date.setDate(date.getDate() + Number(paymentTermDays));

  return date.toISOString().split("T")[0];
}

export function transformInvoiceFormData(
  data,
  status = "pending",
  exsistingId = null,
) {
  const {
    createdAt: created_at,
    paymentTerms: payment_terms,
    description,
    clientName,
    clientEmail,
    senderAddress: {
      street: sender_street,
      city: sender_city,
      postcode: sender_post_code,
      country: sender_country,
    },
    clientAddress: {
      street: client_street,
      city: client_city,
      postcode: client_post_code,
      country: client_country,
    },
  } = data;

  const payment_due = calculatePaymentDue(created_at, payment_terms);
  const id = exsistingId || generateInvoiceId();

  const formattedItems = (data.items || []).map((item) => {
    const price = Number(item.price);
    const quantity = Number(item.quantity);

    return {
      name: item.name,
      price,
      quantity,
      total: price * quantity,
    };
  });

  const total = formattedItems.reduce((acc, item) => acc + item.total, 0);

  const newInvoice = {
    id,
    created_at,
    payment_due,
    description,
    payment_terms: Number(payment_terms),
    client_name: clientName,
    client_email: clientEmail,
    status,
    total,
    sender_street,
    sender_city,
    sender_post_code,
    sender_country,
    client_street,
    client_city,
    client_post_code,
    client_country,
  };

  return {
    newInvoice,
    items: formattedItems,
  };
}
