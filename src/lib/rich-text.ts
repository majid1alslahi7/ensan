const HASHTAG_REGEX = /#[\p{L}\p{N}_-]+/gu;
const IMAGE_URL_REGEX = /^https?:\/\/[^\s]+\.(?:png|jpe?g|gif|webp|avif|svg)(?:\?[^\s]*)?$/i;

export function extractHashtags(value: unknown): string[] {
  const text = typeof value === 'string' ? value : '';

  return Array.from(new Set(text.match(HASHTAG_REGEX) ?? []));
}

export function splitContentBlocks(value: unknown): string[] {
  const text = typeof value === 'string' ? value : '';

  return text
    .replace(/\r\n/g, '\n')
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);
}

export function blockImageUrls(block: string): string[] {
  const tokens = block.split(/\s+/).map((token) => token.trim()).filter(Boolean);

  if (tokens.length === 0 || !tokens.every((token) => IMAGE_URL_REGEX.test(token))) {
    return [];
  }

  return tokens;
}

export function isImageUrl(value: string): boolean {
  return IMAGE_URL_REGEX.test(value);
}
