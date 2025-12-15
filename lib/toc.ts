// Utility functions for generating table of contents

export interface TOCItem {
  id: string;
  title: string;
  level: number;
}

/**
 * Generate a URL-friendly ID from a title
 */
export function generateId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .trim();
}

/**
 * Extract TOC items from HTML content
 */
export function extractTOCItems(htmlContent: string): TOCItem[] {
  const tocItems: TOCItem[] = [];

  // Match h1, h2, h3, h4, h5, h6 tags
  const headingRegex = /<h([1-6])(?:[^>]*)>([^<]+)<\/h[1-6]>/gi;
  let match: RegExpExecArray | null;

  while (true) {
    match = headingRegex.exec(htmlContent);
    if (!match) {
      break;
    }

    const level = parseInt(match[1], 10);
    const title = match[2].trim();
    const id = generateId(title);

    tocItems.push({
      id,
      title,
      level,
    });
  }

  return tocItems;
}

/**
 * Extract TOC items from plain text content (for React components)
 */
export function extractTOCFromText(textContent: string): TOCItem[] {
  const tocItems: TOCItem[] = [];
  const lines = textContent.split("\n");

  for (const line of lines) {
    // Match markdown-style headings: #, ##, ###, ####, etc.
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const title = headingMatch[2].trim();
      const id = generateId(title);

      tocItems.push({
        id,
        title,
        level,
      });
    }
  }

  return tocItems;
}

/**
 * Add IDs to headings in HTML content for smooth scrolling
 */
export function addHeadingIds(htmlContent: string): string {
  return htmlContent.replace(
    /<h([1-6])([^>]*)>([^<]+)<\/h[1-6]>/gi,
    (_, level: string, attributes: string, title: string) => {
      const id = generateId(title);
      const newAttributes = attributes.includes("id=")
        ? attributes // Keep existing ID if present
        : `${attributes} id="${id}"`;
      return `<h${level}${newAttributes}>${title}</h${level}>`;
    },
  );
}

/**
 * Check if content has sufficient headings to warrant a TOC
 */
export function shouldShowTOC(tocItems: TOCItem[]): boolean {
  return tocItems.length >= 2; // Show TOC if there are at least 2 headings
}
