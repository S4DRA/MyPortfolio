import { Scene } from "@/components/cinematic/scene"
const skillGroups = [
  {
    title: "Primary strengths",
    items: [
      "Product thinking",
      "UI/UX design",
      "AI-assisted development",
      "Rapid prototyping",
      "Next.js and React workflows",
      "Technical communication",
    ],
  },
  {
    title: "Working knowledge",
    items: ["Python", "C++", "C#", "Databases", "APIs", "Supabase", "Git and GitHub"],
  },
  {
    title: "Tools",
    items: ["Figma", "VS Code", "Next.js", "React", "TypeScript", "Supabase", "Prisma", "Vercel"],
  },
]

export function SkillsSection() {
  return (
    <Scene order={11} id="skills" className="relative z-10 px-4 py-20 sm:px-6 sm:py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div
          className="transition-all duration-700 translate-y-0 opacity-100"
        >
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <div>
              <p className="text-sm text-primary">Skills and tools</p>
              <h2 className="mt-4 text-4xl text-foreground sm:text-5xl">
                The useful part is range with taste.
              </h2>
            </div>

            <div>
              <p className="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                I do not want this section to pretend skill can be measured by decorative
                percentages. These are the areas I use most often when I am turning an idea into a
                working product.
              </p>

              <div className="mt-10 grid gap-10">
                {skillGroups.map((group) => (
                  <div key={group.title} className="border-t border-border/70 pt-6">
                    <h3 className="text-xl text-foreground sm:text-2xl">{group.title}</h3>
                    <ul className="mt-5 flex flex-wrap gap-2.5">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="border border-border/70 bg-card/45 px-3 py-2 text-sm text-foreground/86"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Scene>
  )
}
