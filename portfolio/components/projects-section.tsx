import { Scene } from "@/components/cinematic/scene"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { AnimatedPageLink } from "@/components/animated-page-link"
import { cn } from "@/lib/utils"
import { featuredProjects, otherProjects } from "@/lib/portfolio/legacy"

export function ProjectsSection() {
  return (
    <section id="projects" className="relative z-10 px-4 py-20 sm:px-6 sm:py-30 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div
          className="transition-all duration-700 translate-y-0 opacity-100"
        >
          <div className="mb-14 max-w-3xl sm:mb-20">
            <p className="text-sm text-primary">Selected Work</p>
            <h2 className="mt-4 text-4xl text-foreground sm:text-6xl">The work carries the story.</h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              I am showing the work through decisions, constraints, and visible product surfaces,
              not invented numbers. The strongest projects have room to breathe.
            </p>
          </div>

          <div className="grid gap-24 sm:gap-32">
            {featuredProjects.map((project, index) => (
              <FeaturedProject key={project.title} project={project} index={index} />
            ))}
          </div>

          <div className="mt-24 sm:mt-32">
            <div className="grid gap-5 border-y border-border/70 py-8 lg:grid-cols-[0.65fr_1.35fr] lg:gap-12">
              <div>
                <p className="text-sm text-primary">Other selected projects</p>
                <h3 className="mt-3 text-3xl text-foreground sm:text-4xl">Range without the noise.</h3>
              </div>
              <p className="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                These are smaller or earlier projects, so I am presenting them as honest snapshots:
                what they explored, what I learned, and what kind of product thinking they show.
              </p>
            </div>

            <div className="divide-y divide-border/70">
              {otherProjects.map((project) => {
                const Icon = project.icon

                return (
                  <Scene as="article" id={`project-${project.id}`} projectId={project.id} projectIndex={project.index} order={project.order}
                    key={project.title}
                    className="grid gap-5 py-8 lg:grid-cols-[0.52fr_1fr] lg:gap-10"
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-border/70 bg-card/65 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{project.type}</p>
                        <h4 className="mt-2 text-2xl text-foreground">{project.title}</h4>
                      </div>
                    </div>

                    <div>
                      <p className="text-base leading-relaxed text-foreground/86">{project.description}</p>
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{project.evidence}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="border border-border/70 px-3 py-1.5 text-xs text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Scene>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturedProject({
  project,
  index,
}: {
  project: (typeof featuredProjects)[number]
  index: number
}) {
  const Icon = project.icon
  const reverse = index % 2 === 1

  return (
    <Scene as="article" id={`project-${project.id}`} projectId={project.id} projectIndex={project.index} order={project.order}
      className={cn(
        "grid items-start gap-8 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:gap-12",
        reverse && "lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)]"
      )}
    >
      <div className={cn("lg:sticky lg:top-28", reverse && "lg:order-2")}>
        <div className="flex items-center gap-3 text-sm text-primary">
          <Icon className="h-4 w-4" />
          <span>{project.eyebrow}</span>
        </div>
        <h3 className="mt-4 text-5xl text-foreground sm:text-7xl">{project.title}</h3>
        <p className="mt-6 text-xl leading-relaxed text-foreground/88">{project.oneLine}</p>

        <dl className="mt-8 grid gap-6 border-t border-border/70 pt-7">
          <ProjectDetail label="The Problem" value={project.problem} />
          <ProjectDetail label="My Role" value={project.role} />
          <ProjectDetail label="What I Built" value={project.built} />
          <ProjectDetail label="Design / Technical Decision" value={project.decision} />
          <ProjectDetail label="What Changed" value={project.change} />
          <ProjectDetail label="Current Status" value={project.status} />
        </dl>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {project.links.map((link) =>
            link.internal ? (
              <AnimatedPageLink
                key={link.label}
                href={link.href}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-foreground bg-foreground px-5 py-3 text-sm font-medium text-background transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {link.label}
                <ArrowUpRight className="h-4 w-4" />
              </AnimatedPageLink>
            ) : (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-border bg-card/72 px-5 py-3 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/35 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {link.label}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )
          )}
        </div>
      </div>

      <div className={cn("grid gap-5", reverse && "lg:order-1")}>
        {project.visuals.map((visual) => (
          <figure
            key={visual.src}
            className={cn(
              "group overflow-hidden border border-border/70 bg-card/55 shadow-[0_30px_80px_rgba(0,0,0,0.3)]",
              visual.className
            )}
          >
            <Image
              src={visual.src}
              alt={visual.alt}
              width={1920}
              height={1200}
              sizes="(min-width: 1280px) 650px, (min-width: 1024px) 50vw, calc(100vw - 48px)"
              className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <figcaption className="border-t border-border/70 px-4 py-3 text-sm text-muted-foreground">
              {visual.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </Scene>
  )
}

function ProjectDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:gap-6">
      <dt className="text-sm text-foreground">{label}</dt>
      <dd className="text-sm leading-relaxed text-muted-foreground sm:text-base">{value}</dd>
    </div>
  )
}
