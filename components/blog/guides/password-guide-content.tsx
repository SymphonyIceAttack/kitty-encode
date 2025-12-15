"use client";

import { PasswordGuideStructuredData } from "@/components/structured-data/blog-post";

export function PasswordGuideContent() {
  return (
    <>
      <PasswordGuideStructuredData />
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <article className="prose prose-lg max-w-none">
          <h1>Learn Password Generation: Security Best Practices</h1>

          <p className="lead">
            Creating strong, secure passwords is crucial for protecting your
            digital assets. This guide covers password entropy, generation
            methods, and security best practices.
          </p>

          <h2>What Makes a Password Strong?</h2>
          <p>
            A strong password is one that is difficult for both humans and
            computers to guess or crack. The strength of a password is measured
            by its entropy - the amount of uncertainty or randomness it
            contains.
          </p>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3>Password Entropy</h3>
            <p>
              Entropy is calculated as: <strong>log₂(R^N)</strong>
            </p>
            <p>Where R = character set size, N = password length</p>
          </div>

          <h2>Password Requirements</h2>

          <h3>Minimum Requirements</h3>
          <ul>
            <li>
              <strong>Length:</strong> At least 12 characters (16+ recommended)
            </li>
            <li>
              <strong>Character variety:</strong> Mix of uppercase, lowercase,
              numbers, symbols
            </li>
            <li>
              <strong>Unpredictability:</strong> No dictionary words or personal
              information
            </li>
            <li>
              <strong>Uniqueness:</strong> Different password for each account
            </li>
          </ul>

          <h3>Advanced Requirements</h3>
          <ul>
            <li>
              <strong>Length:</strong> 20+ characters for high-security accounts
            </li>
            <li>
              <strong>Randomness:</strong> Use cryptographically secure random
              generation
            </li>
            <li>
              <strong>No patterns:</strong> Avoid sequential characters or
              repeated patterns
            </li>
            <li>
              <strong>Regular updates:</strong> Change passwords periodically
              for critical accounts
            </li>
          </ul>

          <h2>Character Sets and Entropy</h2>

          <h3>Character Pool Sizes</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <code>{`Lowercase letters (a-z):     26 characters
Uppercase letters (A-Z):     26 characters
Numbers (0-9):              10 characters
Common symbols (!@#$):      10 characters
Extended symbols:           32+ characters

Total with all:            94+ characters`}</code>
          </div>

          <h3>Entropy Examples</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <code>{`8 characters, mixed case + numbers: ~47 bits
12 characters, all types:           ~79 bits
16 characters, all types:          ~106 bits
20 characters, all types:          ~132 bits`}</code>
          </div>

          <h2>Password Generation Methods</h2>

          <h3>1. Random Generation (Recommended)</h3>
          <p>Use cryptographically secure random number generators:</p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <code>{`// JavaScript
const crypto = require('crypto');
function generatePassword(length = 16) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(crypto.randomInt(0, chars.length));
  }
  return password;
}`}</code>
          </div>

          <h3>2. Passphrase Method</h3>
          <p>Combine multiple random words with separators:</p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <code>{`Format: word-separator-word-separator-word
Example: ocean-pencil-mountain-7-trust
Entropy: Very high due to word combinations`}</code>
          </div>

          <h3>3. Pattern-Based Generation</h3>
          <p>Use patterns that are memorable but unpredictable:</p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <code>{`Pattern: 2words + 2numbers + symbol + 1word
Example: BlueBird47!Forest
Note: Less secure than pure random generation`}</code>
          </div>

          <h2>Password Storage and Management</h2>

          <h3>Never Store Plain Text</h3>
          <ul>
            <li>
              <strong>Hashing:</strong> Store only password hashes, never plain
              text
            </li>
            <li>
              <strong>Salting:</strong> Add unique salt to each password before
              hashing
            </li>
            <li>
              <strong>Strong algorithms:</strong> Use bcrypt, Argon2, or scrypt
            </li>
          </ul>

          <h3>Password Managers</h3>
          <p>Use dedicated password managers to:</p>
          <ul>
            <li>Generate strong passwords automatically</li>
            <li>Store passwords securely encrypted</li>
            <li>Fill in passwords automatically</li>
            <li>Sync across devices securely</li>
          </ul>

          <h2>Common Password Mistakes</h2>

          <h3>❌ Weak Patterns to Avoid</h3>
          <ul>
            <li>
              <strong>Sequential:</strong> 123456789, abcdefg
            </li>
            <li>
              <strong>Common substitutions:</strong> P@ssw0rd, L33t speak
            </li>
            <li>
              <strong>Personal info:</strong> Birthdates, names, addresses
            </li>
            <li>
              <strong>Keyboard patterns:</strong> qwertyui, asdfghjkl
            </li>
            <li>
              <strong>Single character type:</strong> Only letters or only
              numbers
            </li>
          </ul>

          <h3>✅ Strong Password Examples</h3>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <code>{`Strong: 8K#mP2$vL9@qR7wX5z
Stronger: ocean-pencil-mountain-7-trust
Strongest: Tr0ub4dor&3 (xkcd style, but add complexity)`}</code>
          </div>

          <h2>Multi-Factor Authentication</h2>
          <p>
            Even strong passwords can be compromised. Always enable MFA when
            available:
          </p>
          <ul>
            <li>
              <strong>Time-based codes:</strong> TOTP apps like Google
              Authenticator
            </li>
            <li>
              <strong>SMS codes:</strong> Less secure but better than nothing
            </li>
            <li>
              <strong>Hardware keys:</strong> FIDO2/U2F keys for maximum
              security
            </li>
            <li>
              <strong>Biometric:</strong> Fingerprint, face recognition
            </li>
          </ul>

          <h2>Password Policy Best Practices</h2>
          <ol>
            <li>
              <strong>Minimum length:</strong> 12+ characters
            </li>
            <li>
              <strong>Complexity requirements:</strong> Mix of character types
            </li>
            <li>
              <strong>No reuse:</strong> Prevent password reuse across accounts
            </li>
            <li>
              <strong>Regular rotation:</strong> Change passwords for critical
              accounts
            </li>
            <li>
              <strong>Breach checking:</strong> Monitor against known breaches
            </li>
            <li>
              <strong>Education:</strong> Train users on password security
            </li>
          </ol>

          <h2>Tools and Resources</h2>
          <p>
            Use our <a href="/tools/password-generator">Password Generator</a>{" "}
            tool to create strong, secure passwords with customizable options
            including length, character types, and exclusion patterns.
          </p>

          <h2>Conclusion</h2>
          <p>
            Password security is fundamental to protecting digital assets. By
            following these best practices - using strong, unique passwords,
            enabling multi-factor authentication, and using password managers -
            you can significantly improve your security posture and protect
            against common attack vectors.
          </p>
        </article>
      </div>
    </>
  );
}
