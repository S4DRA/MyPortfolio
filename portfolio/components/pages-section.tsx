import { AnimatedPageLink } from "@/components/animated-page-link"
import { portfolioPages } from "@/lib/portfolio-pages"

export function PagesSection() {
  return (
    <section id="pages" className="relative px-4 py-16 sm:px-6 sm:py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center gap-3 sm:mb-12 sm:gap-4">
          <span className="font-mono text-xs text-muted-foreground sm:text-sm">05.</span>
          <h2 className="text-xl text-foreground sm:text-3xl md:text-4xl">Deep Dive Pages</h2>
          <div className="h-px max-w-xs flex-1 bg-border" />
        </div>

        <div className="mb-8 max-w-3xl sm:mb-12">
          <span className="section-kicker">Go deeper</span>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            The homepage is the high-signal overview. These pages unpack the broader range behind
            the core case studies.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
          {portfolioPages.map((page) => (
            <AnimatedPageLink
              key={page.href}
              href={page.href}
              className="rootonset-surface rootonset-outline group rounded-sm border p-5 transition-colors hover:border-foreground/20 hover:bg-secondary"
            >
              <p className="text-base font-semibold text-foreground sm:text-lg">{page.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{page.description}</p>
              <span className="mt-5 inline-flex text-sm text-foreground">Open page</span>
            </AnimatedPageLink>
          ))}
        </div>
      </div>
    </section>
  )
}
