import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Exo_2 } from "next/font/google";
import { EvervaultCard } from "@/components/ui/evervault-card";
import { Nav } from "@/components/nav";
import BigIntro from "@/components/bigintro";
import { ViewTransitions } from "next-view-transitions";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/components/header"), { ssr: false });
const siteUrl = "https://pavli-tawfik.com";
const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo2",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bavely Tawfik | Full-Stack Web Developer",
    template: "%s | Bavely Tawfik",
  },
  description:
    "Bavely Tawfik builds performant, intuitive, and visually engaging full-stack web applications.",
  keywords: [
    "Bavely Tawfik",
    "Full Stack Web Developer",
    "Web Portfolio",
    "Next.js Developer",
    "React Developer",
    "Frontend Developer",
    "Backend Developer"
  ],
  authors: [{ name: "Bavely Tawfik", url: "https://pavli-tawfik.com" }],
  creator: "Bavely Tawfik",
  openGraph: {
    title: "Bavely Tawfik | Full Stack Web Developer",
    description: "A Passionate Full-Stack Developer with a knack for building high-performance, intuitive, and visually engaging web applications.",
    url: siteUrl,
    siteName: "Bavely Tawfik Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bavely Tawfik — Full-Stack Web Developer",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bavely Tawfik | Full-Stack Web Developer",
    description:
      "Explore the portfolio of Bavely Tawfik — a full-stack developer building performant and elegant web applications.",
    images: ["/og-image.png"],
    creator: "@bavely",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Bavely Tawfik",
  url: siteUrl,
  image: `${siteUrl}/og-image.png`,
  sameAs: [
    "https://github.com/bavely",
    "https://www.linkedin.com/in/bavelytawfik",
  ],
  jobTitle: "Full-Stack Web Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${exo2.className} antialiased dark:text-[#f8fafc] text-[#020617]`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <EvervaultCard>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            // enableSystem
            disableTransitionOnChange
          >
            <ViewTransitions>
              <BigIntro>
                <Header />
                <Nav />
                {children}
              </BigIntro>
            </ViewTransitions>
          </ThemeProvider>
        </EvervaultCard>
      </body>
    </html>
  );
}
