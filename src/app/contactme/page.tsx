import { createPageMetadata } from "@/lib/metadata";
import Contact from "./contact-client";

export const metadata = createPageMetadata(
  "Contact",
  "Contact Bavely Tawfik about full-stack web development projects and opportunities.",
  "/contactme",
);

export default function ContactPage() {
  return <Contact />;
}
