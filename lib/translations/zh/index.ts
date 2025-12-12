import { base64Encoder } from "./base64-encoder";
import { common } from "./common";
import { hashGenerator } from "./hash-generator";
import { home } from "./home";
import { jsonFormatter } from "./json-formatter";
import { layout } from "./layout";
import { qrGenerator } from "./qr-generator";
import { tools } from "./tools";
import { urlEncoder } from "./url-encoder";

export const translations_zh: { [key: string]: string } = {
  ...common,
  ...home,
  ...layout,
  ...tools,
  ...jsonFormatter,
  ...urlEncoder,
  ...base64Encoder,
  ...hashGenerator,
  ...qrGenerator,
};

export default translations_zh;
