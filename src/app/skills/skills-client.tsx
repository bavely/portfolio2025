"use client";

import { IconCloud } from "@/components/ui/icon-cloud";
import { SkillIcon } from "@/components/ui/skill-icon";

/**
 * Proficiency tiers.
 *
 * This page used to render a percentage gauge per skill ("HTML5 95%",
 * "Docker 70%"). Those numbers were self-assessed, and a one-point gap between
 * 90 and 91 carried no real meaning — precision the underlying judgement cannot
 * support. Three tiers keep the useful signal (relative strength) and drop the
 * false precision.
 *
 * The `level` values below are the original self-assessments, kept as the single
 * source the tier is derived from: retune THRESHOLDS here rather than editing
 * forty entries.
 */
const THRESHOLDS = {
  advanced: 90,
  proficient: 80,
} as const;

type Tier = "advanced" | "proficient" | "familiar";

const TIER_LABELS: Record<Tier, string> = {
  advanced: "Advanced",
  proficient: "Proficient",
  familiar: "Familiar",
};

/** Filled dots per tier, used by the indicator and the legend. */
const TIER_DOTS: Record<Tier, number> = {
  advanced: 3,
  proficient: 2,
  familiar: 1,
};

function tierFor(level: number): Tier {
  if (level >= THRESHOLDS.advanced) return "advanced";
  if (level >= THRESHOLDS.proficient) return "proficient";
  return "familiar";
}

type Skill = {
  name: string;
  /** Simple Icons slug, or a key in the local-icon map. */
  slug: string;
  /** Original self-assessment, 0-100. Drives the tier; never displayed. */
  level: number;
};

type SkillGroup = {
  id: string;
  heading: string;
  description: string;
  skills: Skill[];
};

const s = (name: string, slug: string, level: number): Skill => ({ name, slug, level });

/**
 * Skills, grouped and in display order.
 *
 * Previously four objects named skillsObject1-4 with no headings, rendered out
 * of order (1, then 3 + the icon cloud + 4, then 2). Same 40 entries and the
 * same levels — only the grouping, order and presentation are new.
 */
const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "foundations",
    heading: "Languages & Web Foundations",
    description: "Core languages and browser technologies used across the stack.",
    skills: [
      s("HTML5", "html5", 95),
      // Simple Icons retired the "css3" slug; the current one is "css".
      s("CSS3", "css", 95),
      s("JavaScript", "javascript", 95),
      s("TypeScript", "typescript", 90),
      s("Python", "python", 80),
      s("C# / .NET", "dotnet", 80),
      s("PHP", "php", 70),
    ],
  },
  {
    id: "frontend-mobile",
    heading: "Frontend & Mobile",
    description: "UI frameworks, styling systems, and client-side state management.",
    skills: [
      s("Bootstrap", "bootstrap", 95),
      s("Tailwind CSS", "tailwindcss", 90),
      s("jQuery", "jquery", 90),
      s("React", "react", 90),
      s("Next.js", "nextdotjs", 80),
      s("React Native", "react", 80),
      s("Redux", "redux", 90),
      s("Angular", "angular", 90),
      s("RxJS", "reactivex", 85),
      s("NgRx", "ngrx", 85),
      s("Material UI", "mui", 90),
    ],
  },
  {
    id: "backend-apis",
    heading: "Backend & API Development",
    description: "Server runtimes, API design, and integration technologies.",
    skills: [
      s("Node.js", "nodedotjs", 90),
      s("NestJS", "nestjs", 80),
      s("Express", "express", 90),
      s("GraphQL", "graphql", 70),
      s("Nexus.js", "nexus", 75),
      s("Google APIs", "googlecloud", 90),
    ],
  },
  {
    id: "data-persistence",
    heading: "Data & Persistence",
    description: "Relational and document databases, ORMs, and backend data services.",
    skills: [
      s("MySQL", "mysql", 90),
      s("SQL Server", "mssql", 90),
      s("PostgreSQL", "postgresql", 75),
      s("MongoDB", "mongodb", 80),
      s("Mongoose", "mongoose", 70),
      s("Prisma", "prisma", 90),
      s("Knex.js", "knexdotjs", 80),
      s("Firebase", "firebase", 90),
    ],
  },
  {
    id: "ai",
    heading: "AI Platforms & Assistants",
    description: "AI service integrations and tools used in the development workflow.",
    skills: [
      // Simple Icons no longer carries an OpenAI mark, so the local asset is
      // shared by the OpenAI API and Codex entries. See SkillIcon.
      s("OpenAI API", "openai", 90),
      s("Gemini API", "googlegemini", 90),
      s("Claude Code", "claude", 90),
      s("Codex", "openai", 90),
      s("GitHub Copilot", "github", 90),
    ],
  },
  {
    id: "cloud-devops",
    heading: "Cloud & DevOps",
    description: "Cloud platforms, containers, and source-control workflows.",
    skills: [
      s("Azure", "azure", 80),
      s("Google Cloud", "googlecloud", 80),
      s("Docker", "docker", 70),
      s("Git", "git", 90),
    ],
  },
  {
    id: "testing-quality",
    heading: "Testing & Quality",
    description: "Automated testing tools for reliable frontend applications.",
    skills: [
      s("Jest", "jest", 90),
      s("Testing Library", "testinglibrary", 80),
    ],
  },
  {
    id: "design-delivery",
    heading: "Design & Delivery",
    description: "Product design, planning, and collaborative delivery practices.",
    skills: [
      s("Figma", "figma", 90),
      s("Jira", "jira", 90),
      s("Agile", "agile", 90),
    ],
  },
];

