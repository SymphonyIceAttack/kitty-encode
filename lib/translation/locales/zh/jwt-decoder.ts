import type { JWTDecoderModule } from "../../types";

// 中文 JWT 解码器模块
export const jwtDecoder: JWTDecoderModule = {
  title: "免费在线JWT解码器与验证器",
  description: "免费在线解码和验证JWT令牌。分析JWT头部、负载并验证签名。",
  subtitle:
    "我们的JWT解码器帮助开发者解码、验证和分析JWT令牌。非常适合身份验证调试和API开发。",
  inputText: "JWT令牌",
  inputPlaceholder: "在此输入您的JWT令牌...",
  decodeButton: "解码JWT",
  loadExampleButton: "加载示例",
  clearButton: "清除",
  headerTitle: "头部",
  payloadTitle: "负载",
  signatureTitle: "签名",
  validToken: "有效令牌",
  invalidToken: "无效令牌",
  expiredToken: "过期令牌",
  notExpired: "未过期",
  copyButton: "复制",
  claims: "声明",
  expiresAt: "过期时间",
  issuedAt: "签发时间",
  notBefore: "生效时间",
  featuresTitle: "功能",
  decodingFeature: "JWT解码",
  decodingDescription: "将JWT令牌解码为可读的头部和负载部分",
  validationFeature: "令牌验证",
  validationDescription: "验证JWT签名并检查过期状态",
  analysisFeature: "令牌分析",
  analysisDescription: "分析JWT结构并提取关键信息",
  faqTitle: "常见问题",
  faq: {
    what: {
      question: "什么是JWT？",
      answer:
        "JSON Web Token (JWT) 是一个开放标准，用于在各方之间安全地传输信息作为JSON对象。它通常用于身份验证和信息交换。",
    },
    safe: {
      question: "使用JWT解码器安全吗？",
      answer:
        "是的，我们的JWT解码器完全在您的浏览器中运行。不会向我们的服务器发送任何数据，确保您的令牌保持私密和安全。",
    },
    sections: {
      question: "JWT的三个部分是什么？",
      answer:
        "JWT由三个部分组成：头部（算法和令牌类型）、负载（声明和数据）和签名（验证）。",
    },
    verify: {
      question: "如何验证JWT签名？",
      answer:
        "要验证JWT签名，您需要用于签名令牌的密钥。我们的解码器显示签名，但没有密钥就无法验证。",
    },
    claims: {
      question: "什么是JWT声明？",
      answer:
        "JWT声明是关于主题声明的信息片段。常见声明包括'iss'（签发者）、'sub'（主题）、'exp'（过期时间）和'iat'（签发时间）。",
    },
  },
  valid: "有效",
  expired: "已过期",
  subject: "主题",
  algorithm: "算法",
  type: "类型",
  note: "注意",
  noteDescription: "令牌验证需要用于签名验证的密钥",
  faqSectionTitle: "常见问题解答",
};
