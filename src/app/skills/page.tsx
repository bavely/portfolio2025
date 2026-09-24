import { createPageMetadata } from "@/lib/metadata";
import Skills from "./skills-client";

export const metadata = createPageMetadata(
  "Skills",
  "Explore Bavely Tawfik's frontend, backend, cloud, database, testing, and AI development skills.",
  "/skills",
);

export default function SkillsPage() {
  return <Skills />;
}
