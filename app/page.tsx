import { redirect } from "next/navigation";

// Default language
const DEFAULT_LANG = "en";

export default function IndexPage() {
  // Redirect to the default language
  redirect(`/${DEFAULT_LANG}`);
}
