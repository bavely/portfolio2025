"use client"
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
      
      src: "/images/curorx.png",
      gitHub: "https://github.com/NextEhealth/curo-v2",
        live: "https://curorx.life/",
        about:  {
            Images:["/images/curorx.png", "/images/pharmacy.png", "/images/Provider.png", "/images/screencapture-curo-v2-beta-azurewebsites-net-patient-homepage-2023-10-30-20_47_16.png"],
            Text: "CuroRx is a web application is a pharmacy, provider and patient point of communications serving the needs of patients and providers to help a pharmacy business operate more efficiently. It is currently I am part of the developing team in NextEHealth.",
            Tech: ["NodeJS","ExpressJS", "ReactJS", "MySQL",  "Firebase", "Azure Web Apps", "Bootstrap", "Material UI", "Google APIs", "Google Maps API", "Mailgun", "Twilio", "Axios", "socket.io", "JWT", "Azure Storage"  ]
        }
    },
    {
      title: "Movie Night",
      
      src: "/images/movie-night1.png",
      gitHub: "https://github.com/bavely/Movie-Night-AI",
      live: "https://movie-night.pavli-tawfik.com/",
      about:  {
          Images:["/images/movie-night1.png", "/images/movie-night2.png", "/images/movie-night3.png", "/images/movie-night4.png", "/images/movie-night5.png", "/images/movie-night6.png", "/images/movie-night7.png", "/images/movie-night8.png"],
          Text: "Movie Night is your go-to web app for finding the perfect flick! Whether you’re in the mood to search by keywords or browse by genre, we’ve got you covered. Not sure what to watch? Just ask our AI assistant for spot-on movie recommendations. Grab the popcorn and let the binge-watching begin!",
          Tech: ["OpenAI", "TMDB API","Watchmode API" ,"Angular 18", "RxJS" ,"Tailwind", "CSS", "PrimeNg UISuite", "Ubuntu Linux VPS",  "Nginx web server" ]
      }
    },
    {
      title: "Pawinpaw",
      
      src: "/images/register.JPG",
      gitHub: "https://github.com/khwilson27/pawinpaw",
      live: "http://pawinpaw.pavli-tawfik.com/",
      about:  {
          Images:["/images/nearby.JPG", "/images/register.JPG", "/images/profile.JPG", "/images/nearby2.JPG", "/images/match.JPG"],
          Text: "Pawinpaw is a web application that allows users to search for and connect with other pet owners. It is a practicing application I am part of the developing team during UCI Bootcamp.",
          Tech: ["NodeJS","ExpressJS", "ReactJS", "MySQL", "sequelize", 'heroku' ,"Bootstrap", "Material UI", "Google APIs", "Google Maps API",  "Axios", "socket.io", "JWT"  ]
      }
    },
    {
      title: "React Messenger",
      
      src: "/images/Login.png",
      gitHub: "https://github.com/bavely/React-Messenger",
      live: "/pagenotfound",
      about: {
          Images:[ "/images/Login.png", "/images/chathistory.png", "/images/chat.png", "/images/profile.png"],
          Text: "React messenger is a place holder name of a messaging application I am developing as a private project. It is still under planning and development. The messenger will allow users with the same interests to communicate , chat and create groups under different topics.",
          Tech: ["NodeJS","ExpressJS", "React Native", "MongoDB","Mongoose","Bootstrap", "Google APIs", "Google Maps API", "Mailgun", "Twilio", "Axios", "socket.io", "JWT"  ]
      }
    },
    {
      title: "Tasty",
      
      src: "/images/Tasty1.png",
      gitHub: "https://github.com/bavely/tasty",
      live: "https://tasty.pavli-tawfik.com",
      about: {
          Images:[ "/images/Tasty1.png", "/images/tasty2.png", "/images/tasts3.png", "/images/tasty4.png"],
          Text: "Tasty is a web application that allows users to search delicious recipes. It is a practicing application of Typescript I am developing as a private project.",
          Tech: ["ReactJS", "Typescript", "CSS", "REST API"  ]
      }
    },
    {
      title: "TODO AI",
      
      src: "/images/todo.png",
      gitHub: "https://github.com/bavely/Smart_AI_ToDo-",
      live: "https://smart-ai-to-do.vercel.app/",
      about: {
          Images:["/images/todo.png"],
          Text: "TODO AI is a task managment web application that allows users to manage their tasks using AI chatbot. It is a practicing application of Typescript and NextJS I built as a private project to practice NextJS, Typescript and AI implementations.",
          Tech: [ "Typescript", "ChatGPT API, CopilotKit", "NextJS", "MongoDB", "GraphQL" ,"CSS"  ]   

  }
    },
    {
      title: "RIVER'S EDGE PHARMACY Website",
      
      src: "/images/re1.png",
      gitHub: "#",
      live: "https://www.repharmacy.com/",
      about: {
          Images:["/images/re1.png", "/images/re2.png", "/images/re3.png", "/images/re4.png"],
          Text: "RIVER'S EDGE PHARMACY is a website for RIVER'S EDGE PHARMACY. RIVER'S EDGE PHARMACY is specialty pharmacy located in Irvine, California. I was a part of the developing, hosting and maintaining team for this website.",
          Tech: [ "Wordpress", "Elementor", "CSS", "HTML", "Javascript", "PHP", "yoast seo", "Google Analytics", "Azure Web Apps"  ]
      }
    },
    {
      title: "AMERICAN COURIER SERVICES Website",
      
      src: "/images/ac1.png",
      gitHub: "#",
      live: "https://american-courier.com/",
      about: {
          Images:["/images/ac1.png", "/images/ac2.png", "/images/ac3.png", "/images/ac4.png"],
          Text: "AMERICAN COURIER SERVICES is a courier services website located in Los Angeles, California. I was a part of the developing, hosting and maintaining team for this website.",
          Tech: [ "Wordpress", "Elementor", "CSS", "HTML", "Javascript", "PHP", "yoast seo", "Google Analytics", "Digital Ocean VPS"  ]
      }
    },
    {
      title: "WIZEAS Website",
      
      src: "/images/w.png",
      gitHub: "#",
      live: "https://wizeas.com/",
      about: {
          Images:["/images/w.png", "/images/w2.png", "/images/w3.png", "/images/w4.png", "/images/w5.png", "/images/w6.png", "/images/w7.png", "/images/w8.png"],
          Text: "WIZEAS is a website for WIZEAS. WIZEAS is a web development company located in Austin, Texas. I developed, hosted and maintained this website.",
          Tech: [ "ReactJS", "Tailwind CSS", "Shadcn UI", "CSS", "HTML", "Javascript", "NodeJS", "ExpressJS"  ]
      }
    }
  ];
  const handleCurrentSlide = (index: number) => {
    console.log(index);
    setThisslide(slideData[index]);
  }
  console.log(thisslide)
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