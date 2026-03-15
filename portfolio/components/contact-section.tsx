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
    <section
      id="contact"
      className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-secondary/20"
      ref={sectionRef}
    >
      <div className="max-w-4xl mx-auto">
        <div
          className={`text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="flex-1 h-px bg-border max-w-[60px] sm:max-w-[100px]" />
            <span className="text-primary font-mono text-xs sm:text-sm">04.</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground whitespace-nowrap">
              Get In Touch
            </h2>
            <div className="flex-1 h-px bg-border max-w-[60px] sm:max-w-[100px]" />
          </div>

          <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-8 sm:mb-12 max-w-xl mx-auto leading-relaxed px-2">
            I am always open to discussing new opportunities, collaborations, or
            just having a conversation about technology and innovation.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <a
              href="mailto:sadra.ahadiyan@bahcesehir.edu.tr "
              className="group p-6 bg-card border border-border rounded-2xl transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(100,200,220,0.15)]"
            >
              <div className="flex items-center justify-center gap-4">
                <svg
                  className="w-6 h-6 text-primary group-hover:drop-shadow-[0_0_8px_rgba(100,200,220,0.6)] transition-all"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <div className="text-left">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                    sadra.ahadiyan@bahcesehir.edu.tr
                  </p>
                </div>
              </div>
            </a>

            <a
              href="tel:+905315266501"
              className="group p-4 sm:p-6 bg-card border border-border rounded-2xl transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(100,200,220,0.15)]"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:drop-shadow-[0_0_8px_rgba(100,200,220,0.6)] transition-all flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <div className="text-center sm:text-left">
                  <p className="text-xs sm:text-sm text-muted-foreground">Phone</p>
                  <p className="text-sm sm:text-base text-foreground font-medium group-hover:text-primary transition-colors">
                    +90 531 526 6501
                  </p>
                </div>
              </div>
            </a>

            <div className="p-4 sm:p-6 bg-card border border-border rounded-2xl">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div className="text-center sm:text-left">
                  <p className="text-xs sm:text-sm text-muted-foreground">Location</p>
                  <p className="text-sm sm:text-base text-foreground font-medium">Istanbul, Turkey</p>
                </div>
              </div>
            </div>
          </div>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-primary text-primary-foreground font-medium rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(100,200,220,0.4)] text-sm sm:text-base"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            Connect on LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}
