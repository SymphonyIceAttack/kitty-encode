"use client";

import { Md5GuideStructuredData } from "@/components/structured-data/blog-post";

export function Md5GuideContent() {
  return (
    <>
      <Md5GuideStructuredData />
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <article className="prose prose-lg max-w-none">
          <h1>Learn MD5 Hashing: Complete Tutorial</h1>

          <p className="lead">
            MD5 (Message Digest Algorithm 5) is a widely used cryptographic hash
            function that produces a 128-bit hash value. While it's no longer
            considered secure for cryptographic purposes, it remains useful for
            data integrity verification.
          </p>

          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h3>⚠️ Security Warning</h3>
            <p>
              MD5 is cryptographically broken and should NOT be used for
              password hashing or security-sensitive applications. Use SHA-256,
              bcrypt, or Argon2 instead.
            </p>
          </div>

          <h2>What is MD5?</h2>
          <p>
            MD5 is a hash function that takes an input (or 'message') and
            returns a fixed-size string of bytes, typically represented as a
            hexadecimal number. The output is always 32 characters long for any
            input.
          </p>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3>Example</h3>
            <p>
              <strong>Input:</strong> "Hello World"
            </p>
            <p>
              <strong>MD5 Hash:</strong> b10a8db164e0754105b7a99be72e3fe5
            </p>
          </div>

          <h2>How MD5 Works</h2>
          <ol>
            <li>
              <strong>Padding:</strong> Add padding bits to make the message
              length congruent to 448 mod 512
            </li>
            <li>
              <strong>Length:</strong> Append the original message length as a
              64-bit value
            </li>
            <li>
              <strong>Processing:</strong> Divide into 512-bit blocks and
              process through compression function
            </li>
            <li>
              <strong>Output:</strong> Produce 128-bit (16-byte) hash value
            </li>
          </ol>

          <h2>Legitimate Use Cases</h2>

          <h3>File Integrity Verification</h3>
          <p>Verify that downloaded files haven't been corrupted:</p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <code>{`File: document.pdf
Expected MD5: a1b2c3d4e5f6...
Actual MD5:   a1b2c3d4e5f6...
Status: ✓ File verified`}</code>
          </div>

          <h3>Data Deduplication</h3>
          <p>Quickly identify duplicate files by comparing their MD5 hashes.</p>

          <h3>Non-Critical Checksums</h3>
          <p>Basic data integrity checks where security isn't a concern.</p>

          <h2>MD5 in Different Languages</h2>

          <h3>JavaScript (Node.js)</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <code>{`const crypto = require('crypto');

const hash = crypto.createHash('md5').update('Hello World').digest('hex');
console.log(hash); // b10a8db164e0754105b7a99be72e3fe5`}</code>
          </div>

          <h3>Python</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <code>{`import hashlib

hash_object = hashlib.md5(b'Hello World')
print(hash_object.hexdigest())  # b10a8db164e0754105b7a99be72e3fe5`}</code>
          </div>

          <h3>Java</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <code>{`import java.security.MessageDigest;
import java.math.BigInteger;

MessageDigest md = MessageDigest.getInstance("MD5");
byte[] messageDigest = md.digest("Hello World".getBytes());
BigInteger no = new BigInteger(1, messageDigest);
System.out.println(no.toString(16));`}</code>
          </div>

          <h2>Security Limitations</h2>

          <h3>Collision Vulnerabilities</h3>
          <ul>
            <li>
              <strong>Birthday Attack:</strong> Can find collisions with 2^64
              operations
            </li>
            <li>
              <strong>Chosen-Prefix Attacks:</strong> More sophisticated
              collision methods exist
            </li>
            <li>
              <strong>Practical Exploits:</strong> Real-world collision attacks
              have been demonstrated
            </li>
          </ul>

          <h3>Rainbow Tables</h3>
          <p>Pre-computed hash tables can quickly reverse common MD5 hashes.</p>

          <h2>Better Alternatives</h2>

          <h3>For Password Hashing</h3>
          <ul>
            <li>
              <strong>bcrypt:</strong> Designed for password hashing with salt
            </li>
            <li>
              <strong>Argon2:</strong> Modern, memory-hard password hashing
            </li>
            <li>
              <strong>scrypt:</strong> Memory-intensive key derivation
            </li>
          </ul>

          <h3>For General Hashing</h3>
          <ul>
            <li>
              <strong>SHA-256:</strong> Part of SHA-2 family, widely adopted
            </li>
            <li>
              <strong>SHA-3:</strong> Latest NIST-approved hash standard
            </li>
            <li>
              <strong>BLAKE2/3:</strong> Modern, fast cryptographic hashes
            </li>
          </ul>

          <h2>Best Practices</h2>
          <ol>
            <li>
              <strong>Never use for passwords:</strong> Use dedicated password
              hashing algorithms
            </li>
            <li>
              <strong>Add salt:</strong> If you must use MD5, always add random
              salt
            </li>
            <li>
              <strong>Verify integrity only:</strong> Use for basic file/date
              verification
            </li>
            <li>
              <strong>Consider alternatives:</strong> Use SHA-256 for most use
              cases
            </li>
            <li>
              <strong>Stay updated:</strong> Keep up with cryptographic
              recommendations
            </li>
          </ol>

          <h2>Tools and Resources</h2>
          <p>
            Use our <a href="/tools/md5-generator">MD5 Hash Generator</a> tool
            to quickly generate MD5 hashes online. Remember to use stronger
            algorithms for security-critical applications.
          </p>

          <h2>Conclusion</h2>
          <p>
            While MD5 is no longer suitable for security applications, it
            remains useful for data integrity verification and non-critical
            checksums. Always choose the right tool for your specific use case
            and stay informed about cryptographic best practices.
          </p>
        </article>
      </div>
    </>
  );
}
