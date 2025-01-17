// import Header from "@/components/header";
import { Nav } from "@/components/nav";
import dynamic from "next/dynamic";
// import {SpotlightCard} from "../components/background-sl";

const Header = dynamic(() => import("@/components/header"), { ssr: false });

export default function Home() {
  return (
   
    <main className="container mx-auto p-4 relative min-h-screen ">
 
      <Header />
      <Nav />
      {/* <SpotlightCard /> */}
    </main>
 
  );
}
