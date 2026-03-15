"use client"

import { useEffect, useState } from "react"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6"
    >
      <div className="max-w-4xl mx-auto text-center z-10">
        <div
          className={`transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="mb-4 sm:mb-6">
            <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-primary border border-primary/30 rounded-full bg-primary/5 backdrop-blur-sm">
              Welcome to my portfolio
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-4 sm:mb-6 tracking-tight text-balance px-2">
            Sadra{" "}
            <span className="text-primary drop-shadow-[0_0_25px_rgba(100,200,220,0.5)]">
              Ahadiyan
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-3 sm:mb-4 font-light px-2">
            Computer Engineering Student
          </p>
          <p className="text-base sm:text-lg text-primary/80 mb-6 sm:mb-8 px-2">
            AI & Game Development Enthusiast
          </p>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed text-pretty px-4">
            Building intelligent systems, computer vision solutions, and
            creative digital experiences that push the boundaries of technology.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
            <a
              href="#projects"
              className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground font-medium rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(100,200,220,0.4)] text-center"
            >
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border border-border text-foreground font-medium rounded-lg hover:border-primary hover:text-primary transition-all duration-300 text-center"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-muted-foreground"
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
    </section>
  )
}
