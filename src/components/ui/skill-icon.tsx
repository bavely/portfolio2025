"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import azure from "../../assets/Microsoft_Azure_Logo.svg";
import mssql from "../../assets/microsoft-sql-server.svg";
import agile from "../../assets/agile.svg";
import nexus from "../../assets/45704111.png";
import openai from "../../assets/OpenAI_logo_2025_(symbol).svg";
/** Brands Simple Icons does not carry, drawn from local assets instead. */
const LOCAL_ICONS: Record<string, typeof azure> = {
  azure,
  mssql,
  agile,
  nexus,
  openai,
};

const SIZE = 30;

const BASE_CLASSES =
  "shrink-0 rounded-full bg-black/[0.19] p-1 backdrop-blur-md dark:bg-white/[0.27]";

/**
 * A skill's logo, with a graceful fallback.
 *
 * Simple Icons has retired several brands over time — OpenAI, AWS and VS Code
 * among them, for trademark reasons — and a retired slug returns 404. Without an
 * onError handler that left a silent broken-image glyph, so fall back to the
 * skill's initial.
 *
 * Decorative in every branch: the skill name is always rendered as text beside
 * it, so an alt text here would just be read twice.
 */
export function SkillIcon({ slug, name }: { slug: string; name: string }) {
  const [failed, setFailed] = useState(false);
  const local = LOCAL_ICONS[slug];

  if (local) {
    return (
      <Image src={local} alt="" width={SIZE} height={SIZE} className={BASE_CLASSES} />
    );
  }

  if (failed) {
    return (
      <span
        aria-hidden="true"
        className={cn(
          BASE_CLASSES,
          "flex items-center justify-center text-xs font-bold uppercase"
        )}
        style={{ width: SIZE, height: SIZE }}
      >
        {name.charAt(0)}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://cdn.simpleicons.org/${slug.toLowerCase()}`}
      alt=""
      width={SIZE}
      height={SIZE}
      loading="lazy"
      onError={() => setFailed(true)}
      className={BASE_CLASSES}
    />
  );
}
