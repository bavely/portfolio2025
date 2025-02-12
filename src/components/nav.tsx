import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconExchange,
  IconHome,
  IconNewSection,
  IconUserBolt,
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
        <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/skills",
    },
    {
      title: "Contact Me",
      icon: (
        <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
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
