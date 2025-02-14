import { cn } from "@/lib/utils";
import azure from "../../assets/Microsoft_Azure_Logo.svg"
import mssql from "../../assets/microsoft-sql-server.svg"
import agile from "../../assets/agile.svg"
import nexus from "../../assets/45704111.png"
import Image from "next/image";
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
          {slug === "azure" ? <Image src={azure} alt="" width="30" height="30" className="bg-black/[0.19] dark:bg-white/[0.17] backdrop-blur-md rounded-full p-1"/> : 
          slug === "mssql" ? <Image src={mssql} alt="" width="30" height="30" className="bg-black/[0.19] dark:bg-white/[0.17] backdrop-blur-md rounded-full p-1"/> : 
          slug === "agile" ? <Image src={agile} alt="" width="30" height="30" className="bg-black/[0.19] dark:bg-white/[0.17] backdrop-blur-md rounded-full p-1"/> : 
          slug === "nexus" ? <Image src={nexus} alt="" width="30" height="30" className="bg-black/[0.19] dark:bg-white/[0.17] backdrop-blur-md rounded-full p-1"/> :
          // eslint-disable-next-line @next/next/no-img-element
          <img 
          src={`https://cdn.simpleicons.org/${slug.toLowerCase()}/${slug.toLowerCase()}`} 
          alt={""} 
          width="30" 
          height="30" 
          className="bg-black/[0.19] dark:bg-white/[0.27] backdrop-blur-md rounded-full p-1"
        />
          }
 </span>

        {currentPercent}% <br />
        <span className="text-sm font-semibold">{name}</span>
      </span>
      
    </div>
  );
}
