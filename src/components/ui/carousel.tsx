"use client";
import {
  IconArrowNarrowRight,
  IconBrandGithub,
  IconInfoCircle,
  IconWorldWww,
} from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import { useModal } from "../ui/animated-modal";
import { ShineBorder } from "./shine-border";
export interface SlideData {
  title: string;
  src: string;
  gitHub: string;
  live: string;
  about: {
    Images: string[];
    Text: string;
    Tech: string[];
  };
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  total: number;
  handleSlideClick: (index: number) => void;
}

/**
 * Some projects have no public repo or no live deployment. Those were previously
 * given "#" or "/pagenotfound", which rendered a link that opened a blank
 * duplicate tab or a bare 404 — so treat them as absent instead.
 */
const hasLink = (href: string) =>
  Boolean(href) && href !== "#" && href !== "/pagenotfound";

const Slide = ({ slide, index, current, total, handleSlideClick }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el || current !== index) return;

    const r = el.getBoundingClientRect();
    const x = event.clientX - (r.left + Math.floor(r.width / 2));
    const y = event.clientY - (r.top + Math.floor(r.height / 2));

    // Pointer events already arrive once per painted frame in modern browsers;
    // update only the active element instead of running one permanent rAF loop
    // for every slide.
    el.style.setProperty("--x", `${x}px`);
    el.style.setProperty("--y", `${y}px`);
  };

  const handleMouseLeave = () => {
    slideRef.current?.style.setProperty("--x", "0px");
    slideRef.current?.style.setProperty("--y", "0px");
  };

  const { src, gitHub, live, title } = slide;
  const { setOpen } = useModal();

  const handleOpenDetails = () => {
    // Selects the slide explicitly rather than relying on the click bubbling up
    // to the <li>. That bubbling was the only thing keeping the modal in sync
    // with the visible project, so removing the <li> handler without this would
    // have opened the modal on a stale project.
    handleSlideClick(index);
    setOpen(true);
  };

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        role="group"
        aria-roledescription="slide"
        aria-label={`${title} (${index + 1} of ${total})`}
        className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[70vmin] h-[70vmin] mx-[4vmin] z-10 "
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform:
            current !== index
              ? "scale(0.98) rotateX(8deg)"
              : "scale(1) rotateX(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-[#1D1F2F] rounded-[1%] overflow-hidden transition-all duration-150 ease-out"
          style={{
            transform:
              current === index
                ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                : "none",
          }}
        >
          <div
            className="absolute inset-0 h-[120%] w-[120%] transition-opacity duration-700 ease-in-out"
            style={{
              opacity: current === index ? 1 : 0.5,
            }}
          >
            <Image
              fill
              alt={title}
              src={src}
              sizes="84vmin"
              loading={current === index ? "eager" : "lazy"}
              decoding="async"
              className="object-cover"
            />
          </div>
          {current === index && (
            <div className="absolute inset-0 bg-black/30 transition-all duration-1000" />
          )}
        </div>

        {/* Bringing a slide to the front used to be a click handler on the <li>,
            which no keyboard or screen-reader user could reach. A real button
            covers the inactive slides instead; the active slide has none, so its
            own links stay clickable. */}
        {current !== index && (
          <button
            type="button"
            onClick={() => handleSlideClick(index)}
            aria-label={`Show ${title}`}
            className="absolute inset-0 z-20 cursor-pointer rounded-[1%] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-500"
          />
        )}
        {/* <ShineBorder
      className="relative size-48 rounded-lg"
      color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
    > */}
        {/* When not current this block is `invisible` (visibility: hidden),
            which already takes it out of both the tab order and the
            accessibility tree - no aria-hidden needed. */}
        <ShineBorder
        color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
          className={`relative p-[4vmin] transition-opacity duration-1000 ease-in-out bg-gradient-to-r from-slate-950/[0.5] via-[#2e203b]/[0.5] to-[#1f142a]/[0.7] bg-clip-padding tracking-tighter size-48 rounded-lg flex flex-col gap-4 text-center ${
            current === index ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <h2 className="text-lg md:text-xl lg:text-xl font-semibold  relative">
            {title}
          </h2>
          <div className="flex flex-row justify-center gap-2">
   
            {/* <button className="mt-6  px-4 py-2 w-fit mx-auto sm:text-sm text-black bg-white h-12 border border-transparent text-xs flex justify-center items-center rounded-2xl hover:shadow-lg transition duration-200 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
              {button}
            </button> */}
            {hasLink(gitHub) && (
              <Link
                href={gitHub}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} source on GitHub`}
              >
                <IconBrandGithub />
              </Link>
            )}
            {hasLink(live) && (
              <Link
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} live site`}
              >
                <IconWorldWww />
              </Link>
            )}
            <button
              type="button"
              onClick={handleOpenDetails}
              aria-label={`About ${title}`}
              className="cursor-pointer"
            >
              <IconInfoCircle />
            </button>
           
          </div>
        </ShineBorder>
        {/* </ShineBorder> */}
      </li>
    </div>
  );
};

interface CarouselControlProps {
  type: string;
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({
  type,
  title,
  handleClick,
}: CarouselControlProps) => {
  return (
    <button
      className={`w-10 h-10 flex  items-center mx-2 justify-center bg-neutral-200 dark:bg-neutral-800 border-3 border-transparent rounded-full focus:border-[#6D64F7] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 ${
        type === "previous" ? "rotate-180" : ""
      }`}
      title={title}
      aria-label={title}
      onClick={handleClick}
    >
      <IconArrowNarrowRight className="text-neutral-600 dark:text-neutral-200" />
    </button>
  );
};

interface CarouselProps {
  slides: SlideData[];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  currentSlide: Function;
}

export default function Carousel({ slides, currentSlide }: CarouselProps) {
  const [current, setCurrent] = useState(0);

  const handlePreviousClick = () => {
    const previous = current - 1;
    setCurrent(previous < 0 ? slides.length - 1 : previous);
  };

  const handleNextClick = () => {
    const next = current + 1;
    setCurrent(next === slides.length ? 0 : next);
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) {
      setCurrent(index);
    }
    currentSlide(index);
  };

  return (
    <div
      className="relative w-[70vmin] h-[70vmin] mx-auto"
      role="group"
      aria-roledescription="carousel"
      aria-label="Portfolio projects"
    >
      <ul
        className="absolute flex mx-[-4vmin] transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${current * (100 / slides.length)}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            index={index}
            current={current}
            total={slides.length}
            handleSlideClick={handleSlideClick}
          />
        ))}
      </ul>

      <div className="absolute flex justify-center w-full top-[calc(100%+1rem)]">
        <CarouselControl
          type="previous"
          title="Go to previous slide"
          handleClick={handlePreviousClick}
        />

        <CarouselControl
          type="next"
          title="Go to next slide"
          handleClick={handleNextClick}
        />
      </div>
    </div>
  );
}
