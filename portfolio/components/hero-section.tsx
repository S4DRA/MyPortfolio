"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { ArrowRight, BrainCircuit, BriefcaseBusiness, Sparkles } from "lucide-react"

const whyEngine = [
  {
    title: "Why this builder stands out",
    description:
      "I work across model logic, interface behavior, and product narrative so the final build does more than function. It lands.",
    icon: Sparkles,
  },
  {
    title: "Why these projects matter",
    description:
      "Each project starts with a real tension point: trust, speed, clarity, monitoring, prediction, or adoption. That keeps the work grounded.",
    icon: BrainCircuit,
  },
  {
    title: "Why teams reach out",
    description:
      "Teams reach out when they need someone who can prototype fast, think in systems, and still care about how the product feels in human hands.",
    icon: BriefcaseBusiness,
  },
]

const signalCards = [
  {
    label: "Build zone",
    value: "AI systems, productized software, and interfaces that feel deliberate",
  },
  {
    label: "Best fit",
    value: "Internships, freelance MVPs, and teams shipping ambitious technical products",
  },
  {
    label: "Working mode",
    value: "Fast iteration, clear thinking, and execution that looks as strong as it works",
  },
]

const quickFacts = [
  {
    label: "Currently building",
    value: "AI workflows and product-grade interfaces",
  },
  {
    label: "Best conversations",
    value: "Internships, freelance MVPs, and high-upside builds",
  },
  {
    label: "Bias",
    value: "Fast execution, clean systems, strong presentation",
  },
]

