import type { Metadata } from "next";
import Intro from "@/components/intro";

export const metadata: Metadata = {
  title: "Bavely Tawfik | Full-Stack Web Developer",
  description:
    "Bavely Tawfik builds performant, intuitive, and visually engaging full-stack web applications.",
  alternates: { canonical: "/" },
};

export default function Home() {

  return (
    <main className="animate-fadein duration-1000 ">
        
      <Intro />
    </main>
  );
}
