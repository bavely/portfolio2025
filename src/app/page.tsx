
import dynamic from "next/dynamic";
const Header = dynamic(() => import("@/components/header"), { ssr: false });
import Intro from "@/components/intro";

export default function Home() {
  return (
    <main className="animate-fadein duration-1000 ">
      <Header />    
      <Intro />
    </main>
  );
}
