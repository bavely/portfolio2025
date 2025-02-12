"use client"
import dynamic from "next/dynamic";
import Intro from "@/components/intro";


// const Intro = dynamic(() => import("@/components/intro"), { ssr: false });
const Header = dynamic(() => import("@/components/header"), { ssr: false });
export default function Home() {

  return (
    <main className="animate-fadein duration-1000 ">
      <Header />    
      <Intro />
    </main>
  );
}
