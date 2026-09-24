"use client";
import { useEffect, useState } from "react";

import { AnimatedCircularProgressBar } from "@/components/ui/animated-circular-progress-bar";
import { IconCloud } from "@/components/ui/icon-cloud";
import { useThemeMode } from "@/hooks/useThemeMode";

type Skill = {
  /** Self-assessed proficiency, 0-100. */
  level: number;
  /** Simple Icons slug, or a key in the local-icon map. */
  slug: string;
};

type SkillGroup = {
  heading: string;
  skills: Record<string, Skill>;
};

const skill = (level: number, slug: string): Skill => ({ level, slug });

/**
 * Skills, grouped and in display order.
 *
 * Previously these lived in four objects named skillsObject1-4 with no headings,
 * rendered out of order (1, then 3 + the icon cloud + 4, then 2), so the page
 * read as one undifferentiated wall of gauges. Same 40 entries, same levels —
 * only the grouping and order are new.
 */
const SKILL_GROUPS: SkillGroup[] = [
  {
    heading: "Frontend",
    skills: {
      HTML5: skill(95, "html5"),
      // Simple Icons retired the "css3" slug; the current one is "css".
      CSS3: skill(95, "css"),
      Bootstrap: skill(95, "bootstrap"),
      "Tailwind CSS": skill(90, "tailwindcss"),
      JavaScript: skill(95, "javascript"),
      TypeScript: skill(90, "typescript"),
      JQuery: skill(90, "jquery"),
      ReactJs: skill(90, "react"),
      NextJs: skill(80, "nextdotjs"),
      "React Native": skill(80, "react"),
      Redux: skill(90, "redux"),
      Angular: skill(90, "angular"),
      RxJS: skill(85, "reactivex"),
      NgRx: skill(85, "ngrx"),
      MaterialUI: skill(90, "mui"),
    },
  },
  {
    heading: "Backend & APIs",
    skills: {
      Nodejs: skill(90, "nodedotjs"),
      Expressjs: skill(90, "express"),
      "C#/.NET": skill(80, "dotnet"),
      PHP: skill(80, "php"),
      Python: skill(80, "python"),
      GraphQL: skill(70, "graphql"),
      Nexusjs: skill(75, "nexus"),
      "Google APIs": skill(90, "googlecloud"),
      // Simple Icons no longer carries an OpenAI mark, so this one falls back
      // to an initial. See SkillIcon in animated-circular-progress-bar.tsx.
      "OpenAI API": skill(90, "openai"),
      "Gemini API": skill(90, "googlegemini"),
    },
  },
  {
    heading: "Databases & ORMs",
    skills: {
      MySQL: skill(90, "mysql"),
      "MsSQL Server": skill(90, "mssql"),
      PostgreSQL: skill(75, "postgresql"),
      MongoDb: skill(70, "mongodb"),
      Mongoose: skill(70, "mongoose"),
      Prisma: skill(90, "prisma"),
      Knexjs: skill(80, "knexdotjs"),
      Firebase: skill(90, "firebase"),
    },
  },
  {
    heading: "Cloud & DevOps",
    skills: {
      Azure: skill(80, "azure"),
      "Google Cloud": skill(80, "googlecloud"),
      Docker: skill(70, "docker"),
    },
  },
  {
    heading: "Tooling & Process",
    skills: {
      Git: skill(90, "git"),
      Jira: skill(90, "jira"),
      Agile: skill(90, "agile"),
      Figma: skill(90, "figma"),
    },
  },
];

// Decorative marquee of logos. "java", "amazonaws" and "visualstudiocode" used
// to be here but Simple Icons has removed all three, so they only ever rendered
// as gaps; "css3" is now "css" and Java is represented by "openjdk".
const CLOUD_SLUGS = [
  "typescript",
  "javascript",
  "dart",
  "openjdk",
  "react",
  "flutter",
  "android",
  "html5",
  "css",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "androidstudio",
  "tailwindcss",
  "figma",
];

const CLOUD_IMAGES = CLOUD_SLUGS.map((slug) => `https://cdn.simpleicons.org/${slug}`);

const Skills = () => {
  const mode = useThemeMode();
  const [val, setVal] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVal((prev) => {
        const next = prev + 10;
        // The gauges finish filling after ~1s; stop the timer instead of
        // leaving it firing for the lifetime of the page.
        if (next >= 100) clearInterval(interval);
        return Math.min(next, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const gaugeSecondaryColor =
    mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";

  return (
    // min-h-screen only. The previous md:h-screen/lg:h-screen/xl:h-screen pinned
    // the section to exactly one viewport while rendering 40 gauges two-per-row
    // at those widths, so the content overflowed its own container. pb-40 keeps
    // the tail clear of the dock, which is fixed at bottom-10.
    <section className="z-10 flex min-h-screen animate-fadein flex-col items-center justify-center gap-10 px-4 pb-40 pt-28 duration-1000">
      <div className="flex w-full max-w-6xl flex-col gap-10">
        {SKILL_GROUPS.map((group) => (
          <section key={group.heading} aria-labelledby={`skills-${group.heading}`}>
            <h2
              id={`skills-${group.heading}`}
              className="mb-4 text-lg font-bold md:text-xl"
            >
              <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
                {group.heading}
              </span>
            </h2>

            <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8">
              {Object.entries(group.skills).map(([name, { level, slug }]) => (
                <li key={`${group.heading}-${name}`} className="h-32 w-32">
                  <AnimatedCircularProgressBar
                    name={name}
                    slug={slug}
                    max={100}
                    min={0}
                    value={Math.min(level, val)}
                    gaugePrimaryColor="rgb(79 70 229)"
                    gaugeSecondaryColor={gaugeSecondaryColor}
                  />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="h-60 w-60" aria-hidden="true">
        <div className="relative flex size-full items-center justify-center overflow-hidden">
          <IconCloud images={CLOUD_IMAGES} />
        </div>
      </div>
    </section>
  );
};

export default Skills;
