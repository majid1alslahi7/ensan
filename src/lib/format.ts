export function formatNumber(value: unknown): string {
  const number = Number(value ?? 0);

  return Number.isFinite(number) ? number.toLocaleString('ar-SA') : '0';
}

export function formatDate(value: unknown): string {
  if (!value) {
    return 'غير محدد';
  }

  const date = new Date(String(value));

  return Number.isNaN(date.getTime()) ? 'غير محدد' : date.toLocaleDateString('ar-SA');
}

export function imageUrl(value: unknown, fallback = '/images/gallery1.jpg'): string {
  if (typeof value !== 'string' || value.trim() === '') {
    return fallback;
  }

  return value;
}

export function excerpt(value: unknown, maxLength = 160): string {
  const text = typeof value === 'string' ? value.trim() : '';

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trim()}...`;
}
