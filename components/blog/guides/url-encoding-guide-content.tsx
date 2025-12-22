"use client";

import { motion } from "framer-motion";
import { ArticleHeader } from "@/components/blog/article-header";
import { StreamdownRenderer } from "@/components/blog/streamdown";
import { StreamdownTOC } from "@/components/blog/streamdown-toc";
import { UrlEncodingGuideStructuredData } from "@/components/structured-data/blog-post";
import { extractTOCFromText, shouldShowTOC } from "@/lib/toc";

// Article metadata
const articleData = {
  title: "URI Syntax and Percent-Encoding: An RFC 3986 Analysis",
  description:
    "A rigorous engineering analysis of URI syntax grammars, the percent-encoding mechanism, and security vulnerabilities arising from double-decoding and normalization failures.",
  author: "Engineering Research",
  date: "2024-12-21",
  readTime: "25 min",
  tags: ["Computer Science", "RFC 3986", "HTTP", "Security"],
  image: "/images/blog/url-encoding-guide-pixel.jpeg",
  featured: true,
};

export function UrlEncodingGuideContent() {
  const content = `# URI Syntax and Percent-Encoding: An RFC 3986 Analysis

> **Abstract**: This comprehensive engineering reference examines the theoretical foundations and practical implementations of Uniform Resource Identifiers as defined by RFC 3986. We provide a rigorous analysis of the percent-encoding mechanism, character set theory, and the security implications of improper encoding handling.

## 1. Historical Context and Standards Evolution

### 1.1 The Evolution of URI Specifications

The standardization of Uniform Resource Identifiers represents a fundamental evolution in how the internet community approached resource addressing. Understanding this historical context is essential for appreciating the design decisions embedded in modern URL handling.

**RFC 2396 (1998)** established the original URI generic syntax, consolidating the fragmented approaches that had developed organically during the World Wide Web's early expansion. This specification introduced the concept of reserved and unreserved character sets, establishing the foundational model that persists in modified form today.

**RFC 3986 (2005)** superseded RFC 2396, addressing several ambiguities and inconsistencies that had emerged in practice:

- Refinement of the host parsing rules to accommodate IPv6 literals
- Clarification of the dot-segment handling in path normalization
- Formalization of the empty authority component behavior
- Standardization of the gen-delims character set to include square brackets

**RFC 3987** introduced Internationalized Resource Identifiers (IRIs), extending the character repertoire beyond ASCII to encompass the full Unicode range.

### 1.2 The URI Syntax Grammar

RFC 3986 formalizes the URI syntax using Augmented Backus-Naur Form (ABNF), providing an unambiguous specification that implementations must follow. The top-level grammar is defined as:

\`URI = scheme ":" hier-part [ "?" query ] [ "#" fragment ]\`

\`hier-part = "//" authority path-abempty / path-absolute / path-rootless / path-empty\`

This grammar reveals several critical design principles:

1. **Hierarchical Structure**: The double-slash convention introduces the authority component
2. **Component Delimiters**: The question mark and hash serve as unambiguous component separators
3. **Path Rules**: The path-abempty variant mandates specific dot-segment handling

### 1.3 URI Scheme Registry

The IANA-maintained URI Schemes registry catalogs registered schemes:

| Scheme | Authority | Purpose |
|--------|-----------|---------|
| http | Required | Hypertext Transfer |
| https | Required | Secure HTTP |
| mailto | Optional | Email addresses |
| ftp | Required | File Transfer |
| data | None | Inline data |
| blob | Required | Binary large objects |

## 2. Character Set Theory and Reserved Sets

### 2.1 The Formal Character Model

RFC 3986 partitions the ASCII character space into three mutually exclusive categories:

\`URI-Reference = Unreserved ∪ Reserved ∪ Percent-Encoded\`

**Unreserved Characters** are semantically neutral:

\`Unreserved = { A-Z, a-z, 0-9, "-", ".", "_", "~" }\`

These 66 characters are semantically transparent. A URI containing only unreserved characters is semantically equivalent to its decoded form.

### 2.2 Reserved Character Categories

**Generic Delimiters (Gen-Delims)** serve as structural delimiters:

| Character | ASCII | Purpose |
|-----------|-------|---------|
| \`:\` | 58 | Scheme-data separator |
| \`/\` | 47 | Path segment delimiter |
| \`?\` | 63 | Query string introducer |
| \`#\` | 35 | Fragment identifier |
| \`[\` | 91 | IPv6 literal start |
| \`]\` | 93 | IPv6 literal end |
| \`@\` | 64 | Userinfo delimiter |

**Sub-Delimiters (Sub-Delims)** serve as delimiters within components:

| Character | ASCII | Common Usage |
|-----------|-------|--------------|
| \`!\` | 33 | Path segments, query values |
| \`$\` | 36 | Currency, query values |
| \`&\` | 38 | Query parameter separator |
| \`'\` | 39 | String literals |
| \`(\` | 40 | Grouping in query values |
| \`)\` | 41 | Closing grouping |
| \`*\` | 42 | Wildcards |
| \`+\` | 43 | Space (legacy) |
| \`,\` | 44 | List separators |
| \`;\` | 59 | Parameter delimiter |
| \`=\` | 61 | Key-value assignment |

### 2.3 The Percent-Encoding Mechanism

The percent-encoding transformation maps any octet to a three-character representation:

\`Encoded(b) = "%" + UpperCase(Hex(b))\`

**Encoding Algorithm:**

1. Convert the input character to its UTF-8 byte sequence
2. For each byte, generate the two-digit hexadecimal representation
3. Prepend \`%\` to each hexadecimal pair
4. Use uppercase hex digits for consistency

**Example: Encoding the Euro Symbol (U+20AC)**

| Step | Representation | Value |
|------|----------------|-------|
| Unicode Code Point | U+20AC | Euro |
| UTF-8 Encoding | E2 82 AC | 3 bytes |
| Percent-Encoded | %E2%82%AC | Final representation |

### 2.4 UTF-8 Encoding Properties

UTF-8 exhibits several properties that make it ideal for URI encoding:

1. **Backward Compatibility**: ASCII characters (0-127) encode to single bytes
2. **Self-Synchronizing**: Byte patterns ensure easy parsing and error detection
3. **Compact for ASCII**: Optimal encoding density for English content
4. **Universal Coverage**: Supports all Unicode code points

## 3. URI Component-Specific Encoding Requirements

### 3.1 Scheme Component

The scheme component follows strict rules:

\`scheme = ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )\`

| Aspect | Rule |
|--------|------|
| First Character | Must be alphabetic |
| Subsequent Characters | Alphanumeric, \`+\`, \`-\`, \`.\` |
| Case Sensitivity | Case-insensitive |
| Encoding | Never percent-encoded |

### 3.2 Authority Component

The authority component consists of optional userinfo, a host, and an optional port:

\`authority = [ userinfo "@" ] host [ ":" port ]\`

**Host Encoding Rules:**

| Host Type | Encoding Rules |
|-----------|----------------|
| Domain Names | Labels separated by dots, punycode for non-ASCII |
| IPv4 | Four decimal octets, no encoding |
| IPv6 | Eight groups of four hex digits, bracketed |
| IPvFuture | Bracketed, v-prefixed, base16 |

**Security Note**: Domain names containing non-ASCII characters use Punycode. The domain \`münchen.de\` becomes \`xn--mnchen-3ya.de\`.

### 3.3 Path Component

The path component presents complex encoding scenarios:

\`path-abempty = *( "/" segment )\`
\`segment = *pchar\`
\`pchar = unreserved / pct-encoded / sub-delims / ":" / "@"\`

**Path Segment Encoding:**

| Character | Encode? | Rationale |
|-----------|---------|-----------|
| \`/\` | Yes | Path segment delimiter |
| \`.\` | Contextual | Current directory reference |
| \`..\` | Contextual | Parent directory reference |
| \`%\` | Yes | Encoding indicator |
| Non-ASCII | Yes | UTF-8 required |

**Dot-Segment Handling:**

| Sequence | Normalized |
|----------|------------|
| \`./a\` | \`a\` |
| \`../a\` | \`a\` |
| \`a/./b\` | \`a/b\` |
| \`a/b/../c\` | \`a/c\` |

### 3.4 Query Component

The query component follows the query-delim and continues until the fragment-delim:

\`query = *( pchar / "/" / "?" )\`

**Query String Parsing:**

\`const params = new URLSearchParams("?name=John&city=New%20York");\`
\`// name: "John"\`
\`// city: "New York" (decoded)\`

**The Space Character Ambiguity:**

| Encoding | RFC 3986 | Form Data | Web Frameworks |
|----------|----------|-----------|----------------|
| Space | \`%20\` | \`+\` or \`%20\` | Mixed handling |
| Plus | \`+\` (literal) | Space | Varies |

**Recommendation**: Always use \`%20\` for spaces in query strings.

### 3.5 Fragment Component

The fragment identifier references a secondary resource:

\`fragment = *( pchar / "/" / "?" )\`

| Aspect | Rule |
|--------|------|
| Encoding Scope | Less restrictive than path/query |
| Server Visibility | Not transmitted to server |
| HTML Anchors | Maps to \`id\` or \`name\` attributes |

## 4. Implementation Across Programming Languages

### 4.1 Language-Specific Encoding Functions

| Language | Function | Scope | Reserved Encoded? |
|----------|----------|-------|-------------------|
| JavaScript | \`encodeURIComponent()\` | Component | Yes |
| JavaScript | \`encodeURI()\` | Full URI | No |
| Python | \`urllib.parse.quote()\` | String | Yes |
| Python | \`urllib.parse.quote_plus()\` | Query | Yes |
| Go | \`url.QueryEscape()\` | Query | Yes |
| Go | \`url.PathEscape()\` | Path | Yes |
| Java | \`URLEncoder.encode()\` | Form | Yes |
| Java | \`URI.create().toASCIIString()\` | Full URI | Automatic |
| Ruby | \`encode_www_form_component()\` | Component | Yes |
| Rust | \`percent_encode()\` | Generic | Configurable |

### 4.2 JavaScript: The Dual-Function Model

**encodeURI() - Full URI Encoding:**

\`const uri = "https://example.com/path with spaces/resource?name=Hello World";\`
\`const encoded = encodeURI(uri);\`
\`// "https://example.com/path%20with%20spaces/resource?name=Hello%20World"\`

**encodeURIComponent() - Component Encoding:**

\`const component = "path with spaces/resource?name=Hello World";\`
\`const encoded = encodeURIComponent(component);\`
\`// "path%20with%20spaces%2Fresource%3Fname%3DHello%20World"\`

**Critical Distinction:**

| Character | \`encodeURI()\` | \`encodeURIComponent()\` |
|-----------|-----------------|-------------------------|
| \`:\` | %3A | %3A |
| \`/\` | / (preserved) | %2F |
| \`?\` | ? (preserved) | %3F |
| \`#\` | # (preserved) | %23 |
| \`&\` | & (preserved) | %26 |
| \`=\` | = (preserved) | %3D |

**Usage Guidelines:**
- Use \`encodeURIComponent()\` for individual query parameters or path segments
- Use \`encodeURI()\` for complete URLs that should remain valid URIs
- Never use \`escape()\` - it is obsolete

### 4.3 Python: The Modular Approach

**Basic Path Encoding:**

\`from urllib.parse import quote\`
\`path = quote("/path/with spaces/file name.txt", safe="/")\`
\`# "/path/with%20spaces/file%20name.txt"\`
\`component = quote("name=value&other=multi word")\`
\`# "name%3Dvalue%26other%3Dmulti%20word"\`

**Handling Query Dictionaries:**

\`from urllib.parse import urlencode, urlparse\`
\`params = {"search": "hello world", "category": "books&magazines", "page": 1}\`
\`query_string = urlencode(params)\`
\`# "search=hello+world&category=books%26magazines&page=1"\`

### 4.4 Rust: The Builder Pattern

\`use url::{Url, ParseError};\`
\`fn main() -> Result<(), ParseError> {\`
\`    let base = Url::parse("https://example.com")?;\`
\`    let mut url = base.join("/api/search")?;\`
\`    url.set_query(Some("q=rust programming&sort=popular"));\`
\`    Ok(())\`
\`}\`

### 4.5 Common Implementation Errors

| Error | Description | Solution |
|-------|-------------|----------|
| Double Encoding | Encoding already-encoded content | Normalize before encoding |
| Partial Encoding | Encoding only non-ASCII, not reserved | Use component-level functions |
| Space Handling | Using \`+\` in paths or \`%20\` in forms | Match encoding to context |
| Case Sensitivity | Mixing uppercase and lowercase hex | Normalize to uppercase |

## 5. Security Implications and Attack Vectors

### 5.1 Double-Decoding Vulnerabilities

The most dangerous vulnerability stems from inconsistent decoding across security layers:

**Attack Scenario: WAF Bypass via Double Encoding**

| Layer | Input | Transformation | Output |
|-------|-------|----------------|--------|
| Attacker | \`%2527\` | - | \`%2527\` |
| WAF (Layer 1) | \`%2527\` | Decodes \`%25\` → \`%\` | \`%27\` |
| WAF Rule Check | \`%27\` | Rule: block single quote | NOT Allowed |
| Application (Layer 2) | \`%27\` | Decodes \`%27\` → \`'\` | \`'\` |
| SQL Injection | \`' OR 1=1--\` | Executes | Breach |

**Attack Variant: Path Traversal:**

\`Input: %252F..%252F..%252Fetc%252Fpasswd\`
\`WAF Output: %2F../%2F../%2Fetc%2Fpasswd\`
\`Final: /../../../etc/passwd\`

**Defense Architecture:**
1. Decode all input at the security boundary exactly once
2. Reject inputs containing percent signs after normalization
3. Normalize paths before validation
4. Use URL libraries, never implement decoding manually

### 5.2 Normalization Vulnerabilities

**Case Sensitivity Bypass:**

| Input | Normalized | WAF Check | Result |
|-------|------------|-----------|--------|
| \`example.com/Admin\` | \`example.com/Admin\` | Block \`/admin\` | Bypassed |
| \`example.com/%41dmin\` | \`example.com/Admin\` | Block \`/admin\` | Bypassed |

**Percent-Encoding of Unreserved Characters:**

| Input | Normalized | Intended Path | Risk |
|-------|------------|---------------|------|
| \`/%7Eadmin\` | \`~/admin\` | \`/~/admin\` | Path confusion |
| \`/%2E%2E/admin\` | \`../admin\` | Directory traversal | High |

### 5.3 Unicode and Homograph Attacks

**Homograph Attack Scenario:**

| Domain | Visual Appearance | Actual Registration |
|--------|-------------------|---------------------|
| \`googIe.com\` | Looks like \`google.com\` (I vs l) | Different domain |
| \`paypa1.com\` | Looks like \`paypal.com\` (1 vs l) | Phishing |

**Defense Measures:**
1. Homograph Detection: Flag domains with mixed-script characters
2. IDN Safe Listing: Only allow verified Internationalized Domain Names
3. Punycode Display: Always show Punycode for non-ASCII domains

### 5.4 Open Redirect via Fragment Manipulation

Fragment identifiers are not sent to servers but are processed by clients. This enables open redirect attacks.

**Defense:**
1. Validate redirect URLs against allow-lists after normalization
2. Reject redirects to external domains entirely
3. Use X-Frame-Options to prevent embedding

### 5.5 Cache Poisoning via Encoding Variations

Caches may normalize URIs differently than applications:

| URI Variant | Cache Normalization | App Interpretation |
|-------------|---------------------|-------------------|
| \`/page?a=1&b=2\` | \`/page?a=1&b=2\` | Normal |
| \`/page?b=2&a=1\` | \`/page?b=2&a=1\` | Different cache entry |
| \`/page?a=1%20&b=2\` | \`/page?a=1&b=2\` | Cache poisoning |

**Defense:**
1. Use Vary header appropriately for URL-sensitive content
2. Implement query string sorting for cache keys
3. Reject non-canonical query parameter order

## 6. Internationalization and IRI

### 6.1 Internationalized Resource Identifiers (RFC 3987)

RFC 3987 extends URI syntax to support Unicode:

\`IRI = scheme ":" ihier-part [ "?" iquery ] [ "#" ifragment ]\`
\`ihier-part = "//" iauthorkey / ipath-rootless / ipath-empty\`

**Key Differences from URI:**

| Aspect | URI (RFC 3986) | IRI (RFC 3987) |
|--------|----------------|----------------|
| Character Range | ASCII subset | Full Unicode |
| Space Allowed | \`%20\` only | U+0020 (literal) |
| Chinese | \`%E4%B8%96%E7%95%8C\` | 世界 |

### 6.2 Converting Between URI and IRI

**IRI to URI (Percent-Encode Non-ASCII):**

\`def iri_to_uri(iri: str) -> str:\`
\`    result = []\`
\`    for codepoint in iri.encode('utf-8'):\`
\`        if is_uri_unreserved(codepoint):\`
\`            result.append(chr(codepoint))\`
\`        elif is_uri_reserved(codepoint):\`
\`            result.append(f'%{codepoint:02X}')\`
\`        else:\`
\`            result.append(f'%{codepoint:02X}')\`
\`    return ''.join(result)\`

**URI to IRI (Decode Non-ASCII):**

\`def uri_to_iri(uri: str) -> str:\`
\`    decoded = percent_decode(uri)\`
\`    try:\`
\`        return decoded.decode('utf-8')\`
\`    except UnicodeDecodeError:\`
\`        return uri\`

### 6.3 Browser IRI Support

| Browser | IRI Display | Punycode Handling | Security Features |
|---------|-------------|-------------------|-------------------|
| Chrome | Native script if possible | Automatic | Homograph protection |
| Firefox | Configurable | Automatic | Mixed-script warnings |
| Safari | Native script | Automatic | Domain highlighting |
| Edge | Native script | Automatic | SmartScreen integration |

## 7. URL Normalization and Equivalence

### 7.1 Normalization Algorithms

**Case Normalization:**

| Component | Rule | Example |
|-----------|------|---------|
| Scheme | Lowercase | \`HTTP://example.com\` → \`http://example.com\` |
| Host | Lowercase | \`EXAMPLE.COM\` → \`example.com\` |
| Percent-Encoded | Uppercase hex | \`%3a\` → \`%3A\` |
| Path | Case-sensitive | \`/Page\` ≠ \`/page\` |

**Percent-Encoding Normalization:**

| Input | Normalized | Rationale |
|-------|------------|-----------|
| \`%7E\` | \`~\` | Tilde is unreserved |
| \`%2D\` | \`-\` | Hyphen is unreserved |
| \`%2E\` | \`.\` | Period is unreserved |
| \`%5F\` | \`_\` | Underscore is unreserved |
| \`%3A\` | \`:\` | Colon is reserved |

**Path Segment Normalization:**

| Input | Normalized |
|-------|------------|
| \`/a/b/./c\` | \`/a/b/c\` |
| \`/a/b/../c\` | \`/a/c\` |
| \`/a/./../b\` | \`/b\` |
| \`/a/b/c/..\` | \`/a/b/\` |
| \`//a\` | \`/a\` |

### 7.2 Equivalence Comparison

| URI A | URI B | Equivalent? | Reason |
|-------|-------|-------------|--------|
| \`http://example.com\` | \`http://example.com/\` | Yes | Trailing slash ignored |
| \`http://example.com:80\` | \`http://example.com\` | Yes | Default port |
| \`http://example.com%7Ea\` | \`http://example.com~a\` | Yes | Unreserved decoded |
| \`http://EXAMPLE.COM\` | \`http://example.com\` | Yes | Host case-insensitive |
| \`http://example.com/a\` | \`http://example.com/a/\` | No | Different paths |
| \`http://example.com?a=1&b=2\` | \`http://example.com?b=2&a=1\` | No | Parameter order |

## 8. Practical Implementation Guidelines

### 8.1 URL Construction Best Practices

**The Layered Encoding Model:**

1. **Data Layer**: Raw application data (strings, objects)
2. **Component Layer**: Encode individual components using \`encodeURIComponent()\`
3. **Structure Layer**: Assemble components with delimiters (\`:\`, \`/\`, \`?\`, \`#\`)
4. **Full URI Layer**: Apply \`encodeURI()\` only if necessary

**Modern URL Constructor:**

\`const url = new URL("https://api.example.com");\`
\`url.pathname = encodeURIComponent("/search");\`
\`url.searchParams.set("query", "hello world");\`
\`url.hash = encodeURIComponent("section-1");\`

### 8.2 Validation and Sanitization

**Input Validation Rules:**

| Input Type | Validation | Example |
|------------|------------|---------|
| Scheme | Must match ABNF | Reject \`3http\` |
| Host | Valid domain/IP | Reject \`localhost.\` |
| Path | No null bytes | Reject \`%00\` |
| Query | No line breaks | Reject \`%0A/%0D\` |

**Rejecting Dangerous Patterns:**

\`def validate_url_component(component: str) -> bool:\`
\`    if '\\x00' in component:\`
\`        return False\`
\`    if any(ord(c) < 0x20 or c in '\\n\\r' for c in component):\`
\`        return False\`
\`    if '..' in component or '%2e%2e' in component.lower():\`
\`        return False\`
\`    return True\`

### 8.3 Framework-Specific Guidance

**Express.js:**

\`app.get('/user/:id', (req, res) => {\`
\`    const userId = decodeURIComponent(req.params.id);\`
\`});\`
\`app.get('/search', (req, res) => {\`
\`    const query = req.query.q;\`
\`});\`

**Django:**

\`def safe_redirect(url):\`
\`    if not url.startswith('/'):\`
\`        return None\`
\`    safe_url = iri_to_uri(url)\`
\`    return safe_url\`

**Go:**

\`func safeRedirect(nextURL string) error {\`
\`    parsed, err := url.Parse(nextURL)\`
\`    if err != nil {\`
\`        return err\`
\`    }\`
\`    if parsed.Scheme != "" && parsed.Scheme != "http" && parsed.Scheme != "https" {\`
\`        return errors.New("invalid scheme")\`
\`    }\`
\`    if parsed.Scheme != "" {\`
\`        return errors.New("absolute URLs not allowed")\`
\`    }\`
\`    return nil\`
\`}\`

### 8.4 Performance Considerations

| Operation | Complexity | Notes |
|-----------|------------|-------|
| Percent-Encode ASCII | O(n) | Single pass |
| Percent-Encode Unicode | O(n) | UTF-8 conversion overhead |
| Percent-Decode | O(n) | Lookup table for hex conversion |
| Normalization | O(n) | Multiple passes |

**Optimization Techniques:**
1. Lookup Tables: Use precomputed tables for hex conversion
2. SIMD Operations: Process multiple bytes simultaneously
3. Lazy Decoding: Decode only when necessary
4. Caching: Cache normalized forms for frequently accessed URLs

## 9. Conclusion

URL encoding represents a critical intersection of theoretical computer science and practical web engineering. The specifications embedded in RFC 3986 provide a robust framework for resource identification.

**Key Takeaways:**

1. **Character Set Theory**: Understanding reserved vs. unreserved sets prevents over-encoding and security gaps.

2. **Encoding Functions**: Use component-level encoding for data insertion, full-URI encoding for complete URLs.

3. **Security Boundaries**: Decode exactly once at the trust boundary; reject subsequent encoding attempts.

4. **Normalization**: Compare normalized URIs for equivalence; normalize before validation.

5. **Internationalization**: Handle Unicode through UTF-8 encoding; be aware of homograph attacks.

6. **Framework Integration**: Leverage built-in URL parsing libraries rather than implementing encoding manually.

**Implementation Mandate:**

For new systems, adopt these practices:
- Always use established URL parsing libraries
- Encode data at the component level before assembly
- Validate and normalize URLs at the security boundary
- Reject double-encoded inputs
- Handle internationalized content through proper UTF-8 encoding

The security of web applications depends on correct URL handling.
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
