export interface FormattedCurrency {
  currency: string;
  value: string;
}

export const formatCurrency = (
  amount: number,
  currencySymbol: string
): FormattedCurrency => {
  if (isNaN(amount)) {
    return {
      currency: currencySymbol,
      value: "0",
    };
  }

  const formattedValue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencySymbol,
    minimumFractionDigits: 0,
  }).format(amount);

  return {
    currency: currencySymbol,
    value: formattedValue,
  };
};
