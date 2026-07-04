const CURRENCY_SYMBOLS = { EUR: '€', USD: '$', GBP: '£', AED: 'AED', THB: '฿', EGP: 'E£', IDR: 'Rp' };

const CARD_CLASS_BY_COUNTRY = {
  Egypt: 'c-egypt',
  UAE: 'c-dubai',
  Albania: 'c-albania',
  Bulgaria: 'c-bulgaria',
};

export function formatPrice(property) {
  if (!property.price) return '';
  const symbol = CURRENCY_SYMBOLS[property.currency] ?? property.currency ?? '';
  return `od ${Number(property.price).toLocaleString('sk-SK')} ${symbol}`;
}

export function cardClassFor(country) {
  return CARD_CLASS_BY_COUNTRY[country] ?? 'c-generic';
}

export function formatCoord(property) {
  if (property.coord) return property.coord;
  if (property.latitude != null) {
    const dir = property.latitude >= 0 ? 'N' : 'S';
    return `${Math.abs(property.latitude).toFixed(4)}° ${dir}`;
  }
  return property.country ?? '';
}
