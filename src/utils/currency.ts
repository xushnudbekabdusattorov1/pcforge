import { Currency } from '../types';

export const USD_TO_UZS_RATE = 12850;

export function formatPrice(amountUSD: number, currency: Currency): string {
  if (currency === 'UZS') {
    const uzs = Math.round(amountUSD * USD_TO_UZS_RATE);
    return uzs.toLocaleString('uz-UZ') + ' so\'m';
  }
  return '$' + amountUSD.toLocaleString('en-US');
}

export function convertUSDToUZS(amountUSD: number): number {
  return Math.round(amountUSD * USD_TO_UZS_RATE);
}
