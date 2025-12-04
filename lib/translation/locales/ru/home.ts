import type { HomeModule } from "../../types";

// English Home module
export const home: HomeModule = {
  hero: {
    title: "Essential Developer Tools",
    subtitle: "Free, fast, and privacy-focused utilities for developers",
    description:
      "All tools work locally in your browser. No data is sent to our servers.",
  },
  tools: {
    title: "Popular Tools",
  },
  about: {
    title: "Why Choose Our Tools?",
    privacy: {
      title: "Privacy First",
      desc: "All processing happens locally in your browser",
    },
    speed: {
      title: "Lightning Fast",
      desc: "No server round-trips, instant results",
    },
    free: {
      title: "Completely Free",
      desc: "No limits, no sign-ups, no hidden costs",
    },
  },
};