export function HeroSection() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timeouts = [
      window.setTimeout(() => setStep(1), 80),
      window.setTimeout(() => setStep(2), 240),
      window.setTimeout(() => setStep(3), 400),
    ]

    return () => {
      timeouts.forEach((timeout) => window.clearTimeout(timeout))
    }
  }, [])

  const showHero = step >= 1
  const showWhy = step >= 2
  const showMeta = step >= 3

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pb-14 pt-22 sm:px-6 sm:pb-20 sm:pt-30"
    >
      <div className="ambient-orb ambient-orb-left" aria-hidden="true" />
      <div className="ambient-orb ambient-orb-right" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div
          className={`transition-all duration-500 ${
            showHero ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,420px)] lg:gap-14 xl:gap-18">
            <div className="order-2 text-center lg:order-1 lg:text-left">
              <div className="signal-label pulse-chip max-w-full">
                <span className="signal-dot" />
                <span className="truncate">System Builder: AI, Software, Product Execution</span>
              </div>

              <h1 className="mx-auto mt-5 max-w-[12ch] text-[clamp(2.45rem,11vw,5.35rem)] leading-[0.96] tracking-[-0.045em] text-balance text-foreground sm:mt-6 sm:max-w-[12ch] sm:leading-[0.93] lg:mx-0 lg:max-w-[10.5ch]">
                I build systems that turn technical ambition into visible impact.
              </h1>

              <p className="mx-auto mt-4 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground sm:mt-6 sm:max-w-2xl sm:text-lg md:text-[1.05rem] lg:mx-0">
                AI workflows, software products, and user-facing systems designed to move from idea
                to proof fast, with enough clarity that people instantly understand why they matter.
              </p>

              <p className="mx-auto mt-4 max-w-md text-[0.72rem] uppercase leading-relaxed tracking-[0.18em] text-foreground/70 sm:max-w-2xl sm:text-[0.86rem] lg:mx-0">
                Available for internships, AI projects, and teams that need a builder who can ship.
              </p>

              <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center lg:items-start">
                <a
                  href="#projects"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-sm border border-foreground bg-foreground px-5 py-3 text-sm font-medium text-background transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-primary sm:w-auto sm:px-6"
                >
                  Enter the Case Studies
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-sm border border-border bg-card/85 px-5 py-3 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:bg-secondary sm:w-auto sm:px-6"
                >
                  Let&apos;s Build Something Real
                </a>
              </div>

              <div className="mt-8 grid gap-3 text-left sm:mt-10 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
                {signalCards.map((card) => (
                  <MetricCard key={card.label} value={card.label} label={card.value} />
                ))}
              </div>
            </div>

            <div className="order-1 mx-auto w-full max-w-[290px] sm:max-w-[360px] lg:order-2 lg:justify-self-end lg:max-w-[420px]">
              <div className="hero-portrait-shell rootonset-outline scan-border relative overflow-hidden rounded-[1.35rem] border p-2.5 shadow-[0_24px_90px_rgba(18,25,38,0.16)] sm:rounded-[1.6rem] sm:p-3">
                <div className="hero-portrait-glow absolute inset-0" aria-hidden="true" />
                <div className="hero-scanline absolute inset-x-0 top-0 h-16" aria-hidden="true" />
                <Image
                  src="/myPhoto.jpg"
                  alt="Portrait of Sadra Ahadiyan"
                  width={900}
                  height={1100}
                  priority
                  className="relative aspect-[4/5] w-full rounded-[1rem] object-cover object-center sm:rounded-[1.2rem]"
                />
              </div>

              <div className="signal-panel mt-3 overflow-hidden rounded-[1.15rem] border border-border/80 text-left text-foreground shadow-[0_18px_45px_rgba(18,25,38,0.16)] backdrop-blur-xl sm:mt-4 sm:rounded-[1.25rem]">
                <div className="border-b border-border/70 px-4 py-3 sm:px-5">
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">
                    Mission Control
                  </p>
                </div>
                <div className="grid gap-4 px-4 py-4 sm:px-5">
                  <div>
                    <p className="text-[0.72rem] uppercase tracking-[0.22em] text-muted-foreground">
                      What to know fast
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/88 sm:text-[0.95rem]">
                      I build technical work that is not only functional, but positioned clearly
                      enough to earn trust fast.
                    </p>
                  </div>
                  <div className="grid gap-3">
                    {quickFacts.map((fact) => (
                      <div
                        key={fact.label}
                        className="rounded-[1rem] border border-border/70 bg-background/72 px-3 py-3"
                      >
                        <p className="text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
                          {fact.label}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-foreground/90">
                          {fact.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`mt-6 transition-all delay-75 duration-500 ${
            showWhy ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="premium-panel mt-10 rounded-[1.4rem] p-4 sm:mt-14 sm:rounded-[1.5rem] sm:p-8">
            <div className="mb-5 flex items-center gap-3">
              <span className="section-kicker">WHY engine</span>
              <div className="hidden h-px flex-1 bg-border/80 sm:block" />
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {whyEngine.map((item) => {
                const Icon = item.icon

                return (
                  <div
                    key={item.title}
                    className="signal-card magnetic-card rounded-[1.25rem] border border-border/80 bg-background/88 p-5 shadow-[0_12px_32px_rgba(18,25,38,0.06)] backdrop-blur"
                  >
                    <div className="mb-4 inline-flex rounded-xl border border-primary/15 bg-primary/8 p-3 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-xl text-foreground">{item.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
                      {item.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div
          className={`mt-12 transition-all delay-100 duration-500 ${
            showMeta ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex flex-wrap items-center justify-center gap-2.5 border-t border-border/75 pt-5 text-center text-[0.92rem] text-muted-foreground sm:gap-3 sm:pt-6 sm:text-sm lg:justify-start lg:text-left">
            <span className="font-medium text-foreground">This portfolio is built to answer three questions:</span>
            <span>Can he think in systems?</span>
            <span className="hidden sm:inline text-border">/</span>
            <span>Can he ship with taste?</span>
            <span className="hidden sm:inline text-border">/</span>
            <span>Can he create leverage fast?</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="signal-card magnetic-card rounded-[1rem] border border-border/75 bg-card/80 p-4 shadow-[0_10px_28px_rgba(18,25,38,0.05)] backdrop-blur sm:rounded-[1.1rem]">
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary">{value}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{label}</p>
    </div>
  )
}
