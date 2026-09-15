/**
 * Remove inline `style="..."` attributes from an HTML string.
 *
 * CMS article bodies ship with inline styles (margins, fonts, colors) baked
 * onto elements. Inline styles beat class selectors by specificity, which would
 * override the `.article-prose` typography. Stripping them lets the prototype's
 * styling win while keeping all content/structure (tags, bold, links, lists).
 */
export function stripInlineStyles(html: string): string {
  if (!html) return "";
  return html.replace(/\s+style=("[^"]*"|'[^']*')/gi, "");
}
