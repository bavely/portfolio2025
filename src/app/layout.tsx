import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Exo_2 } from "next/font/google";
import { EvervaultCard } from "@/components/ui/evervault-card";
import { Nav } from "@/components/nav";
import BigIntro from "@/components/bigintro";
import { ViewTransitions } from "next-view-transitions";
import dynamic from "next/dynamic";
import Seo from "@/components/Seo";
const Header = dynamic(() => import("@/components/header"), { ssr: false });
const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo2",
});

export const metadata: Metadata = {
  title: "Bavely Tawfik | Full Stack Web Developer",
  description: "A Passionate Full-Stack Developer with a knack for building high-performance, intuitive, and visually engaging web applications.",
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
    url: "https://pavli-tawfik.com",
    siteName: "Bavely Tawfik Portfolio",
    images: [
      {
        url: "https://pavli-tawfik.com/assets/logo-dark.svg",
        width: 800,
        height: 600,
        alt: "Bavely Tawfik Logo",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bavely Tawfik | Full Stack Web Developer",
    description: "Explore the portfolio of Bavely Tawfik — full-stack developer building performant and elegant web apps.",
    images: ["https://pavli-tawfik.com/logo-dark.svg"],
    creator: "@bavely" // Replace if you have a Twitter handle
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${exo2.className} antialiased dark:bg-black dark:text-[#f8fafc] bg-[#f1f5f9] text-[#020617] scrollbar`}
      >
        <Seo />
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
