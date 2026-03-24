import sanitizeHtml from 'sanitize-html';

export default function sanitizeOrder(input: string): string {
  return sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {},
  });
}