// Keep the decorative cloud synchronized with the categorized list. Local-only
// icons cannot be loaded by the canvas from the Simple Icons CDN, so omit those
// slugs here; they still appear beside their named skill above.
const LOCAL_ICON_SLUGS = new Set(["azure", "mssql", "agile", "nexus", "openai"]);
const CLOUD_SLUGS = Array.from(
  new Set(
    SKILL_GROUPS.flatMap((group) => group.skills.map((skill) => skill.slug)),
  ),
).filter((slug) => !LOCAL_ICON_SLUGS.has(slug));

const CLOUD_IMAGES = CLOUD_SLUGS.map((slug) => `https://cdn.simpleicons.org/${slug}`);

function TierDots({ tier }: { tier: Tier }) {
  const filled = TIER_DOTS[tier];

  return (
    <span className="flex items-center gap-1">
      {/* The dots are decorative; the tier is announced by the sr-only text. */}
      <span aria-hidden="true" className="flex items-center gap-[3px]">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={
              i < filled
                ? "h-1.5 w-1.5 rounded-full bg-indigo-500"
                : "h-1.5 w-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700"
            }
          />
        ))}
      </span>
      <span className="sr-only">{TIER_LABELS[tier]}</span>
    </span>
  );
}

function Legend() {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-neutral-500 dark:text-neutral-400">
      {(Object.keys(TIER_LABELS) as Tier[]).map((tier) => (
        <li key={tier} className="flex items-center gap-2">
          <span aria-hidden="true" className="flex items-center gap-[3px]">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={
                  i < TIER_DOTS[tier]
                    ? "h-1.5 w-1.5 rounded-full bg-indigo-500"
                    : "h-1.5 w-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700"
                }
              />
            ))}
          </span>
          {TIER_LABELS[tier]}
        </li>
      ))}
    </ul>
  );
}

const Skills = () => {
  return (
    // min-h-screen only: a fixed md:h-screen used to pin the section to one
    // viewport while its content needed several. pb-40 keeps the tail clear of
    // the dock, which is fixed at bottom-10.
    <section className="z-10 flex min-h-screen animate-fadein flex-col items-center gap-10 px-4 pb-40 pt-28 duration-1000">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tighter md:text-4xl">
          <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
            Skills
          </span>
        </h1>
        <Legend />
      </div>

      <div className="flex w-full max-w-6xl flex-col gap-10">
        {SKILL_GROUPS.map((group) => {
          // Strongest first, so the most relevant items lead each group.
          const ordered = [...group.skills].sort(
            (a, b) => b.level - a.level || a.name.localeCompare(b.name)
          );

          return (
            <section key={group.id} aria-labelledby={`skills-${group.id}`}>
              <div className="mb-4 flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
                <div>
                  <h2
                    id={`skills-${group.id}`}
                    className="text-lg font-bold md:text-xl"
                  >
                    {group.heading}
                  </h2>
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                    {group.description}
                  </p>
                </div>
                <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  {group.skills.length} {group.skills.length === 1 ? "skill" : "skills"}
                </span>
              </div>

              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                {ordered.map((skill) => (
                  <li
                    key={`${group.heading}-${skill.name}`}
                    className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-white/40 px-3 py-2 backdrop-blur-sm dark:border-neutral-800 dark:bg-white/[0.03]"
                  >
                    <SkillIcon slug={skill.slug} name={skill.name} />
                    <span className="flex min-w-0 flex-col">
                      <span className="truncate text-sm font-semibold">{skill.name}</span>
                      <TierDots tier={tierFor(skill.level)} />
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
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
