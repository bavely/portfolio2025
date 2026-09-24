import { createPageMetadata } from "@/lib/metadata";
import Portfolio from "./portfolio-client";

export const metadata = createPageMetadata(
  "Portfolio",
  "Explore Bavely Tawfik's full-stack projects spanning healthcare, AI, messaging, e-commerce, and responsive web applications.",
  "/portfolio",
);

export default function PortfolioPage() {
  return <Portfolio />;
}
