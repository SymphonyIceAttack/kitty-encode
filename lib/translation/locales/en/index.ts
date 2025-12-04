import type { Translations } from "../../types";
import { base64 } from "./base64";
import { colorPalette } from "./color-palette";
import { common } from "./common";
import { footer } from "./footer";
import { hashGenerator } from "./hash-generator";
import { home } from "./home";
import { jsonFormatter } from "./json-formatter";
import { jwtDecoder } from "./jwt-decoder";
import { metadata } from "./metadata";
import { qrGenerator } from "./qr-generator";
import { regexTester } from "./regex-tester";
import { sqlFormatter } from "./sql-formatter";
import { tools } from "./tools";
import { urlEncoder } from "./url-encoder";

// English translations
export const en: Translations = {
  common,
  home,
  tools,
  urlEncoder,
  sqlFormatter,
  jwtDecoder,
  jsonFormatter,
  hashGenerator,
  base64,
  colorPalette,
  qrGenerator,
  regexTester,
  footer,
  metadata,
};
