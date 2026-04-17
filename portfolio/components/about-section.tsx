"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export function AboutSection() {
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
    <section id="about" className="relative px-4 py-16 sm:px-6 sm:py-24 md:py-28" ref={sectionRef}>
      <div className="mx-auto max-w-6xl">
        <div className={`transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
          <div className="mb-8 flex items-center gap-3 sm:mb-12 sm:gap-4">
            <span className="font-mono text-xs text-muted-foreground sm:text-sm">02.</span>
            <h2 className="text-xl text-foreground sm:text-3xl md:text-4xl">Why This Works</h2>
            <div className="h-px max-w-xs flex-1 bg-border" />
          </div>

          <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] sm:gap-12">
            <div className="order-2 space-y-5 md:order-1 sm:space-y-6">
              <span className="section-kicker">WHY this approach works</span>
              <p className="max-w-3xl text-lg leading-relaxed text-foreground sm:text-2xl">
                What happens when one builder can think like an engineer, a product designer, and a
                systems strategist at the same time?
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                The result is leverage. I can move from technical ambiguity to a working system
                quickly because I care about the model, the interface, and the decision-making
                layer around them.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                That is why the work feels different. It is not just functional. It is framed,
                structured, and presented like something ready to survive outside a classroom.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <ValueCard
                  title="How I create leverage"
                  description="I find the pressure point, remove noise, and build the clearest version of the solution with enough polish to earn trust fast."
                />
                <ValueCard
                  title="Why it matters"
                  description="Recruiters, founders, and clients do not just see code. They see proof that I can think, decide, and ship at a higher level."
                />
              </div>
            </div>

            <div className="order-1 signal-panel rounded-[1.35rem] border p-4 sm:order-2 sm:rounded-[1.5rem] sm:p-5">
              <div className="grid gap-5">
                <div className="overflow-hidden rounded-[1.2rem] border border-border bg-secondary/50">
                  <Image
                    src="/myPhoto.jpg"
                    alt="Portrait of Sadra Ahadiyan"
                    width={900}
                    height={1100}
                    className="aspect-[4/5] w-full object-cover object-center"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 sm:gap-5">
                  <StatItem label="Base" value="Istanbul" />
                  <StatItem label="Core Focus" value="AI + Product" />
                  <StatItem label="Strength" value="Systems + UX" />
                  <StatItem label="Open To" value="Internships / Freelance" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[0.95rem] border border-border bg-background/88 px-3 py-3 text-center shadow-[0_10px_24px_rgba(18,25,38,0.05)] sm:rounded-[1rem] sm:px-4 sm:py-4">
      <p className="text-[0.95rem] font-semibold leading-snug text-foreground sm:text-xl">{value}</p>
      <p className="mt-1 text-[0.68rem] text-muted-foreground sm:text-sm">{label}</p>
    </div>
  )
}

function ValueCard({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="signal-card rounded-[1rem] border border-border/80 bg-card/85 p-4 shadow-[0_12px_26px_rgba(18,25,38,0.05)] sm:rounded-[1.15rem] sm:p-5">
      <p className="text-base font-semibold text-foreground">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  )
}
