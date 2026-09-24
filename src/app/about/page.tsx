import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import { Spotlight } from "@/components/ui/spotlight-new";

export const metadata = createPageMetadata(
  "About",
  "Learn about Bavely Tawfik, a full-stack developer focused on modern, scalable, performant web applications.",
  "/about",
);

export default function About() {
  return (
    <section className="h-screen min-h-screen items-center justify-center  flex lg:flex-row md:flex-row flex-col animate-fadein duration-1000 z-10 p-10 ">
      <Spotlight />
      <div className="flex flex-col  items-center ">
        <h1 className="text-lg font-bold md:text-2xl lg:text-2xl  text-start">
          <span className="bg-gradient-to-r from-pink-500  to-yellow-500 bg-clip-text text-transparent">
            A Passionate Full-Stack Developer
          </span>
        </h1>
        <p className="text-sm font-bold md:text-lg lg:text-lg flex flex-wrap w-[80%] dark:text-slate-400 ">
          With a knack for building high-performance, intuitive, and visually
          engaging web applications, I specialize in creating seamless digital
          experiences that bridge the gap between functionality and design.
        </p>
        <p className="text-sm font-bold md:text-lg lg:text-lg flex flex-wrap w-[80%] dark:text-slate-400 ">
          🚀 A results-driven Full-Stack Developer with a deep passion for
          crafting modern, scalable, and efficient web applications.
          </p>
          <p className="text-sm font-bold md:text-lg lg:text-lg flex flex-wrap w-[80%] dark:text-slate-400" >🎨 Skilled in front-end and back-end technologies, blending creativity
          with performance optimization.
          </p>
          <p className="text-sm font-bold md:text-lg lg:text-lg flex flex-wrap w-[80%] dark:text-slate-400" >🔧 Experienced in developing responsive applications with React.js,
          Next.js, Angular, TypeScript, Node.js, and &nbsp;<Link href="/skills" className="text-blue-500"> more</Link>.</p>
          <p className="text-sm font-bold md:text-lg lg:text-lg flex flex-wrap w-[80%] dark:text-slate-400">⚡ A problem solver who thrives in agile environments and enjoys
          tackling complex challenges.
        </p>
      </div>

    </section>
  );
}
