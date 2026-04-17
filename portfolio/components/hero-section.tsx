"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { ArrowRight, BrainCircuit, BriefcaseBusiness, Sparkles } from "lucide-react"

const whyEngine = [
  {
    title: "Why this builder stands out",
    description:
      "I do not just ship code. I design the logic, the interface, and the user journey so the product actually lands.",
    icon: Sparkles,
  },
  {
    title: "Why these projects matter",
    description:
      "Every project is built around a real operational, product, or interaction problem instead of portfolio filler.",
    icon: BrainCircuit,
  },
  {
    title: "Why teams reach out",
    description:
      "I am looking for internships, freelance builds, and sharp collaborations where technical execution needs taste and momentum.",
    icon: BriefcaseBusiness,
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
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-30"
    >
      <div className="ambient-orb ambient-orb-left" aria-hidden="true" />
      <div className="ambient-orb ambient-orb-right" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div
          className={`transition-all duration-500 ${
            showHero ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,420px)] lg:gap-14 xl:gap-18">
            <div className="text-center lg:text-left">
              <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-primary/20 bg-card/80 px-3 py-2 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-muted-foreground shadow-sm backdrop-blur sm:px-4 sm:text-[0.68rem] sm:tracking-[0.22em]">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="truncate">AI Systems, Product Thinking, Technical Execution</span>
              </div>

              <h1 className="mt-6 max-w-[11ch] text-[clamp(2.7rem,10vw,5.35rem)] leading-[0.95] tracking-[-0.04em] text-balance text-foreground sm:max-w-[12ch] sm:leading-[0.93] lg:max-w-[10.5ch]">
                I build AI-powered software that feels sharp, useful, and hard to ignore.
              </h1>

              <p className="mt-5 max-w-2xl text-[0.98rem] leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg md:text-[1.05rem]">
                I am Sadra Ahadiyan, a computer engineer building intelligent systems, technical
                products, and digital experiences that turn complex ideas into real user value. I
                care about the full stack of impact: the model, the product, and the moment it
                clicks for the user.
              </p>

              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
                <a
                  href="#projects"
                  className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-sm border border-foreground bg-foreground px-6 py-3 font-medium text-background transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-primary sm:w-auto sm:max-w-none"
                >
                  Explore Case Studies
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex w-full max-w-xs items-center justify-center rounded-sm border border-border bg-card/85 px-6 py-3 font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:bg-secondary sm:w-auto sm:max-w-none"
                >
                  Hire Me For Internships, Freelance, or Collabs
                </a>
              </div>

              <div className="mt-8 grid gap-4 text-left sm:mt-10 sm:grid-cols-2 xl:grid-cols-3">
                <MetricCard
                  value="AI + Product"
                  label="Built at the intersection of systems thinking and user experience."
                />
                <MetricCard
                  value="Case-Driven"
                  label="Projects framed around the problem, approach, and business value."
                />
                <MetricCard
                  value="Fast Learner"
                  label="Strong across software, computer vision, research, and interface work."
                />
              </div>
            </div>

            <div className="mx-auto w-full max-w-[320px] sm:max-w-[360px] lg:justify-self-end lg:max-w-[420px]">
              <div className="hero-portrait-shell rootonset-outline relative overflow-hidden rounded-[1.6rem] border p-3 shadow-[0_24px_90px_rgba(18,25,38,0.16)]">
                <div className="hero-portrait-glow absolute inset-0" aria-hidden="true" />
                <Image
                  src="/myPhoto.jpg"
                  alt="Portrait of Sadra Ahadiyan"
                  width={900}
                  height={1100}
                  priority
                  className="relative aspect-[4/5] w-full rounded-[1.2rem] object-cover object-center"
                />
              </div>

              <div className="mt-4 rounded-[1.25rem] border border-border/80 bg-[rgba(12,18,28,0.9)] px-4 py-4 text-left text-white shadow-[0_18px_45px_rgba(18,25,38,0.16)] backdrop-blur-xl sm:px-5">
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-white/60">
                  Positioning
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/88 sm:text-[0.95rem]">
                  Builder focused on turning technically ambitious ideas into products people
                  understand, trust, and remember.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`mt-6 transition-all delay-75 duration-500 ${
            showWhy ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="premium-panel mt-12 rounded-[1.5rem] p-5 sm:mt-14 sm:p-8">
            <div className="mb-5 flex items-center gap-3">
              <span className="section-kicker">WHY engine</span>
              <div className="h-px flex-1 bg-border/80" />
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {whyEngine.map((item) => {
                const Icon = item.icon

                return (
                  <div
                    key={item.title}
                    className="magnetic-card rounded-[1.25rem] border border-border/80 bg-background/88 p-5 shadow-[0_12px_32px_rgba(18,25,38,0.06)] backdrop-blur"
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
          <div className="flex flex-wrap items-center justify-center gap-3 border-t border-border/75 pt-6 text-sm text-muted-foreground lg:justify-start">
            <span className="font-medium text-foreground">Also explore:</span>
            <span>Programming Projects</span>
            <span className="hidden sm:inline text-border">/</span>
            <span>Work Experience</span>
            <span className="hidden sm:inline text-border">/</span>
            <span>Website Design</span>
            <span className="hidden sm:inline text-border">/</span>
            <span>Game Projects</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="magnetic-card rounded-[1.1rem] border border-border/75 bg-card/80 p-4 shadow-[0_10px_28px_rgba(18,25,38,0.05)] backdrop-blur">
      <p className="text-lg font-semibold text-foreground">{value}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{label}</p>
    </div>
  )
}
