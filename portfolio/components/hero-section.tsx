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
      window.setTimeout(() => setStep(2), 420),
      window.setTimeout(() => setStep(3), 760),
      window.setTimeout(() => setStep(4), 1080),
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
        <div className="absolute inset-x-0 top-1/2 -z-10 mx-auto h-64 w-64 -translate-y-1/2 rounded-full bg-primary/16 blur-3xl sm:h-80 sm:w-80 lg:h-[32rem] lg:w-[32rem]" />

        <div
          className={`transition-all duration-500 ${
            showName
              ? "translate-y-0 scale-100 opacity-100 blur-0"
              : "translate-y-12 scale-90 opacity-0 blur-md"
          }`}
        >
          <div className="mx-auto mb-6 w-full max-w-[170px] sm:mb-8 sm:max-w-[220px] lg:mb-10 lg:max-w-[320px]">
            <div className="rootonset-surface rootonset-outline rootonset-glow relative overflow-hidden rounded-[1.8rem] border p-2 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-t from-background/35 via-transparent to-transparent" />
              <Image
                src="/myPhoto.jpg"
                alt="Portrait of Sadra Ahadiyan"
                width={900}
                height={1100}
                priority
                className="relative z-10 aspect-[4/5] w-full rounded-[1.35rem] object-cover object-center"
              />
            </div>
          </div>
          <h1 className="px-2 text-[clamp(2.8rem,12vw,8.2rem)] font-bold leading-[0.92] tracking-tight text-balance text-foreground">
            Sadra{" "}
            <span className="chrome-text drop-shadow-[0_0_25px_rgba(255,31,106,0.18)]">
              Ahadiyan
            </span>
          </h1>
        </div>
 
        <div
          className={`mt-4 transition-all delay-75 duration-500 ${
            showPortfolio
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-8 scale-95 opacity-0"
          }`}
        >
          <p className="px-2 text-base font-medium uppercase tracking-[0.28em] text-primary/85 sm:text-xl md:text-3xl md:tracking-[0.55em]">
            Portfolio
          </p>
          <p className="mx-auto mt-4 max-w-3xl px-3 text-sm leading-relaxed text-muted-foreground sm:mt-6 sm:px-4 sm:text-lg md:text-xl">
            A focused look at my work in AI, game development, and creative
            digital experiences.
          </p>
        </div>

        <div
          className={`mt-10 transition-all delay-100 duration-500 ${
            showPages
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-10 scale-95 opacity-0"
          }`}
        >
          <p className="px-4 text-sm font-medium text-primary/80 sm:text-base md:text-xl">
            What are you looking for today?
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 px-2 sm:mt-6 sm:gap-4 sm:px-4">
            {portfolioPages.map((page) => (
              <AnimatedPageLink
                key={page.href}
                href={page.href}
                className="rootonset-surface rootonset-outline rounded-full border px-4 py-2.5 text-xs font-medium text-foreground backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:text-primary hover:shadow-[0_0_34px_rgba(255,31,106,0.18)] sm:px-6 sm:py-3 sm:text-base"
              >
                {page.title}
              </AnimatedPageLink>
            ))}
          </div>
        </div>

        <div
          className={`mt-8 transition-all delay-150 duration-500 ${
            showActions
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex flex-col items-center justify-center gap-3 px-2 sm:flex-row sm:gap-4 sm:px-4">
            <a
              href="#projects"
              className="group relative w-full max-w-xs overflow-hidden rounded-lg bg-[linear-gradient(180deg,rgba(255,66,118,1),rgba(117,18,255,1))] px-6 py-3 font-medium text-primary-foreground transition-all duration-300 hover:shadow-[0_0_34px_rgba(255,31,106,0.34)] sm:w-auto sm:max-w-none sm:px-8 sm:py-4"
            >
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
            <a
              href="#contact"
              className="rootonset-surface rootonset-outline w-full max-w-xs rounded-lg border px-6 py-3 font-medium text-foreground transition-all duration-300 hover:border-primary hover:text-primary hover:shadow-[0_0_28px_rgba(120,30,255,0.18)] sm:w-auto sm:max-w-none sm:px-8 sm:py-4"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>

      <div
        className={`absolute bottom-8 left-1/2 hidden -translate-x-1/2 transition-all duration-500 md:block ${
          showActions ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="animate-bounce">
          <svg
            className="h-6 w-6 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}
