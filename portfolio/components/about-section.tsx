"use client"

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
    <section id="about" className="relative py-32 px-6" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="flex items-center gap-4 mb-12">
            <span className="text-primary font-mono text-sm">01.</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              About Me
            </h2>
            <div className="flex-1 h-px bg-border max-w-xs" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed text-lg">
                I am a computer engineering student at{" "}
                <span className="text-primary">Bahcesehir University</span> in
                Istanbul, passionate about building intelligent products that
                solve real-world problems.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                My journey spans across AI systems, computer vision, and full
                stack development. I enjoy exploring the intersection of
                technology and creativity, which led me to game development as a
                medium for storytelling and interactive experiences.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When I am not coding, you will find me exploring new technologies,
                working on game concepts, or researching the latest advancements
                in artificial intelligence and machine learning.
              </p>
            </div>

            <div className="relative">
              <div className="relative z-10 p-8 bg-card border border-border rounded-2xl">
                <div className="grid grid-cols-2 gap-6">
                  <StatItem label="University" value="BAU Istanbul" />
                  <StatItem label="Field" value="Computer Eng." />
                  <StatItem label="Focus" value="AI & Game Dev" />
                  <StatItem label="Location" value="Istanbul, TR" />
                </div>
              </div>
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl blur-xl opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center p-4 rounded-lg bg-secondary/50">
      <p className="text-2xl font-bold text-foreground mb-1">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}
