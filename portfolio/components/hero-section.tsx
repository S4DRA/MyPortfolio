"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { AnimatedPageLink } from "@/components/animated-page-link"
import { portfolioPages } from "@/lib/portfolio-pages"

export function HeroSection() {
  const [step, setStep] = useState(0)

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

  const showName = step >= 1
  const showPortfolio = step >= 2
  const showPages = step >= 3
  const showActions = step >= 4

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center px-4 sm:px-6"
    >
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <div className="absolute inset-x-0 top-1/2 -z-10 mx-auto h-96 w-96 -translate-y-1/2 rounded-full bg-primary/16 blur-3xl sm:h-[32rem] sm:w-[32rem]" />

        <div
          className={`transition-all duration-500 ${
            showName
              ? "translate-y-0 scale-100 opacity-100 blur-0"
              : "translate-y-12 scale-90 opacity-0 blur-md"
          }`}
        >
          <div className="mx-auto mb-8 w-full max-w-[220px] sm:mb-10 sm:max-w-[280px] lg:max-w-[320px]">
            <div className="relative overflow-hidden rounded-[1.8rem] border border-border/80 bg-card/70 p-2 backdrop-blur-sm shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
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
          <h1 className="px-2 text-6xl font-bold leading-none tracking-tight text-balance text-foreground sm:text-7xl md:text-[6.5rem] lg:text-[8.2rem]">
            Sadra{" "}
            <span className="text-primary drop-shadow-[0_0_25px_rgba(100,200,220,0.5)]">
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
          <p className="text-xl font-medium uppercase tracking-[0.55em] text-primary/85 sm:text-2xl md:text-3xl">
            Portfolio
          </p>
          <p className="mx-auto mt-6 max-w-3xl px-4 text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
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
          <p className="px-4 text-base font-medium text-primary/80 sm:text-lg md:text-xl">
            What are you looking for today?
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 px-4 sm:gap-4">
            {portfolioPages.map((page) => (
              <AnimatedPageLink
                key={page.href}
                href={page.href}
                className="rounded-full border border-border bg-background/65 px-5 py-3 text-sm font-medium text-foreground backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:text-primary hover:shadow-[0_0_30px_rgba(100,200,220,0.18)] sm:px-6 sm:text-base"
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
          <div className="flex flex-col items-center justify-center gap-3 px-4 sm:flex-row sm:gap-4">
            <a
              href="#projects"
              className="group relative w-full overflow-hidden rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_rgba(100,200,220,0.4)] sm:w-auto sm:px-8 sm:py-4"
            >
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
            <a
              href="#contact"
              className="w-full rounded-lg border border-border px-6 py-3 font-medium text-foreground transition-all duration-300 hover:border-primary hover:text-primary sm:w-auto sm:px-8 sm:py-4"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>

      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-500 ${
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
