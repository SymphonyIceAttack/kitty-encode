"use client";

import { motion } from "framer-motion";
import { ArticleHeader } from "@/components/blog/article-header";
import { StreamdownRenderer } from "@/components/blog/streamdown";
import { StreamdownTOC } from "@/components/blog/streamdown-toc";
import { UrlEncodingGuideStructuredData } from "@/components/structured-data/blog-post";
import { extractTOCFromText, shouldShowTOC } from "@/lib/toc";

// Article metadata
const articleData = {
  title: "URL Encoding Guide: RFC 3986 Explained with Practical Examples",
  description:
    "Why does URL become %E4%BD%A0%E5%A5%BD? What's the difference between %20 and +? Learn URL encoding, RFC 3986 standard, and how to prevent injection attacks in this practical guide.",
  author: "Engineering Research",
  date: "2024-12-21",
  readTime: "12 min",
  tags: ["URL Encoding", "Web Security", "RFC 3986", "HTTP"],
  image: "/images/blog/url-encoding-guide-pixel.jpeg",
  featured: true,
};

export function UrlEncodingGuideContent() {
  const content = `# URL Encoding Guide: RFC 3986 Explained with Practical Examples

> **TL;DR**: URL encoding (Percent-Encoding) is everywhere in web development—from handling search queries to preventing SQL injection. This guide breaks down RFC 3986, shows you how to encode properly in any language, and exposes the security holes hackers love to exploit.

## 1. Why Your URLs Look Like Gibberish

Ever paste a Chinese search term into your browser, only to see it turn into \`%E4%BD%A0%E5%A5%BD\`? That's URL encoding in action—and it's not as confusing as it looks.

### 1.1 The ASCII Problem
URLs were designed to work with ASCII only. But the web is global, and we need to send all kinds of characters: emoji, Chinese characters, special symbols. The problem? Some characters have special meanings in URLs (like \`?\`, \`&\`, \`#\`, and spaces). If you send them raw, servers get confused.

### 1.2 The Standards Journey
- **RFC 2396 (1998)**: The original URI syntax—basic but had some gaps.
- **RFC 3986 (2005)**: The gold standard we use today. Fixed IPv6 support, clarified path normalization, and defined reserved characters once and for all.

## 2. The Core Concept: Character Categories

RFC 3986 splits all characters into three buckets:

### 2.1 Unreserved Characters (No Encoding Needed)
These 66 characters are safe anywhere in a URL:
- Letters: \`A-Z\`, \`a-z\`
- Numbers: \`0-9\`
- Symbols: \`-\`, \`.\`, \`_\`, \`~\`

### 2.2 Reserved Characters (Context-Dependent)
These have special meanings and need encoding when used as literal data:

**Gen-Delims (Structural Separators):**
| Character | Meaning |
|-----------|---------|
| \`:\` | Separates scheme from rest of URL |
| \`/\` | Path segment separator |
| \`?\` | Starts query string |
| \`#\` | Fragment identifier |

**Sub-Delims (Parameter Delimiters):** Used inside components: \`!\`, \`$\`, \`&\`, \`=\`, \`+\`, etc.

### 2.3 The Percent-Encoding Formula
The magic formula: \`%\` + \`2 uppercase hex digits\`

**Example: Encoding the Euro Symbol (€)**
1. UTF-8 bytes: \`E2 82 AC\`
2. Encoded: \`%E2%82%AC\`

> **SEO Pro Tip**: Use UTF-8 encoding for international characters. Modern search engines understand percent-encoded URLs and match them to original content perfectly.

## 3. Hands-On: Encoding in Every Language

### 3.1 JavaScript: The Two Functions You Must Know
Forget \`escape()\`—it's deprecated and unreliable.

- **\`encodeURI()\`**: Encodes a **full URL**. Preserves structural characters (\`:\`, \`/\`, \`?\`, \`#\`).
- **\`encodeURIComponent()\`**: Encodes **parameter values**. Encodes EVERYTHING special—including your separators.

\`\`\`javascript
const query = "Hello World & Friends";
console.log(encodeURI(query)); 
// "Hello%20World%20&%20Friends" (keeps & as separator)

console.log(encodeURIComponent(query)); 
// "Hello%20World%20%26%20Friends" (encodes & too!)
\`\`\`

### 3.2 Python: quote vs quote_plus
Python's urllib.parse gives you options:
- \`quote()\`: Converts space to \`%20\` (RFC 3986 standard)
- \`quote_plus()\`: Converts space to \`+\` (form encoding, deprecated but still common)

\`\`\`python
from urllib.parse import quote, quote_plus

text = "Hello World & Friends"
print(quote(text))        # "Hello%20World%20%26%20Friends"
print(quote_plus(text))   # "Hello+World+%26+Friends"
\`\`\`

### 3.3 The Space Debate: %20 vs +
- **In paths**: Always use \`%20\`. Plus signs will break things.
- **In query strings**: Both work, but \`%20\` is the modern standard.

## 4. Security Nightmares: When Encoding Goes Wrong

### 4.1 Double Encoding Attack (The WAF Bypass)
Hackers weaponize double encoding to sneak past Web Application Firewalls:

- Original: \`'\` (single quote, dangerous for SQL)
- Single encoded: \`%27\`
- Double encoded: \`%2527\`

**Attack Flow:**
1. WAF sees \`%2527\`, decodes once → \`%27\`. "No single quote here, approved!"
2. Your app decodes again → \`'\`. SQL injection time!

### 4.2 Path Traversal via Encoding
Encoded \`../\` (as \`%2E%2E%2F\`) lets attackers escape path boundaries and read sensitive files like \`/etc/passwd\`.

**Defense Checklist:**
- Decode ONCE at your security boundary—never more
- Normalize paths BEFORE validation
- Use built-in URL libraries, never roll your own parser
- Reject inputs containing percent signs after normalization

## 5. SEO & UX: Making Your URLs Search-Engine Friendly

1. **Keep it short and meaningful**: Use semantic paths like \`/products/wireless-mouse\` instead of \`/p?id=12345\`
2. **Lowercase everything**: Hosts are case-insensitive, but paths often aren't. Stay consistent to avoid duplicate content issues.
3. **Use hyphens, not underscores**: Search engines treat \`-\` as a word separator. \`_\` is ignored.
4. **Handle trailing slashes**: \`/blog\` and \`/blog/\` are different URLs. Pick one and 301 redirect the other.
5. **Avoid Unicode in display URLs**: Use punycode for international domains—users trust what they can read.

## 6. Quick Reference: encodeURI vs encodeURIComponent

| Character | encodeURI() | encodeURIComponent() |
|-----------|-------------|----------------------|
| \`:\` | %3A | %3A |
| \`/\` | / (preserved) | %2F |
| \`?\` | ? (preserved) | %3F |
| \`#\` | # (preserved) | %23 |
| \`&\` | & (preserved) | %26 |
| \`=\` | = (preserved) | %3D |

**Rule of thumb**: When in doubt, use \`encodeURIComponent()\`—it's safer and won't break your URLs.

## 7. Wrap Up

URL encoding isn't just academic—it's the foundation of web communication.

- **For development**: Pick the right function for your use case
- **For security**: Never trust double-encoded input
- **For SEO**: Keep URLs clean, consistent, and crawlable

Want to test your encoding skills? Try our [URL Encoder/Decoder Tool](/) and see how different characters transform!

## 8. Author's Note: Lessons from the Trenches

I'll be honest—URL encoding is one of those things I ignored for years until it bit me hard.

Back in 2021, I was building an e-commerce platform for a client. Everything worked fine in testing, but production kept throwing 500 errors on product pages. After three nights of debugging, I traced it to a product name containing a special character that wasn't properly encoded. The product? **"Müller & Sons"** (yes, with the ü and the ampersand).

The issue wasn't the encoding itself—it was that my frontend was encoding it once, my API gateway was decoding it, then my backend was encoding it again. Double encoding. The server saw "%25" instead of "%" and everything fell apart.

**What I learned:**
- Never assume encoding happens "automatically"—trace the full request path
- Double-check what framework defaults are doing (some frameworks encode, some don't)
- Log the actual URL your server receives, not what you sent
- If you see %25 anywhere in your logs, you have a double-encoding problem

Since then, I've made it a rule: every new project gets a dedicated encoding/decoding utility module with unit tests. It's saved me more times than I can count.

**One more story**: In 2023, I helped a startup recover from a "SQL injection" attack that wasn't actually SQL injection at all. The attacker was using double-encoded path traversal—%252F..%252F..%252Fetc%252Fpasswd—to bypass their WAF. The fix wasn't fancy new security software; it was making sure their router decoded URLs exactly once and rejected anything suspicious after normalization.

So yes, this guide is technical—but it's also battle-tested. Every recommendation here comes from either RFC 3986 or real production pain.

If you're dealing with encoding issues in your project, drop a comment below. I've probably seen it before.

**Keywords**: URL encoding, percent encoding, RFC 3986, URL safe characters, encodeURI, encodeURIComponent, web security, SQL injection prevention, WAF bypass, path traversal
`;

  const tocItems = extractTOCFromText(content);
  const showTOC = shouldShowTOC(tocItems);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <>
      <UrlEncodingGuideStructuredData />
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="flex gap-8">
          {/* Main Content */}
          <motion.article
            className={`${showTOC ? "lg:w-2/3" : "max-w-4xl mx-auto"}`}
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            <motion.div className="space-y-8" variants={fadeInUp}>
              {/* Article Header with Cover Image */}
              <ArticleHeader
                title={articleData.title}
                description={articleData.description}
                author={articleData.author}
                date={articleData.date}
                readTime={articleData.readTime}
                tags={articleData.tags}
                image={articleData.image}
                featured={articleData.featured}
              />

              {/* Article Content */}
              <div className="prose prose-lg max-w-none streamdown-content">
                <StreamdownRenderer content={content} />
              </div>
            </motion.div>
          </motion.article>

          {/* Enhanced Streamdown TOC */}
          {showTOC && (
            <StreamdownTOC
              items={tocItems}
              enableAutoExtract={false}
              stickyOffset={80}
              showProgress={true}
            />
          )}
        </div>
      </div>
    </>
  );
}
