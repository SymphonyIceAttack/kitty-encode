import type { ToolsModule } from "../../types";

// English Tools module
export const tools: ToolsModule = {
  list: {
    jwtDecoder: {
      title: "JWT Decoder",
      desc: "Decode and verify JWT tokens",
    },
    urlEncoder: {
      title: "URL Encoder/Decoder",
      desc: "Encode and decode URLs safely",
    },
    jsonFormatter: {
      title: "JSON Formatter",
      desc: "Format, validate, and minify JSON",
    },
    hashGenerator: {
      title: "Hash Generator",
      desc: "Generate secure hashes online",
    },
    base64: {
      title: "Base64 Encoder/Decoder",
      desc: "Encode and decode Base64 strings",
    },
    colorPalette: {
      title: "Color Palette Generator",
      desc: "Generate beautiful color palettes",
    },
    qrGenerator: {
      title: "QR Code Generator",
      desc: "Generate QR codes for text and URLs",
    },
    sqlFormatter: {
      title: "SQL Formatter",
      desc: "Format and beautify SQL queries",
    },
    regexTester: {
      title: "Regex Tester",
      desc: "Test and validate regular expressions",
    },
  },
};
