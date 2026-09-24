"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import azure from "../../assets/Microsoft_Azure_Logo.svg"
import mssql from "../../assets/microsoft-sql-server.svg"
import agile from "../../assets/agile.svg"
import nexus from "../../assets/45704111.png"
import Image from "next/image";

/** Brands that Simple Icons does not carry, drawn from local assets instead. */
const LOCAL_ICONS: Record<string, typeof azure> = {
  azure,
  mssql,
  agile,
  nexus,
};

const ICON_CLASSES =
  "bg-black/[0.19] dark:bg-white/[0.27] backdrop-blur-md rounded-full p-1";

/**
 * A skill's logo, with a graceful fallback.
 *
 * Simple Icons has removed several brands over time (OpenAI, AWS and VS Code
 * among them, for trademark reasons), and a removed slug returns 404. Without an
 * onError handler that left a silent broken-image glyph, so fall back to the
 * skill's initial instead.
 */
function SkillIcon({ slug, name }: { slug: string; name: string }) {
  const [failed, setFailed] = useState(false);
  const local = LOCAL_ICONS[slug];

  if (local) {
    return <Image src={local} alt="" width="30" height="30" className={ICON_CLASSES} />;
  }

  if (failed) {
    return (
      <span
        aria-hidden="true"
        className={cn(
          ICON_CLASSES,
          "flex h-[30px] w-[30px] items-center justify-center text-xs font-bold uppercase"
        )}
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
      width="30"
      height="30"
      loading="lazy"
      onError={() => setFailed(true)}
      className={ICON_CLASSES}
    />
  );
}
interface AnimatedCircularProgressBarProps {
  max: number;
  value: number;
  min: number;
  gaugePrimaryColor: string;
  gaugeSecondaryColor: string;
  className?: string;
  name: string;
  slug: string;
}

export function AnimatedCircularProgressBar({
  max = 100,
  min = 0,
  value = 0,
  gaugePrimaryColor,
  gaugeSecondaryColor,
  className,
name,
slug
}: AnimatedCircularProgressBarProps) {
  const circumference = 2 * Math.PI * 45;
  const percentPx = circumference / 100;
  const currentPercent = Math.round(((value - min) / (max - min)) * 100);

  return (
    <div
      className={cn("relative size-32 text-2xl font-semibold", className)}
      style={
        {
          "--circle-size": "100px",
          "--circumference": circumference,
          "--percent-to-px": `${percentPx}px`,
          "--gap-percent": "5",
          "--offset-factor": "0",
          "--transition-length": "1s",
          "--transition-step": "200ms",
          "--delay": "0s",
          "--percent-to-deg": "3.6deg",
          transform: "translateZ(0)",
        } as React.CSSProperties
      }
    >
      <svg
        fill="none"
        className="size-full"
        strokeWidth="2"
        viewBox="0 0 100 100"
      >
        {currentPercent <= 90 && currentPercent >= 0 && (
          <circle
            cx="50"
            cy="50"
            r="45"
            strokeWidth="10"
            strokeDashoffset="0"
            strokeLinecap="round"
            strokeLinejoin="round"
            className=" opacity-100"
            style={
              {
                stroke: gaugeSecondaryColor,
                "--stroke-percent": 90 - currentPercent,
                "--offset-factor-secondary": "calc(1 - var(--offset-factor))",
                strokeDasharray:
                  "calc(var(--stroke-percent) * var(--percent-to-px)) var(--circumference)",
                transform:
                  "rotate(calc(1turn - 90deg - (var(--gap-percent) * var(--percent-to-deg) * var(--offset-factor-secondary)))) scaleY(-1)",
                transition: "all var(--transition-length) ease var(--delay)",
                transformOrigin:
                  "calc(var(--circle-size) / 2) calc(var(--circle-size) / 2)",
              } as React.CSSProperties
            }
          />
        )}
        <circle
          cx="50"
          cy="50"
          r="45"
          strokeWidth="10"
          strokeDashoffset="0"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-100"
          style={
            {
              stroke: gaugePrimaryColor,
              "--stroke-percent": currentPercent,
              strokeDasharray:
                "calc(var(--stroke-percent) * var(--percent-to-px)) var(--circumference)",
              transition:
                "var(--transition-length) ease var(--delay),stroke var(--transition-length) ease var(--delay)",
              transitionProperty: "stroke-dasharray,transform",
              transform:
                "rotate(calc(-90deg + var(--gap-percent) * var(--offset-factor) * var(--percent-to-deg)))",
              transformOrigin:
                "calc(var(--circle-size) / 2) calc(var(--circle-size) / 2)",
            } as React.CSSProperties
          }
        />
      </svg>
 
      <span
        data-current-value={currentPercent}
        className="duration-[var(--transition-length)] delay-[var(--delay)] absolute inset-0 m-auto size-fit ease-linear animate-in fade-in text-sm text-center"
      >


        <span className="items-center justify-center flex ">
          <SkillIcon slug={slug} name={name} />
        </span>

        {currentPercent}% <br />
        <span className="text-sm font-semibold">{name}</span>
      </span>
      
    </div>
  );
}
