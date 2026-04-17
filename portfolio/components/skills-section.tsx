"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const skills = {
  programming: [
    { name: "Python", level: 90 },
    { name: "C++", level: 85 },
    { name: "JavaScript", level: 80 },
    { name: "C#", level: 75 },
  ],
  technologies: [
    "Computer Vision",
    "YOLOv5",
    "AI Systems",
    "React",
    "Next.js",
    "Unity",
    "Unreal Engine",
    "Web Development",
    "IoT",
    "Full Stack Development",
  ],
}

export function SkillsSection() {
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
    <section id="skills" className="relative bg-secondary/45 px-4 py-16 sm:px-6 sm:py-24 md:py-28" ref={sectionRef}>
      <div className="mx-auto max-w-6xl">
        <div className={`transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
          <div className="mb-8 flex items-center gap-3 sm:mb-12 sm:gap-4">
            <span className="font-mono text-xs text-muted-foreground sm:text-sm">03.</span>
            <h2 className="text-2xl text-foreground sm:text-3xl md:text-4xl">Capabilities</h2>
            <div className="h-px max-w-xs flex-1 bg-border" />
          </div>

          <div className="mb-8 max-w-3xl sm:mb-12">
            <span className="section-kicker">Why teams can move fast with me</span>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              The value is not a long tool list. It is the ability to cross boundaries between AI,
              engineering, and interface work without losing clarity.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 sm:gap-12">
            <div className="rootonset-surface rootonset-outline rounded-sm border p-6">
              <h3 className="mb-2 text-lg font-semibold text-foreground sm:text-xl">Technical Depth</h3>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                Strongest where logic, performance, and iteration speed matter.
              </p>
              <div className="space-y-6">
                {skills.programming.map((skill, index) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-foreground">{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-secondary">
                      <div
                        className={cn(
                          "h-full rounded-full bg-foreground/80 transition-all duration-1000 ease-out",
                          isVisible ? "" : "w-0"
                        )}
                        style={{
                          width: isVisible ? `${skill.level}%` : "0%",
                          transitionDelay: `${index * 180}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rootonset-surface rootonset-outline rounded-sm border p-6">
              <h3 className="mb-2 text-lg font-semibold text-foreground sm:text-xl">Delivery Range</h3>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                Tools and domains I use to move from idea, to prototype, to polished interface.
              </p>
              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                {skills.technologies.map((tech, index) => (
                  <span
                    key={tech}
                    className={cn(
                      "rounded-sm border border-border bg-background px-3 py-2 text-xs text-foreground transition-all duration-500 sm:text-sm",
                      isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    )}
                    style={{ transitionDelay: `${index * 90}ms` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
