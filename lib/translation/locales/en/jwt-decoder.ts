import type { JWTDecoderModule } from "../../types";

// English JWT Decoder module
export const jwtDecoder: JWTDecoderModule = {
  title: "Free Online JWT Decoder & Validator",
  description:
    "Decode and validate JWT tokens online for free. Analyze JWT headers, payloads, and verify signatures.",
  subtitle:
    "Our JWT decoder helps developers decode, validate, and analyze JWT tokens. Perfect for authentication debugging and API development.",
  inputText: "JWT Token",
  inputPlaceholder: "Enter your JWT token here...",
  decodeButton: "Decode JWT",
  loadExampleButton: "Load Example",
  clearButton: "Clear",
  headerTitle: "Header",
  payloadTitle: "Payload",
  signatureTitle: "Signature",
  validToken: "Valid Token",
  invalidToken: "Invalid Token",
  expiredToken: "Expired Token",
  notExpired: "Not Expired",
  copyButton: "Copy",
  claims: "Claims",
  expiresAt: "Expires At",
  issuedAt: "Issued At",
  notBefore: "Not Before",
  featuresTitle: "Features",
  decodingFeature: "JWT Decoding",
  decodingDescription:
    "Decode JWT tokens into readable header and payload sections",
  validationFeature: "Token Validation",
  validationDescription: "Validate JWT signatures and check expiration status",
  analysisFeature: "Token Analysis",
  analysisDescription: "Analyze JWT structure and extract key information",
  faqTitle: "FAQ",
  faq: {
    what: {
      question: "What is a JWT?",
      answer:
        "JSON Web Token (JWT) is an open standard for securely transmitting information between parties as a JSON object. It's commonly used for authentication and information exchange.",
    },
    safe: {
      question: "Is it safe to use JWT decoder?",
      answer:
        "Yes, our JWT decoder works entirely in your browser. No data is sent to our servers, ensuring your tokens remain private and secure.",
    },
    sections: {
      question: "What are the three sections of a JWT?",
      answer:
        "A JWT consists of three parts: Header (algorithm and token type), Payload (claims and data), and Signature (verification).",
    },
    verify: {
      question: "How can I verify a JWT signature?",
      answer:
        "To verify a JWT signature, you need the secret key used to sign the token. Our decoder shows the signature but cannot verify it without the secret.",
    },
    claims: {
      question: "What are JWT claims?",
      answer:
        "JWT claims are pieces of information asserted about a subject. Common claims include 'iss' (issuer), 'sub' (subject), 'exp' (expiration), and 'iat' (issued at).",
    },
  },
  valid: "Valid",
  expired: "Expired",
  subject: "Subject",
  algorithm: "Algorithm",
  type: "Type",
  note: "Note",
  noteDescription:
    "Token validation requires the secret key for signature verification",
  faqSectionTitle: "Frequently Asked Questions",
};
