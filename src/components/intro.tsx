"use client";
import React from "react";
import Image from "next/image";
import mypic from "../assets/1.png";
import { useTheme } from "next-themes";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { AuroraText } from "@/components/ui/aurora-text";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { Link } from 'next-view-transitions'

const Intro = () => {
  const { theme } = useTheme();
   const isMobile = useMediaQuery("(max-width: 770px)");
  return (
    <section className="h-screen min-h-screen items-center justify-center flex lg:flex-row md:flex-row flex-col   ">
      <div className=" justify-center items-center text-center flex  flex-col  ">
        <h1 className="lg:text-4xl md:text-3xl text-2xl lg:font-bold animate-floating delay-1000">
          Hi<span className="bg-gradient-to-r from-pink-500  to-yellow-500 bg-clip-text text-transparent">,</span> I&apos;m
        </h1>
        <h1 className="text-2xl font-bold tracking-tighter md:text-5xl lg:text-7xl ">
          <AuroraText>BAVELY</AuroraText>
        </h1>
        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400 cursor-pointer z-10">
          <Link href="/about">✨ More About Me</Link>
          <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedShinyText>
      </div>
      <div
        className={
          `animate-floating ${ isMobile ? "" : theme === "dark"
            ? ` backdrop-container  `
            : ` backdrop-container-white`
        }`}
      >
        {isMobile ? (
          <Image src={mypic} alt="backdrop" height={200} width={200} />
        ) : (
          <Image src={mypic} alt="backdrop"  />
        )}
        
      </div>
      <div className=" justify-center items-center text-center flex lg:flex-col flex-row animate-floating delay-600">
        <h1 className="lg:text-4xl md:text-3xl text-2xl lg:font-bold bg-gradient-to-r from-purple-500 to-indigo-400 bg-clip-text text-transparent">
          Welcome to my <br /> portfolio
        </h1>
      </div>
    </section>
  );
};

export default Intro;
