"use client"; 
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import {  Exo_2} from "next/font/google";
import { EvervaultCard } from "@/components/ui/evervault-card";
import { Nav } from "@/components/nav";
// const fredoka = Fredoka({

//   subsets: ["latin"],
//   variable: "--font-fredoka",
// });

const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo2",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body
        className={` ${exo2.className} antialiased dark:bg-black dark:text-[#f8fafc] bg-[#f1f5f9] text-[#020617] canva-effect`}
      >

        <EvervaultCard >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
               <AnimatePresence mode="wait">
          <motion.div
            key={pathname} // Ensure animation runs on route change
            // initial={{ x: "100%", opacity: 0 }} // Start off-screen (right)
            animate={{ x: 0, opacity: 1 }} // Slide into view
            exit={{ x: "-100%", opacity: 0 }} // Slide out (left)

            transition={{
              ease: "easeInOut",
              duration: 0.5,
              x: {
                type: "spring",
                stiffness: 800,
                damping: 100,
                
              },
              opacity: { duration: 0.6 }
            }} // Smooth effect
            className="h-full"
          >

          {children}
          </motion.div>
          </AnimatePresence>
        </ThemeProvider>
        </EvervaultCard>
      </body>
    </html>
  );
}
