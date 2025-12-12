// fr translation module
import { base64Encoder } from "./base64-encoder";
import { common } from "./common";
import { hashGenerator } from "./hash-generator";
import { home } from "./home";
import { jsonFormatter } from "./json-formatter";
import { layout } from "./layout";
import { qrGenerator } from "./qr-generator";
import { tools } from "./tools";
import { urlEncoder } from "./url-encoder";

export { base64Encoder } from "./base64-encoder";
export { common } from "./common";
export { hashGenerator } from "./hash-generator";
export { home } from "./home";
export { jsonFormatter } from "./json-formatter";
export { layout } from "./layout";
export { qrGenerator } from "./qr-generator";
export { tools } from "./tools";
export { urlEncoder } from "./url-encoder";

// Backward compatibility: maintain old export style
export const translations_fr: { [key: string]: string } = {
  // Merge all module translations into one object for backward compatibility
  ...common,
  ...home,
  ...tools,
  ...jsonFormatter,
  ...urlEncoder,
  ...layout,
  ...base64Encoder,
  ...hashGenerator,
  ...qrGenerator,
};

export default translations_fr;
