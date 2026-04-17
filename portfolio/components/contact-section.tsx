"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, BriefcaseBusiness, Handshake, Rocket } from "lucide-react"

const opportunities = [
  {
    title: "Internship",
    description:
      "Bring me into a team that wants an engineer who can think beyond implementation and contribute across product, AI, and frontend execution.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Freelance Build",
    description:
      "If you need a smart prototype, product concept, landing page, or AI-driven workflow, I can help shape and ship it quickly.",
    icon: Rocket,
  },
  {
    title: "Collaboration",
    description:
      "Open to building with founders, researchers, designers, and developers working on ideas with ambition and real upside.",
    icon: Handshake,
  },
]

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="contact" className="relative bg-secondary/45 px-4 py-16 sm:px-6 sm:py-24 md:py-28" ref={sectionRef}>
      <div className="mx-auto max-w-4xl">
        <div className={`text-center transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
          <div className="mb-6 flex items-center justify-center gap-3 sm:mb-8 sm:gap-4">
            <div className="h-px max-w-[100px] flex-1 bg-border" />
            <span className="font-mono text-xs text-muted-foreground sm:text-sm">06.</span>
            <h2 className="text-lg text-foreground sm:text-3xl md:text-4xl">Open Signal</h2>
            <div className="h-px max-w-[100px] flex-1 bg-border" />
          </div>

          <span className="section-kicker">WHY reach out now</span>
          <p className="mx-auto mt-4 mb-8 max-w-2xl px-2 text-sm leading-relaxed text-muted-foreground sm:mb-12 sm:text-base md:text-lg">
            If you need someone who can think in systems, move quickly, and still care about how
            the final product lands, this is the point where we should talk.
          </p>

          <div className="mb-8 grid gap-4 text-left sm:mb-12 lg:grid-cols-3">
            {opportunities.map((opportunity) => {
              const Icon = opportunity.icon

              return (
                <div
                  key={opportunity.title}
                  className="signal-card magnetic-card rounded-[1.15rem] border p-4 sm:rounded-[1.35rem] sm:p-5"
                >
                  <div className="inline-flex rounded-2xl border border-primary/15 bg-primary/8 p-3 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-xl text-foreground">{opportunity.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {opportunity.description}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="mb-8 grid gap-4 sm:mb-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            <a href="mailto:sadra.ahadiyan@bahcesehir.edu.tr" className="signal-card rounded-[1rem] border p-4 text-left transition-all hover:-translate-y-1 hover:border-primary/25 sm:rounded-[1.2rem] sm:p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Email</p>
              <p className="mt-3 break-all text-sm font-medium text-foreground sm:text-base">sadra.ahadiyan@bahcesehir.edu.tr</p>
            </a>

            <a href="tel:+905315266501" className="signal-card rounded-[1rem] border p-4 text-left transition-all hover:-translate-y-1 hover:border-primary/25 sm:rounded-[1.2rem] sm:p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Phone</p>
              <p className="mt-3 text-sm font-medium text-foreground sm:text-base">+90 531 526 6501</p>
            </a>

            <div className="signal-card rounded-[1rem] border p-4 text-left sm:rounded-[1.2rem] sm:p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Location</p>
              <p className="mt-3 text-sm font-medium text-foreground sm:text-base">Istanbul, Turkey</p>
            </div>
          </div>

          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <a
              href="mailto:sadra.ahadiyan@bahcesehir.edu.tr?subject=Let's%20Build%20Something"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-foreground bg-foreground px-6 py-3 text-sm font-medium text-background transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-primary sm:px-8 sm:text-base"
            >
              Let&apos;s Build Something Impactful
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-sm border border-border bg-card/85 px-6 py-3 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:bg-secondary sm:px-8 sm:text-base"
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
