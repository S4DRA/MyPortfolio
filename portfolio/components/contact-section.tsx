"use client"

import { useEffect, useRef, useState } from "react"

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
            <span className="font-mono text-xs text-muted-foreground sm:text-sm">05.</span>
            <h2 className="text-xl text-foreground sm:text-3xl md:text-4xl">Contact</h2>
            <div className="h-px max-w-[100px] flex-1 bg-border" />
          </div>

          <p className="mx-auto mb-8 max-w-xl px-2 text-sm leading-relaxed text-muted-foreground sm:mb-12 sm:text-base md:text-lg">
            I am open to professional opportunities, collaborations, and thoughtful conversations around technology and digital work.
          </p>

          <div className="mb-8 grid gap-4 sm:mb-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            <a href="mailto:sadra.ahadiyan@bahcesehir.edu.tr" className="rootonset-surface rootonset-outline rounded-sm border p-5 text-left transition-colors hover:border-foreground/20">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Email</p>
              <p className="mt-3 break-all text-sm font-medium text-foreground sm:text-base">sadra.ahadiyan@bahcesehir.edu.tr</p>
            </a>

            <a href="tel:+905315266501" className="rootonset-surface rootonset-outline rounded-sm border p-5 text-left transition-colors hover:border-foreground/20">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Phone</p>
              <p className="mt-3 text-sm font-medium text-foreground sm:text-base">+90 531 526 6501</p>
            </a>

            <div className="rootonset-surface rootonset-outline rounded-sm border p-5 text-left">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Location</p>
              <p className="mt-3 text-sm font-medium text-foreground sm:text-base">Istanbul, Turkey</p>
            </div>
          </div>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-sm border border-foreground bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:border-primary hover:bg-primary sm:px-8 sm:text-base"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}
