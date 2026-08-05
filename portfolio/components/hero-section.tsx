"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { ArrowRight, Download } from "lucide-react"

const facts = [
  ["Based in", "Istanbul"],
  ["Studying", "Computer Engineering"],
  ["Open to", "Product, UI/UX, software, support, and AI-focused roles"],
]

export function HeroSection() {
  const [isReady, setIsReady] = useState(true)

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsReady(true), 80)
    return () => window.clearTimeout(timeout)
  }, [])

  return (
    <section
      id="hero"
      className="relative z-10 flex min-h-screen items-center overflow-hidden px-4 pb-18 pt-28 sm:px-6 sm:pb-24 sm:pt-32"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.72fr)] lg:gap-16">
        <div
          className={`max-w-4xl transition-all duration-700 ${
            isReady ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="max-w-xl text-sm leading-relaxed text-primary sm:text-base">
          </p>

          <h1 className="mt-5 max-w-[14ch] text-5xl leading-[0.98] text-foreground text-balance sm:text-6xl lg:text-7xl xl:text-8xl">
            I design and build product-focused software with AI-powered workflows.
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-relaxed text-foreground/84 sm:text-xl">
            I combine product thinking, interface design, and rapid development to turn early
            ideas into clear, usable digital products.
          </p>

          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Computer Engineering student based in Istanbul, open to product, UI/UX, software,
            technical support, and AI-focused opportunities.
          </p>

          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <a
              href="#projects"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-foreground bg-foreground px-6 py-3 text-sm font-medium text-background transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              View Selected Work
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/sadra-ahadiyan-cv.pdf"
              download
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-border bg-card/75 px-6 py-3 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/35 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Download CV
              <Download className="h-4 w-4" />
            </a>
          </div>

          <dl className="mt-12 grid max-w-3xl gap-5 border-t border-border/70 pt-6 sm:grid-cols-3">
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs text-muted-foreground">{label}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-foreground/90">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          className={`mx-auto w-full max-w-[320px] transition-all delay-100 duration-700 sm:max-w-[380px] lg:justify-self-end ${
            isReady ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="hero-portrait-shell scan-border relative overflow-hidden rounded-[1.15rem] border border-border/60 p-2 shadow-[0_28px_90px_rgba(0,0,0,0.34)]">
            <div className="hero-portrait-glow absolute inset-0" aria-hidden="true" />
            <div className="hero-scanline absolute inset-x-0 top-0 h-16" aria-hidden="true" />
            <Image
              src="/myPhoto.jpg"
              alt="Portrait of Sadra Ahadiyan"
              width={900}
              height={1100}
              priority
              className="relative aspect-[4/5] w-full rounded-[0.85rem] object-cover object-center"
            />
          </div>

          <div className="mt-5 border-l border-primary/35 pl-5">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Portfolio Note
            </p>
            <p className="mt-3 text-sm leading-relaxed text-foreground/82">
              A quieter portfolio about the work itself: what I built, what changed, and where I
              want to contribute next.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
