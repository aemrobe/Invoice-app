export const formatCurrency = (
  amount,
  showDecimals = true,
  locale = "en-GB",
  currency = "GBP",
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: 2,
  })
    .format(amount)
    .replace(/^(\D+)/, "$1 "); //take the first non-digit character to add a space to it
};

export const formatDate = (dateString, locale = "en-GB") => {
  const newDate = new Date(dateString);

  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(newDate);
};
