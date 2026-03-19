import { AnimatedPageLink } from "@/components/animated-page-link"
import { portfolioPages } from "@/lib/portfolio-pages"

export function PagesSection() {
  return (
    <section id="pages" className="relative px-4 py-16 sm:px-6 sm:py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center gap-3 sm:mb-12 sm:gap-4">
          <span className="font-mono text-xs text-primary sm:text-sm">04.</span>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
            Portfolio Pages
          </h2>
          <div className="h-px max-w-xs flex-1 bg-border" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {portfolioPages.map((page) => (
            <AnimatedPageLink
              key={page.href}
              href={page.href}
              className="group rounded-3xl border border-border bg-card/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(100,200,220,0.12)]"
            >
              <p className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                {page.title}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {page.description}
              </p>
              <span className="mt-5 inline-flex text-sm font-medium text-primary">
                Open page
              </span>
            </AnimatedPageLink>
          ))}
        </div>
      </div>
    </section>
  )
}
