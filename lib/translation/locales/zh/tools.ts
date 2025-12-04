import type { ToolsModule } from "../../types";

// Chinese Tools module
export const tools: ToolsModule = {
  list: {
    jwtDecoder: {
      title: "JWT解码器",
      desc: "解码和验证JWT令牌",
    },
    urlEncoder: {
      title: "URL编码/解码器",
      desc: "安全地编码和解码URL",
    },
    jsonFormatter: {
      title: "JSON格式化器",
      desc: "格式化、验证和压缩JSON",
    },
    hashGenerator: {
      title: "哈希生成器",
      desc: "在线生成安全哈希",
    },
    base64: {
      title: "Base64编码/解码器",
      desc: "编码和解码Base64字符串",
    },
    colorPalette: {
      title: "调色板生成器",
      desc: "生成美观的调色板",
    },
    qrGenerator: {
      title: "二维码生成器",
      desc: "为文本和URL生成二维码",
    },
    sqlFormatter: {
      title: "SQL格式化器",
      desc: "格式化和美化SQL查询",
    },
    regexTester: {
      title: "正则表达式测试器",
      desc: "测试和验证正则表达式",
    },
  },
};
