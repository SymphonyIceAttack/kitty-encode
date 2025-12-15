"use client";

import { UrlEncodingGuideStructuredData } from "@/components/structured-data/blog-post";

export function UrlEncodingGuideContent() {
  return (
    <>
      <UrlEncodingGuideStructuredData />
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <article className="prose prose-lg max-w-none">
          <h1>Learn URL Encoding: The Complete Guide</h1>

          <p className="lead">
            URL encoding is a fundamental concept in web development that
            ensures special characters and spaces can be safely transmitted over
            the internet. This comprehensive guide will teach you everything you
            need to know about URL encoding.
          </p>

          <h2>What is URL Encoding?</h2>
          <p>
            URL encoding converts characters into a format that can be safely
            transmitted over the Internet. It replaces unsafe or reserved
            characters with a '%' followed by two hexadecimal digits
            representing the character's ASCII or UTF-8 code.
          </p>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3>Example</h3>
            <p>
              Instead of: <code>https://example.com/search?q=hello world</code>
            </p>
            <p>
              We encode it as:{" "}
              <code>https://example.com/search?q=hello%20world</code>
            </p>
          </div>

          <h2>Why Do We Need URL Encoding?</h2>
          <ul>
            <li>
              <strong>Safety:</strong> Prevents interpretation of special
              characters as delimiters or control characters
            </li>
            <li>
              <strong>Compatibility:</strong> Ensures URLs work across different
              systems and browsers
            </li>
            <li>
              <strong>Standards Compliance:</strong> Follows RFC 3986
              specifications for URI syntax
            </li>
            <li>
              <strong>Data Integrity:</strong> Preserves the exact meaning of
              special characters in URLs
            </li>
          </ul>

          <h2>Characters That Need Encoding</h2>

          <h3>Reserved Characters</h3>
          <p>These characters have special meanings in URLs:</p>
          <ul>
            <li>
              <code>!</code> <code>#</code> <code>$</code> <code>&amp;</code>{" "}
              <code>'</code> <code>(</code> <code>)</code>
            </li>
            <li>
              <code>*</code> <code>+</code> <code>,</code> <code>;</code>{" "}
              <code>=</code>
            </li>
            <li>
              <code>?</code> <code>@</code> <code>[</code> <code>]</code>
            </li>
          </ul>

          <h3>Unreserved Characters</h3>
          <p>These characters don't need encoding (alphanumeric):</p>
          <ul>
            <li>Uppercase letters: A-Z</li>
            <li>Lowercase letters: a-z</li>
            <li>Numbers: 0-9</li>
            <li>
              Special: <code>-</code> <code>_</code> <code>.</code>{" "}
              <code>~</code>
            </li>
          </ul>

          <h2>URL Encoding in Different Programming Languages</h2>

          <h3>JavaScript</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <code>{`const encoded = encodeURIComponent("hello world & special chars!");
// Result: "hello%20world%20%26%20special%20chars!"`}</code>
          </div>

          <h3>Python</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <code>{`import urllib.parse
encoded = urllib.parse.quote("hello world & special chars!")
# Result: 'hello%20world%20%26%20special%20chars%21'`}</code>
          </div>

          <h2>Common Use Cases</h2>

          <h3>Query Parameters</h3>
          <p>When passing data through URL query strings:</p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <code>{`https://search.com?q=John%20Doe
https://api.com/users?name=Jane%20Smith&email=jane%40example.com`}</code>
          </div>

          <h2>Best Practices</h2>
          <ol>
            <li>
              <strong>Always encode user input</strong> before including it in
              URLs
            </li>
            <li>
              <strong>Use appropriate encoding functions</strong> for your
              programming language
            </li>
            <li>
              <strong>Test with special characters</strong> to ensure proper
              handling
            </li>
            <li>
              <strong>Consider URL structure</strong> - encode only what's
              necessary
            </li>
            <li>
              <strong>Validate URLs</strong> after encoding to ensure they're
              still functional
            </li>
          </ol>

          <h2>Common Mistakes to Avoid</h2>
          <ul>
            <li>Double encoding already encoded strings</li>
            <li>Encoding entire URLs instead of just parameters</li>
            <li>Using the wrong encoding function for the context</li>
            <li>Not handling Unicode characters properly</li>
            <li>Forgetting to decode URLs when reading them</li>
          </ul>

          <h2>Tools and Resources</h2>
          <p>
            Use our <a href="/">URL Encoder</a> tool to quickly encode and
            decode URLs online. It supports both modern encodeURIComponent and
            legacy encodeURI methods.
          </p>

          <h2>Conclusion</h2>
          <p>
            URL encoding is essential for creating robust web applications. By
            understanding when and how to encode URLs, you can prevent common
            issues with special characters, ensure cross-platform compatibility,
            and follow web standards. Remember to always encode user input and
            test your URLs with various character sets to ensure they work
            correctly.
          </p>
        </article>
      </div>
    </>
  );
}
