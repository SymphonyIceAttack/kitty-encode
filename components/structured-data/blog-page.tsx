import type { Blog, WithContext } from "schema-dts";
import { siteUrl } from "@/lib/config";

export function BlogPageStructuredData() {
  const blogSchema: WithContext<Blog> = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "KittyEncode Developer Guides",
    description:
      "Developer guides, tutorials, and learning resources for encoding tools and developer utilities",
    url: `${siteUrl}/en/blog`,
    publisher: {
      "@type": "Organization",
      name: "KittyEncode",
      url: siteUrl,
    },
    blogPost: getBlogPosts(),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(blogSchema),
      }}
    />
  );
}

interface BlogPost {
  "@type": "BlogPosting";
  headline: string;
  description: string;
  datePublished: string;
  author: {
    "@type": "Organization";
    name: string;
  };
  url: string;
}

function getBlogPosts(): BlogPost[] {
  return [
    {
      "@type": "BlogPosting",
      headline: "Learn URL Encoding: The Complete Guide",
      description:
        "Master URL encoding principles, use cases, and best practices. Learn why URL encoding is essential and how to use it correctly across different programming languages.",
      datePublished: "2024-12-15",
      author: {
        "@type": "Organization",
        name: "Dev Team",
      },
      url: `${siteUrl}/en/blog/url-encoding-guide`,
    },
    {
      "@type": "BlogPosting",
      headline: "Learn Base64 Encoding: From Basics to Advanced",
      description:
        "Explore how Base64 encoding works and its practical applications in image embedding, data transmission, and API authentication.",
      datePublished: "2024-12-14",
      author: {
        "@type": "Organization",
        name: "Dev Team",
      },
      url: `${siteUrl}/en/blog/base64-guide`,
    },
    {
      "@type": "BlogPosting",
      headline: "Learn MD5 Hashing: Complete Tutorial",
      description:
        "A comprehensive guide to MD5 hashing algorithm, including how it works, security considerations, and practical use cases like file verification and checksums.",
      datePublished: "2024-12-13",
      author: {
        "@type": "Organization",
        name: "Security Team",
      },
      url: `${siteUrl}/en/blog/md5-guide`,
    },
    {
      "@type": "BlogPosting",
      headline: "Learn UUID Generation: A Developer's Guide",
      description:
        "Master UUID generation with this complete guide. Understand UUID versions (v1, v4, v7), best practices for database primary keys, and distributed systems.",
      datePublished: "2024-12-12",
      author: {
        "@type": "Organization",
        name: "Dev Team",
      },
      url: `${siteUrl}/en/blog/uuid-guide`,
    },
    {
      "@type": "BlogPosting",
      headline: "Learn Password Generation: Security Best Practices",
      description:
        "Create strong, secure passwords with our comprehensive guide. Learn about password entropy, generation algorithms, and security recommendations.",
      datePublished: "2024-12-11",
      author: {
        "@type": "Organization",
        name: "Security Team",
      },
      url: `${siteUrl}/en/blog/password-guide`,
    },
    {
      "@type": "BlogPosting",
      headline: "Learn Character Encoding: UTF-8, GBK & Beyond",
      description:
        "Understand character encoding systems, fix garbled text issues, and convert between different encodings like UTF-8, GBK, and Unicode.",
      datePublished: "2024-12-10",
      author: {
        "@type": "Organization",
        name: "Dev Team",
      },
      url: `${siteUrl}/en/blog/encoding-guide`,
    },
  ];
}
