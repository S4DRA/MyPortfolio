import type { ReactNode } from "react"
import { AnimatedPageLink } from "@/components/animated-page-link"
import { Navigation } from "@/components/navigation"
import { ParticleBackground } from "@/components/particle-background"
import { Footer } from "@/components/footer"

type Metric = {
  label: string
  value: string
}

type ContentSection = {
  title: string
  description: string
  items: string[]
}

type ShowcaseCard = {
  title: string
  description: string
  tags: string[]
}

type PortfolioPageProps = {
  eyebrow: string
  title: string
  intro: string
  metrics: Metric[]
  sections: ContentSection[]
  showcases: ShowcaseCard[]
  heroVisual?: ReactNode
}

export function PortfolioPage({
  eyebrow,
  title,
  intro,
  metrics,
  sections,
  showcases,
  heroVisual,
}: PortfolioPageProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <ParticleBackground />
      <Navigation />

      <section className="relative px-4 pb-16 pt-32 sm:px-6 sm:pb-24 sm:pt-36">
        <div className="mx-auto max-w-6xl">
          <div
            className={`grid items-center gap-10 ${
              heroVisual ? "lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,420px)]" : ""
            }`}
          >
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full border border-primary/20 bg-[linear-gradient(180deg,rgba(151,205,255,0.12),rgba(255,255,255,0.02))] px-4 py-2 text-xs font-medium tracking-[0.25em] text-primary uppercase shadow-[0_0_20px_rgba(84,146,255,0.18)]">
                {eyebrow}
              </span>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl">
                {title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {intro}
              </p>
            </div>
            {heroVisual ? <div>{heroVisual}</div> : null}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rootonset-surface rootonset-outline rounded-2xl border p-5 backdrop-blur-sm"
              >
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="mt-2 text-xl font-semibold text-foreground">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          {sections.map((section) => (
            <div
              key={section.title}
                className="rootonset-surface rootonset-outline rounded-3xl border p-6 backdrop-blur-sm sm:p-8"
            >
              <h2 className="text-2xl font-semibold text-foreground">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {section.description}
              </p>
              <ul className="mt-6 space-y-3">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-white/10 bg-background/35 px-4 py-3 text-sm text-secondary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:text-base"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="relative px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">
              Highlights
            </p>
            <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
              Featured Work Direction
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {showcases.map((card) => (
              <article
                key={card.title}
                className="rootonset-surface rootonset-outline neon-navy-glow rounded-3xl border p-6 transition-colors hover:border-primary/50 hover:shadow-[0_0_34px_rgba(84,146,255,0.24)]"
              >
                <h3 className="text-xl font-semibold text-foreground">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {card.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                        className="rounded-full border border-primary/20 bg-[linear-gradient(180deg,rgba(151,205,255,0.12),rgba(255,255,255,0.02))] px-3 py-1 text-xs font-medium text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="rootonset-surface rootonset-glow mt-12 flex flex-col gap-4 rounded-3xl border border-primary/20 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h3 className="text-xl font-semibold text-foreground">
                Want to explore more of the portfolio?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                Return to the homepage to browse the full portfolio and contact
                section.
              </p>
            </div>
            <AnimatedPageLink
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-[linear-gradient(180deg,rgba(124,196,255,1),rgba(48,93,214,1)_52%,rgba(17,33,74,1))] px-5 py-3 font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 hover:shadow-[0_0_38px_rgba(66,123,255,0.34)]"
            >
              Back to Home
            </AnimatedPageLink>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
