import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteUrl;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // 禁止访问管理员页面和API端点（如果存在）
      disallow: ["/admin", "/api", "/private", "/_next", "/assets", "/static"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
