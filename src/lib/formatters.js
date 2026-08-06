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
    .replace(/^(\D+)/, "$1 "); //change the first non-digit character to add a space to it
};
