"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  useModal,
} from "./ui/animated-modal";
import Image from "next/image";
import { motion } from "framer-motion";
import { SlideData } from "./ui/carousel";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
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

  const openImageViewer = useCallback((index: React.SetStateAction<number>) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  return (
    <ModalBody>
      <ModalContent className="overflow-y-scroll">
        <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
          {currentSlide.title}    
        </h4>
        <div className="flex justify-center items-center">
          {currentSlide.about.Images.map((image, idx) => (
            <motion.div
              key={"images" + idx}
              style={{
                rotate: Math.random() * 20 - 10,
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
              <Image
                src={image}
                alt="bali images"
                width="500"
                height="500"
                className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
                onClick={() => openImageViewer(idx)}
              />
            </motion.div>
          ))}
        </div>
        <div className="flex flex-col py-10">
        <div className=" flex flex-col items-start justify-start max-w-full mx-auto">
            <p className="text-md font-bold md:text-lg lg:text-lg">About This Project</p>
         <p className="text-sm font-bold md:text-lg lg:text-lg w-full dark:text-slate-400 ">{currentSlide.about.Text}</p>
        </div>
 <div className="flex flex-row py-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-sm font-bold md:text-lg lg:text-lg text-end">Tech Used</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y flex flex-col ">
            {currentSlide.about.Tech.map((tech, idx) => (
              idx % 2 === 0 && <TableRow key={tech}>
                <TableCell className="text-sm font-bold md:text-lg lg:text-lg">{tech}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-sm font-bold md:text-lg lg:text-lg">{"   "}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody >
                        {currentSlide.about.Tech.map((tech, idx) => (
              idx % 2 !== 0 && <TableRow key={tech}>
                <TableCell className="text-sm font-bold md:text-lg lg:text-lg">{tech}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
 </div>
        </div>
      </ModalContent>
      <ModalFooter className="gap-4">
        <button
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
            backgroundColor: "rgba(0,0,0,0.9)"
          }}
          closeOnClickOutside={true}
        />
      )}
    </ModalBody>
  );
}

