"use client"
import { useEffect, useState } from "react";
 
import { AnimatedCircularProgressBar } from "@/components/ui/animated-circular-progress-bar";
import { IconCloud } from "@/components/ui/icon-cloud";
import { useTheme } from "next-themes";

interface Skill {
  [key: string]: [number, string];
}

const Skills = () => {

  const { theme } = useTheme();
  const [val, setVal] = useState(0);
  const slugs = [
    "typescript",
    "javascript",
    "dart",
    "java",
    "react",
    "flutter",
    "android",
    "html5",
    "css3",
    "nodedotjs",
    "express",
    "nextdotjs",
    "prisma",
    "amazonaws",
    "postgresql",
    "firebase",
    "nginx",
    "vercel",
    "testinglibrary",
    "jest",
    "cypress",
    "docker",
    "git",
    "jira",
    "github",
    "gitlab",
    "visualstudiocode",
    "androidstudio",
    "tailwindcss",
    "figma",
  ];
  
  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`,
  );
  const skillsObject1 :  Skill = {
    HTML5: [95, "HTML5"],
    CSS3: [95, "CSS3"],
    Bootstrap: [95, "bootstrap"],
    "Tailwind CSS": [90, "tailwindcss"],
    JavaScript: [95, "javascript"],
    TypeScript: [90, "typescript"],
    JQuery: [90, "jquery"],
    ReactJs: [90, "react"],
    NextJs: [80, "nextdotjs"],
    "React Native": [80, "react"],
    Redux: [90, "redux"],
    Angular: [90, "angular"],
    RxJS: [85, "reactivex"],
    NgRx: [85, "ngrx"],
    MaterialUI: [90, "mui"],
    Figma: [90, "figma"],
    Nodejs: [90, "nodedotjs"],
    Expressjs: [90, "express"],
    "C#/.NET": [80, "dotnet"],
    PHP: [80, "php"],
  };

  const skillsObject2 :  Skill = {


    Nexusjs: [75, "nexus"],
    Python: [80, "python"],
    "Google Cloud": [80, "googlecloud"],
    "Google APIs": [90, "googlecloud"],
    Azure: [80, "azure"],
    GraphQL: [70, "graphql"],
    Docker: [70, "docker"],
    Git: [90, "git"],
    Jira: [90, "jira"],
    Agile: [90, "agile"],
    "OpenAI API": [90, "openai"],
    "Gemini API": [90, "googlegemini"],
  }

  const skillsObject3 :  Skill = {

  Prisma: [90, "prisma"],
    Firebase: [90, "firebase"],
    MongoDb: [70, "mongodb"],
    Mongoose: [70, "mongoose"],
  }

  const skillsObject4 :  Skill = {
    MySQL: [90, "mysql"],
    "MsSQL Server": [90, "mssql"],
    Knexjs: [80, "knexdotjs"],
    PostgreSQL: [75, "postgresql"],
  }


  useEffect(() => {
    const handleIncrement = (prev: number) => {
      if (prev === 100) {
        return 100;
      }
      return prev + 10;
    };
    setVal(handleIncrement);
    const interval = setInterval(() => setVal(handleIncrement), 100);
    return () => clearInterval(interval);
  }, [])

  
  return (
    <section className="h-full min-h-full md:h-screen md:min-h-screen lg:h-screen lg:min-h-screen xl:h-screen xl:min-h-screen items-center justify-center flex lg:flex-col md:flex-col flex-col  animate-fadein duration-1000  z-10">
      <div className="grid grid-cols-2 xl:grid-cols-10 gap-8  mt-auto">
        {Object.entries(skillsObject1).map(([key, value]) => (
           <div key={key} className="w-32 h-32 mx-4  rounded-xl">    
           <AnimatedCircularProgressBar
           name={key}
           slug={value[1]}
      max={100}
      min={0}
      value={value[0] <= val ? value[0] : val}
      gaugePrimaryColor="rgb(79 70 229)"
      gaugeSecondaryColor={theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}
    /></div>
        ))}
   
 
</div>
<div className='flex lg:flex-row md:flex-row flex-col items-center justify-center gap-8'>
{Object.entries(skillsObject3).map(([key, value]) => (
  <div key={key} className="w-32 h-32 mx-4  rounded-xl">    
  <AnimatedCircularProgressBar
  name={key}
  slug={value[1]}
      max={100}
      min={0}
      value={value[0] <=val ? value[0] : val}
      gaugePrimaryColor="rgb(79 70 229)"
      gaugeSecondaryColor={theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}
    /></div>
))}
<div className="w-60 h-60  rounded-xl">
<div className="relative flex size-full items-center justify-center overflow-hidden">
      <IconCloud images={images} />
    </div>
</div>
{Object.entries(skillsObject4).map(([key, value]) => (
  <div key={key} className="w-32 h-32 mx-4  rounded-xl">    
  <AnimatedCircularProgressBar
  name={key}
  slug={value[1]}
      max={100}
      min={0}
      value={value[0] <= val ? value[0] : val}
      gaugePrimaryColor="rgb(79 70 229)"
      gaugeSecondaryColor={theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}
    /></div>
))}
</div>
<div className="grid grid-cols-2 xl:grid-cols-10 gap-8  ">
        {Object.entries(skillsObject2).map(([key, value]) => (
           <div key={key} className="w-32 h-32 mx-4  rounded-xl">    
           <AnimatedCircularProgressBar
           name={key}
           slug={value[1]}
      max={100}
      min={0}
      value={value[0] <= val ? value[0] : val}
      gaugePrimaryColor="rgb(79 70 229)"
      gaugeSecondaryColor= {theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}
    /></div>
        ))}
   

</div>

    </section>
  )
}

export default Skills