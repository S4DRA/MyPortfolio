import { ArrowUpRight } from "lucide-react"
import { AnimatedPageLink } from "@/components/animated-page-link"
import { portfolioPages } from "@/lib/portfolio-pages"

const experience = [
  {
    company: "Exairon Company",
    role: "Full-Stack Developer",
    dates: "2025",
    contribution:
      "Worked on an AI-based client interaction platform, fixed product issues, improved user-facing flows, and built documentation so the product was easier to understand.",
  },
  {
    company: "BAU International Office",
    role: "Student Assistant",
    dates: "2024-2025",
    contribution:
      "Supported students through registration and academic processes while keeping communication clear and organized during busy periods.",
  },
  {
    company: "BAU Dental Hospital",
    role: "Student Assistant",
    dates: "2024",
    contribution:
      "Helped patients understand treatment options and next steps, then coordinated with doctors when patients needed extra support.",
  },
]

export function PagesSection() {
  return (
    <section id="experience" className="relative z-10 bg-secondary/28 px-4 py-20 sm:px-6 sm:py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <div>
            <p className="text-sm text-primary">Selected Experience</p>
            <h2 className="mt-4 text-4xl text-foreground sm:text-5xl">Work that taught me how products behave in real life.</h2>
            <AnimatedPageLink
              href="/work-experience"
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-border bg-card/72 px-5 py-3 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/35 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Full experience page
              <ArrowUpRight className="h-4 w-4" />
            </AnimatedPageLink>
          </div>

          <div className="divide-y divide-border/70">
            {experience.map((item) => (
              <article key={item.company} className="grid gap-3 py-7 sm:grid-cols-[12rem_1fr] sm:gap-8">
                <div>
                  <p className="text-sm text-muted-foreground">{item.dates}</p>
                  <h3 className="mt-2 text-xl text-foreground">{item.company}</h3>
                </div>
                <div>
                  <p className="text-base font-medium text-foreground/90">{item.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {item.contribution}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-18 border-t border-border/70 pt-10 sm:mt-24">
          <div className="mb-7 max-w-2xl">
            <p className="text-sm text-primary">More context</p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              These pages keep the existing routes available for deeper project, design, and
              background details without making the homepage carry everything at once.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioPages
              .filter((page) => page.href !== "/work-experience")
              .map((page) => (
                <AnimatedPageLink
                  key={page.href}
                  href={page.href}
                  className="group border border-border/70 bg-card/45 p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:bg-card/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-lg font-medium text-foreground">{page.title}</p>
                    <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{page.description}</p>
                </AnimatedPageLink>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
