import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Exo_2 } from "next/font/google";
import { EvervaultCard } from "@/components/ui/evervault-card";
import { Nav } from "@/components/nav";
import BigIntro from "@/components/bigintro";
import { ViewTransitions } from 'next-view-transitions'
const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo2",
});

export const metadata: Metadata = {
  title: "Bavely Tawfik",
  description: "Bavely Tawfik Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
    <html lang="en">
      <body
        className={` ${exo2.className} antialiased dark:bg-black dark:text-[#f8fafc] bg-[#f1f5f9] text-[#020617] `}
      >
        <EvervaultCard>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <BigIntro>
              <Nav />
              {children}
            </BigIntro>
          </ThemeProvider>
        </EvervaultCard>
      </body>
    </html>
    </ViewTransitions>
  );
}
