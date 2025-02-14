import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconMessage2Share,
  IconHome,
  IconUserBolt,
  IconStar,
  IconPresentation
} from "@tabler/icons-react";

export function Nav() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },

    {
      title: "About Me", 
      icon: (
        <IconUserBolt className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/about",
    },
    {
      title: "Skills",
      icon: (
        <IconStar className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/skills",
    },
    {
      title: "Portfolio",
      icon: (
        <IconPresentation className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/portfolio",
    },
    {
      title: "Contact Me",
      icon: (
        <IconMessage2Share className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/contactme",
    }
  ];
  return (
    <div className="flex items-center justify-center  fixed bottom-10 left-0 right-0 z-50">
      <FloatingDock
        items={links}
      />
    </div>
  );
}
