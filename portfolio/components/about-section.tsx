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
            <h2 className="text-2xl text-foreground sm:text-3xl md:text-4xl">Builder OS</h2>
            <div className="h-px max-w-xs flex-1 bg-border" />
          </div>

          <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] sm:gap-12">
            <div className="space-y-6">
              <span className="section-kicker">Why I build this way</span>
              <p className="max-w-3xl text-xl leading-relaxed text-foreground sm:text-2xl">
                What if the real edge is not just writing code, but connecting systems thinking,
                interface taste, and execution speed into one workflow?
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                I study computer engineering at <span className="text-foreground">Bahcesehir University</span> in Istanbul, but I do not frame my work around the word student. I frame it around leverage: understanding the system, finding the pressure point, and building the clearest path from idea to usable product.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                My edge is the combination of AI systems, software engineering, interaction thinking, and storytelling. That mix helps me build work that is technically sound and immediately legible to recruiters, clients, founders, and collaborators.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <ValueCard
                  title="What I build"
                  description="AI-powered workflows, technical prototypes, and digital products that solve a visible problem instead of decorating a resume."
                />
                <ValueCard
                  title="How I think"
                  description="Start from the real-world tension, reduce complexity, then ship a product experience people can immediately understand."
                />
              </div>
            </div>

            <div className="premium-panel rounded-[1.5rem] border p-4 sm:p-5">
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
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
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
    <div className="rounded-[1rem] border border-border bg-background/88 px-4 py-4 text-center shadow-[0_10px_24px_rgba(18,25,38,0.05)]">
      <p className="text-lg font-semibold text-foreground sm:text-xl">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{label}</p>
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
    <div className="rounded-[1.15rem] border border-border/80 bg-card/85 p-5 shadow-[0_12px_26px_rgba(18,25,38,0.05)]">
      <p className="text-base font-semibold text-foreground">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  )
}
