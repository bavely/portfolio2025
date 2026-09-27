"use client";
import React, { useState } from 'react'
import Carousel, {  SlideData } from "@/components/ui/carousel";
import {AnimatedModal} from "@/components/modal-content";
import { ModalProvider , } from '@/components/ui/animated-modal';
const Portfolio = () => {
  const [thisslide, setThisslide] = useState<SlideData>({
    title: "",
    src: "",
    gitHub: "",
    live: "",
    about: {
      Images: [],
      Text: "",
      Tech: []
    }
  });

 
  const slideData = [
    {
      title: "CuroRx",
      
      src: "/images/curorx.webp",
      gitHub: "https://github.com/NextEhealth/curo-v2",
        live: "https://curorx.life/",
        about:  {
            Images:["/images/curorx.webp", "/images/pharmacy.webp", "/images/Provider.webp", "/images/screencapture-curo-v2-beta-azurewebsites-net-patient-homepage-2023-10-30-20_47_16.webp"],
            Text: "CuroRx is a web application that connects pharmacies, providers, and patients, helping pharmacy teams operate more efficiently. I currently contribute to its development as part of the NextEHealth team.",
            Tech: ["Node.js", "Express", "React", "MySQL", "Firebase", "Azure App Service", "Bootstrap", "Material UI", "Google APIs", "Google Maps API", "Mailgun", "Twilio", "Axios", "Socket.IO", "JWT", "Azure Storage"]
        }
    },
    {
      title: "Movie Night",
      
      src: "/images/movie-night1.webp",
      gitHub: "https://github.com/bavely/Movie-Night-AI",
      live: "https://movie-night.pavli-tawfik.com/",
      about:  {
          Images:["/images/movie-night1.webp", "/images/movie-night2.webp", "/images/movie-night3.webp", "/images/movie-night4.webp", "/images/movie-night5.webp", "/images/movie-night6.webp", "/images/movie-night7.webp", "/images/movie-night8.webp"],
          Text: "Movie Night is your go-to web app for finding the perfect flick! Whether you’re in the mood to search by keywords or browse by genre, we’ve got you covered. Not sure what to watch? Just ask our AI assistant for spot-on movie recommendations. Grab the popcorn and let the binge-watching begin!",
          Tech: ["OpenAI API", "TMDB API", "Watchmode API", "Angular 18", "RxJS", "Tailwind CSS", "PrimeNG UI Suite", "Ubuntu Linux VPS", "Nginx"]
      }
    },
    {
      title: "Lab Results Explainer",
      src: "/images/lab-results.webp",
      gitHub: "https://github.com/bavely/lab_results_explainer",
      live: "https://labs.pavli-tawfik.com/",
      about: {
          Images:["/images/lab-results.webp", "/images/lab-results1.webp", "/images/lab-results2.webp", "/images/lab-results3.webp"],
          Text: `A patient-friendly starter application for explaining common lab results in plain language. This version uses:

Frontend: React, TypeScript, Vite, Tailwind CSS, shadcn-style UI components, react-hook-form, Zod, TanStack Query
Backend: Python, Flask, Pydantic, pypdf
Core logic: deterministic lab-range classification, normalization, combination flags, mock explanations, and an Azure AI Foundry Agent provider
Educational use only. This application does not provide medical advice, diagnosis, or treatment. Lab results should always be interpreted by a licensed healthcare professional.`,
          Tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "React Hook Form", "Zod", "TanStack Query", "Python", "Flask", "Pydantic", "pypdf", "Azure AI Foundry Agent"]
      }
    },
    {
      title: "HealthLine",
      src: "/images/healthline.webp",
      gitHub: "https://github.com/bavely/healthline",
      live: "https://healthline.pavli-tawfik.com/",
      about: {
          Images:["/images/healthline.webp", "/images/healthline1.webp", "/images/healthline2.webp", "/images/healthline3.webp"],
          Text: `HealthLine is a FHIR Patient Timeline Viewer that helps users search for patients, review clinical history in chronological order, and generate a plain-language AI summary of the available record. It connects a React/TypeScript frontend to a Node/Express API that searches the public HAPI FHIR R4 sandbox, normalizes clinical resources into a focused timeline, and uses OpenAI only for optional patient summaries.`,
          Tech: ["React", "TypeScript", "Tailwind CSS", "REST API", "Node.js", "Express", "OpenAI API", "FHIR", "HAPI FHIR R4 Sandbox", "shadcn/ui", "Jest", "React Testing Library", "GitHub Actions"]
      }
    },
    {
      title: "Pawinpaw",
      
      src: "/images/register.webp",
      gitHub: "https://github.com/khwilson27/pawinpaw",
      live: "https://pawinpaw.pavli-tawfik.com/",
      about:  {
          Images:["/images/nearby.webp", "/images/register.webp", "/images/profile-pawinpaw.webp", "/images/nearby2.webp", "/images/match.webp"],
          Text: "Pawinpaw is a web application that helps pet owners find and connect with one another. I contributed to its development during the UCI Coding Boot Camp.",
          Tech: ["Node.js", "Express", "React", "MySQL", "Sequelize", "Heroku", "Bootstrap", "Material UI", "Google APIs", "Google Maps API", "Axios", "Socket.IO", "JWT"]
      }
    },
    {
      title: "React Messenger",
      
      src: "/images/Login.webp",
      gitHub: "https://github.com/bavely/React-Messenger",
      live: "", // not publicly deployed
      about: {
          Images:[ "/images/Login.webp", "/images/chathistory.webp", "/images/chat.webp", "/images/profile-messenger.webp"],
          Text: "React Messenger is the working title of a private messaging project that is currently in planning and development. It will allow people with shared interests to connect, chat, and create topic-based groups.",
          Tech: ["Node.js", "Express", "React Native", "MongoDB", "Mongoose", "Bootstrap", "Google APIs", "Google Maps API", "Mailgun", "Twilio", "Axios", "Socket.IO", "JWT"]
      }
    },
    {
      title: "Tasty",
      
      src: "/images/Tasty1.webp",
      gitHub: "https://github.com/bavely/tasty",
      live: "https://tasty.pavli-tawfik.com",
      about: {
          Images:[ "/images/Tasty1.webp", "/images/tasty2.webp", "/images/tasts3.webp", "/images/tasty4.webp"],
          Text: "Tasty is a web application for discovering recipes. I am developing it as a private project to strengthen my TypeScript skills.",
          Tech: ["React", "TypeScript", "CSS", "REST API"]
      }
    },
    {
      title: "TODO AI",
      
      src: "/images/todo.webp",
      gitHub: "https://github.com/bavely/Smart_AI_ToDo-",
      live: "https://smart-ai-to-do.vercel.app/",
      about: {
          Images:["/images/todo.webp"],
          Text: "TODO AI is a task-management web application that helps users organize their work with an AI chatbot. I built it as a private project to explore TypeScript, Next.js, and AI integrations.",
          Tech: ["TypeScript", "OpenAI API", "CopilotKit", "Next.js", "MongoDB", "GraphQL", "CSS"]

  }
    },
    {
      title: "RIVER'S EDGE PHARMACY Website",
      
      src: "/images/re1.webp",
      gitHub: "", // closed source
      live: "https://www.repharmacy.com/",
      about: {
          Images:["/images/re1.webp", "/images/re2.webp", "/images/re3.webp", "/images/re4.webp"],
          Text: "River's Edge Pharmacy is a specialty pharmacy in Irvine, California. I contributed to the team responsible for developing, hosting, and maintaining its website.",
          Tech: ["WordPress", "Elementor", "CSS", "HTML", "JavaScript", "PHP", "Yoast SEO", "Google Analytics", "Azure App Service"]
      }
    },
    {
      title: "AMERICAN COURIER SERVICES Website",
      
      src: "/images/ac1.webp",
      gitHub: "", // closed source
      live: "https://american-courier.com/",
      about: {
          Images:["/images/ac1.webp", "/images/ac2.webp", "/images/ac3.webp", "/images/ac4.webp"],
          Text: "American Courier Services is a courier company in Los Angeles, California. I contributed to the team responsible for developing, hosting, and maintaining its website.",
          Tech: ["WordPress", "Elementor", "CSS", "HTML", "JavaScript", "PHP", "Yoast SEO", "Google Analytics", "DigitalOcean VPS"]
      }
    },
    {
      title: "WIZEAS Website",
      
      src: "/images/w.webp",
      gitHub: "", // closed source
      live: "https://wizeas.com/",
      about: {
          Images:["/images/w.webp", "/images/w2.webp", "/images/w3.webp", "/images/w4.webp", "/images/w5.webp", "/images/w6.webp", "/images/w7.webp", "/images/w8.webp"],
          Text: "WIZEAS is a web development company in Austin, Texas. I developed, hosted, and maintained its website.",
          Tech: ["React", "Tailwind CSS", "shadcn/ui", "CSS", "HTML", "JavaScript", "Node.js", "Express"]
      }
    },
    {
      title: "Pavli Tawfik Portfolio",
      
      src: "/images/p1.webp",
      gitHub: "https://github.com/bavely/Portfolio2023",
      live: "https://old.pavli-tawfik.com/",
      about: {
          Images:["/images/p1.webp", "/images/p2.webp", "/images/p3.webp", "/images/p4.webp"],
          Text: "This is an earlier version of my portfolio website.",
          Tech: ["React", "Bootstrap", "Material UI", "CSS", "HTML", "JavaScript", "Node.js", "Express"]
      }
    }
  ];
  const handleCurrentSlide = (index: number) => {

    setThisslide(slideData[index]);
  }

  return (
    <section className="h-screen min-h-screen w-full items-center justify-center flex lg:flex-row md:flex-row flex-col  animate-fadein duration-1000 ">

     <div className="relative overflow-hidden w-full h-full py-20 mt-16">
     <ModalProvider>
      <Carousel slides={slideData} currentSlide={handleCurrentSlide} />
      <AnimatedModal slide={thisslide} />
      </ModalProvider>

    </div>


    </section>
  )
}

export default Portfolio
