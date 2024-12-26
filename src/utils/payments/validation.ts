export function validateAmount(amount: number): boolean {
  return amount > 0 && Number.isInteger(amount);
}

export function validateCurrency(currency: string): boolean {
  const supportedCurrencies = ['EUR', 'USD'];
  return supportedCurrencies.includes(currency.toUpperCase());
}