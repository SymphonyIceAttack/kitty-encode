"use client";

import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function BreadcrumbNav({ items, className = "" }: BreadcrumbNavProps) {
  return (
    <nav
      className={`flex items-center gap-2 text-sm text-muted-foreground ${className}`}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center gap-2">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function BlogBreadcrumbNav() {
  return (
    <BreadcrumbNav
      items={[
        { label: "Developer Guides", href: "/blog" },
        { label: "All Tutorials" },
      ]}
      className="mb-6"
    />
  );
}

export function ArticleBreadcrumbNav({ title }: { title: string }) {
  return (
    <nav
      className="flex items-center gap-2 text-sm text-muted-foreground mb-6"
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center gap-2 flex-wrap">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        <li className="flex items-center gap-2">
          <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
          <Link
            href="/blog"
            className="hover:text-foreground transition-colors"
          >
            Developer Guides
          </Link>
        </li>
        <li className="flex items-center gap-2">
          <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
          <span className="text-foreground font-medium">{title}</span>
        </li>
      </ol>
    </nav>
  );
}
