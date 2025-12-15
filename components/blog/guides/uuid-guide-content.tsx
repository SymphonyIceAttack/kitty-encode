"use client";

import { UuidGuideStructuredData } from "@/components/structured-data/blog-post";

export function UuidGuideContent() {
  return (
    <>
      <UuidGuideStructuredData />
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <article className="prose prose-lg max-w-none">
          <h1>Learn UUID Generation: A Developer's Guide</h1>

          <p className="lead">
            UUIDs (Universally Unique Identifiers) are 128-bit identifiers that
            guarantee uniqueness across both time and space. Learn how to use
            them effectively in your applications.
          </p>

          <h2>What is a UUID?</h2>
          <p>
            A UUID is a 128-bit identifier represented as a 36-character string
            (32 hexadecimal digits plus 4 hyphens). The chance of generating
            duplicate UUIDs is so low that it's considered practically
            impossible for most applications.
          </p>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3>Example UUIDs</h3>
            <p>
              <strong>Version 4:</strong> 123e4567-e89b-12d3-a456-426614174000
            </p>
            <p>
              <strong>Version 7:</strong> 018f1a9c-7c5d-7b8e-9f0a-1b2c3d4e5f6a
            </p>
          </div>

          <h2>UUID Versions</h2>

          <h3>UUID v1 (Time-based)</h3>
          <ul>
            <li>Based on timestamp and MAC address</li>
            <li>Sortable by creation time</li>
            <li>Privacy concern: reveals MAC address</li>
            <li>Deprecated for most uses</li>
          </ul>

          <h3>UUID v4 (Random)</h3>
          <ul>
            <li>Uses random or pseudo-random numbers</li>
            <li>Most commonly used version</li>
            <li>No temporal or location information</li>
            <li>Good for general unique identification</li>
          </ul>

          <h3>UUID v7 (Timestamp-based)</h3>
          <ul>
            <li>Combines timestamp with random data</li>
            <li>Sortable and time-ordered</li>
            <li>No privacy concerns</li>
            <li>Recommended for database primary keys</li>
          </ul>

          <h2>When to Use UUIDs</h2>

          <h3>Database Primary Keys</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p>
              <strong>Benefits:</strong>
            </p>
            <ul>
              <li>No need for centralized ID generation</li>
              <li>Easy to merge data from different databases</li>
              <li>Prevents enumeration attacks</li>
              <li>Works well in distributed systems</li>
            </ul>
          </div>

          <h3>Session IDs</h3>
          <p>
            Generate unique session identifiers that can't be easily guessed or
            enumerated.
          </p>

          <h3>File Names</h3>
          <p>
            Create unique file names that avoid conflicts in distributed storage
            systems.
          </p>

          <h3>API Keys</h3>
          <p>Generate unique API keys for authentication and authorization.</p>

          <h2>UUID in Different Languages</h2>

          <h3>JavaScript</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <code>{`// Using crypto.randomUUID() (modern browsers)
const uuid = crypto.randomUUID();
console.log(uuid);

// Using uuid library
import { v4 as uuidv4 } from 'uuid';
const uuid = uuidv4();`}</code>
          </div>

          <h3>Python</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <code>{`import uuid

# UUID v4 (random)
uuid_v4 = uuid.uuid4()
print(uuid_v4)

# UUID v7 (timestamp-based)
uuid_v7 = uuid.uuid7()
print(uuid_v7)`}</code>
          </div>

          <h3>Java</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <code>{`import java.util.UUID;

public class UUIDExample {
    public static void main(String[] args) {
        UUID uuid = UUID.randomUUID();
        System.out.println(uuid.toString());
    }
}`}</code>
          </div>

          <h2>Database Considerations</h2>

          <h3>UUID v7 vs UUID v4</h3>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p>
              <strong>UUID v7 Advantages:</strong>
            </p>
            <ul>
              <li>Time-ordered entries in database</li>
              <li>Better B-tree index performance</li>
              <li>Natural sorting by creation time</li>
              <li>No need for separate created_at column</li>
            </ul>
          </div>

          <h3>Storage Size</h3>
          <ul>
            <li>
              <strong>String format:</strong> 36 bytes
            </li>
            <li>
              <strong>Binary format:</strong> 16 bytes
            </li>
            <li>
              <strong>Performance impact:</strong> Minimal for most applications
            </li>
          </ul>

          <h2>Best Practices</h2>
          <ol>
            <li>
              <strong>Use UUID v7 for databases:</strong> Better index
              performance
            </li>
            <li>
              <strong>Store as binary:</strong> Save space in databases
            </li>
            <li>
              <strong>Validate input:</strong> Ensure proper UUID format
            </li>
            <li>
              <strong>Consider alternatives:</strong> Sometimes auto-increment
              IDs are sufficient
            </li>
            <li>
              <strong>Test collision probability:</strong> Understand your
              application's requirements
            </li>
          </ol>

          <h2>Common Patterns</h2>

          <h3>API Responses</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <code>{`{
  "userId": "123e4567-e89b-12d3-a456-426614174000",
  "sessionId": "987fcdeb-51a2-43d7-9e8f-765432109abc"
}`}</code>
          </div>

          <h3>Database Schema</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <code>{`CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);`}</code>
          </div>

          <h2>Tools and Resources</h2>
          <p>
            Use our <a href="/tools/uuid-generator">UUID Generator</a> tool to
            quickly generate UUIDs online. It supports v4, v7, and v1 versions
            with various output formats.
          </p>

          <h2>Conclusion</h2>
          <p>
            UUIDs are essential for distributed systems and modern applications.
            By choosing the right version (usually v7 for databases) and
            following best practices, you can create robust, scalable systems
            that handle unique identification efficiently.
          </p>
        </article>
      </div>
    </>
  );
}
