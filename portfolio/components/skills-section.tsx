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
    <section
      id="skills"
      className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-secondary/20"
      ref={sectionRef}
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
            <span className="text-primary font-mono text-xs sm:text-sm">02.</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              Skills & Technologies
            </h2>
            <div className="flex-1 h-px bg-border max-w-xs" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
            {/* Programming Languages */}
            <div className="space-y-6 sm:space-y-8">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6">
                Programming Languages
              </h3>
              {skills.programming.map((skill, index) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground font-medium">
                      {skill.name}
                    </span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all duration-1000 ease-out",
                        isVisible ? "" : "w-0"
                      )}
                      style={{
                        width: isVisible ? `${skill.level}%` : "0%",
                        transitionDelay: `${index * 200}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {skills.technologies.map((tech, index) => (
                  <span
                    key={tech}
                    className={cn(
                      "px-3 py-1.5 sm:px-4 sm:py-2 bg-card border border-border rounded-lg text-xs sm:text-sm text-foreground transition-all duration-500 hover:border-primary hover:shadow-[0_0_15px_rgba(100,200,220,0.2)]",
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    )}
                    style={{ transitionDelay: `${index * 100}ms` }}
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
