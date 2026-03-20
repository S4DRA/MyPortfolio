"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { AnimatedPageLink } from "@/components/animated-page-link"
import { portfolioPages } from "@/lib/portfolio-pages"

export function HeroSection() {
  const [step, setStep] = useState(0)
  const [showZoomPopup, setShowZoomPopup] = useState(false)

  useEffect(() => {
    const timeouts = [
      window.setTimeout(() => setStep(1), 80),
      window.setTimeout(() => setStep(2), 240),
      window.setTimeout(() => setStep(3), 400),
      window.setTimeout(() => setStep(4), 560),
    ]

    return () => {
      timeouts.forEach((timeout) => window.clearTimeout(timeout))
    }
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(max-width: 2250px) and (min-width: 1024px)"
    )

    const updateZoomPopup = (event?: MediaQueryListEvent) => {
      setShowZoomPopup(event ? event.matches : mediaQuery.matches)
    }

    updateZoomPopup()
    mediaQuery.addEventListener("change", updateZoomPopup)

    return () => mediaQuery.removeEventListener("change", updateZoomPopup)
  }, [])

  const showName = step >= 1
  const showPortfolio = step >= 2
  const showPages = step >= 3
  const showActions = step >= 4

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center px-4 py-28 sm:px-6 sm:py-32"
    >
      {showZoomPopup ? (
        <div className="fixed top-20 left-1/2 z-40 hidden w-[min(calc(100%-2rem),28rem)] -translate-x-1/2 rounded-2xl border border-amber-300/30 bg-[rgba(29,18,8,0.88)] px-5 py-4 text-center shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:block">
          <p className="text-sm font-semibold text-amber-100">
            Zoom out to view all content (80% zoom recommended)
          </p>
        </div>
      ) : null}

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <div
          className={`transition-all duration-500 ${
            showName ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="mx-auto mb-8 w-full max-w-[180px] sm:max-w-[220px] lg:mb-10 lg:max-w-[280px]">
            <div className="rootonset-surface rootonset-outline relative overflow-hidden rounded-sm border p-3">
              <Image
                src="/myPhoto.jpg"
                alt="Portrait of Sadra Ahadiyan"
                width={900}
                height={1100}
                priority
                className="aspect-[4/5] w-full rounded-sm object-cover object-center"
              />
            </div>
          </div>
          <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">Portfolio</p>
          <h1 className="mt-6 px-2 text-[clamp(2.8rem,11vw,6.4rem)] leading-[1.02] text-balance text-foreground">
            Sadra Ahadiyan
          </h1>
        </div>

        <div
          className={`mt-6 transition-all delay-75 duration-500 ${
            showPortfolio ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="mx-auto max-w-3xl px-3 text-base leading-relaxed text-muted-foreground sm:px-4 sm:text-lg md:text-xl">
            Computer engineering student with interests in software development, AI systems,
            and well-structured digital experiences.
          </p>
        </div>

        <div
          className={`mt-12 transition-all delay-100 duration-500 ${
            showPages ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex flex-wrap items-center justify-center gap-2.5 px-2 sm:gap-3 sm:px-4">
            {portfolioPages.map((page) => (
              <AnimatedPageLink
                key={page.href}
                href={page.href}
                className="rounded-sm border border-border bg-card px-4 py-2.5 text-sm text-foreground transition-colors hover:border-foreground/20 hover:bg-secondary sm:px-5"
              >
                {page.title}
              </AnimatedPageLink>
            ))}
          </div>
        </div>

        <div
          className={`mt-10 transition-all delay-150 duration-500 ${
            showActions ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex flex-col items-center justify-center gap-3 px-2 sm:flex-row sm:gap-4 sm:px-4">
            <a
              href="#projects"
              className="inline-flex w-full max-w-xs items-center justify-center rounded-sm border border-foreground bg-foreground px-6 py-3 font-medium text-background transition-colors hover:border-primary hover:bg-primary sm:w-auto sm:max-w-none"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="inline-flex w-full max-w-xs items-center justify-center rounded-sm border border-border bg-card px-6 py-3 font-medium text-foreground transition-colors hover:bg-secondary sm:w-auto sm:max-w-none"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
