"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  useModal,
} from "./ui/animated-modal";
import Image from "next/image";
import { motion } from "framer-motion";
import { SlideData } from "./ui/carousel";
import ImageViewer from "react-simple-image-viewer";

export function AnimatedModal({ slide }: { slide: SlideData }) {
  const { setOpen } = useModal();

  const [currentSlide, setCurrentSlide] = useState(slide);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [imagesList, setImagesList] = useState<string[]>([]);

  useEffect(() => {
    if (slide) {
      setCurrentSlide(slide);
      setImagesList(slide.about.Images);
    }
  }, [slide]);

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  // Computed once per project instead of inline during render: previously every
  // re-render produced new angles and the whole stack of thumbnails jumped.
  const rotations = useMemo(
    () => currentSlide.about.Images.map(() => Math.random() * 20 - 10),
    [currentSlide]
  );

  return (
    <ModalBody>
      {/* overflow-y-auto, not -scroll: -scroll paints a scrollbar gutter even
          when the content fits. */}
      <ModalContent className="overflow-y-auto">
        <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
          {currentSlide.title}
        </h4>

        {/* flex-wrap: projects with eight screenshots used to squeeze into one
            non-wrapping row and overflow the dialog. */}
        <div className="flex flex-wrap items-center justify-center">
          {currentSlide.about.Images.map((image, idx) => (
            <motion.div
              key={"images" + idx}
              style={{
                rotate: rotations[idx] ?? 0,
              }}
              whileHover={{
                scale: 1.1,
                rotate: 0,
                zIndex: 100,
              }}
              whileTap={{
                scale: 1.1,
                rotate: 0,
                zIndex: 100,
              }}
              className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
            >
              {/* A real button, so the viewer can be opened by keyboard. The
                  click handler used to sit on the <img> itself. */}
              <button
                type="button"
                onClick={() => openImageViewer(idx)}
                aria-label={`View ${currentSlide.title} screenshot ${idx + 1} full size`}
                className="block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                <Image
                  src={image}
                  alt={`${currentSlide.title} screenshot ${idx + 1}`}
                  width={320}
                  height={320}
                  // Displayed at 80px (mobile) / 160px, so tell the optimiser
                  // that instead of letting it serve for a 500px slot.
                  sizes="(max-width: 768px) 80px, 160px"
                  className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
                />
              </button>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col py-10">
          <div className="flex flex-col items-start justify-start max-w-full mx-auto">
            <p className="text-md font-bold md:text-lg lg:text-lg">About This Project</p>
            <p className="text-sm font-bold md:text-lg lg:text-lg w-full dark:text-slate-400 whitespace-pre-line">
              {currentSlide.about.Text}
            </p>
          </div>

          {/* Two real columns. This was previously two <table>s fed by
              even/odd index, the second with a whitespace-only header cell, to
              fake a two-column layout out of a flat list. */}
          <div className="py-5">
            <p className="text-md font-bold md:text-lg lg:text-lg">Tech Used</p>
            <ul className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1">
              {currentSlide.about.Tech.map((tech, idx) => (
                <li
                  key={`${tech}-${idx}`}
                  className="text-sm font-bold md:text-lg lg:text-lg dark:text-slate-400"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ModalContent>

      <ModalFooter className="gap-4">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28"
        >
          Close
        </button>
      </ModalFooter>

      {isViewerOpen && (
        <ImageViewer
          src={imagesList}
          currentIndex={currentImage}
          onClose={closeImageViewer}
          disableScroll={false}
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.9)",
          }}
          closeOnClickOutside={true}
        />
      )}
    </ModalBody>
  );
}
