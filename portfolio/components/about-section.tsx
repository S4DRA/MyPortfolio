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
            <h2 className="text-2xl text-foreground sm:text-3xl md:text-4xl">About Me</h2>
            <div className="h-px max-w-xs flex-1 bg-border" />
          </div>

          <div className="grid items-center gap-8 md:grid-cols-2 sm:gap-12">
            <div className="space-y-5">
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                I am a computer engineering student at <span className="text-foreground">Bahcesehir University</span>
                {" "}in Istanbul, focused on building digital work that is practical, well structured, and meaningful.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                My interests span software development, AI systems, computer vision, and interactive design. I enjoy projects that combine technical depth with clarity and real-world usefulness.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                I am especially interested in learning through hands-on work and carrying lessons from each project into the next one.
              </p>
            </div>

            <div className="rootonset-surface rootonset-outline rounded-sm border p-4 sm:p-5">
              <div className="grid gap-5">
                <div className="overflow-hidden rounded-sm border border-border bg-secondary/50">
                  <Image
                    src="/myPhoto.jpg"
                    alt="Portrait of Sadra Ahadiyan"
                    width={900}
                    height={1100}
                    className="aspect-[4/5] w-full object-cover object-center"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                  <StatItem label="University" value="BAU Istanbul" />
                  <StatItem label="Field" value="Computer Engineering" />
                  <StatItem label="Focus" value="Software and AI" />
                  <StatItem label="Location" value="Istanbul, Turkey" />
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
    <div className="rounded-sm border border-border bg-background px-4 py-4 text-center">
      <p className="text-lg font-semibold text-foreground sm:text-xl">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{label}</p>
    </div>
  )
}
