"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const projects = [
  {
    title: "Smart Office Security Camera",
    description:
      "AI-powered office monitoring system using Python, YOLOv5, and Telegram API. Detects unauthorized human entry and sends real-time alerts.",
    tags: ["Python", "YOLOv5", "Computer Vision", "Telegram API"],
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "User Rating Prediction System",
    description:
      "C++ project that predicts user ratings based on previous rating behavior using algorithmic modeling.",
    tags: ["C++", "Algorithms", "Data Analysis"],
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "10 Interaction App",
    description:
      "University project focused on designing an application with multiple user interaction mechanisms.",
    tags: ["UI/UX", "Interaction Design", "Research"],
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Health Tracker App Research",
    description:
      "Project focused on analyzing and documenting a health tracking application with professional technical documentation.",
    tags: ["Research", "Documentation", "Health Tech"],
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: "DasaPhase Game Concept",
    description:
      "Game design project about a boy who wakes up late for school and finds himself in a mysterious empty school that leads to a surreal dream world.",
    tags: ["Game Design", "Storytelling", "Concept Art"],
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "IoT Research",
    description:
      "Research and presentation about Internet of Things technologies in computer networking.",
    tags: ["IoT", "Networking", "Research"],
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    ),
  },
]

export function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="relative px-4 py-16 sm:px-6 sm:py-24 md:py-28" ref={sectionRef}>
      <div className="mx-auto max-w-6xl">
        <div className={`transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
          <div className="mb-8 flex items-center gap-3 sm:mb-12 sm:gap-4">
            <span className="font-mono text-xs text-muted-foreground sm:text-sm">04.</span>
            <h2 className="text-2xl text-foreground sm:text-3xl md:text-4xl">Featured Projects</h2>
            <div className="h-px max-w-xs flex-1 bg-border" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} isVisible={isVisible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  index,
  isVisible,
}: {
  project: (typeof projects)[0]
  index: number
  isVisible: boolean
}) {
  return (
    <div
      className={cn(
        "rootonset-surface rootonset-outline rounded-sm border p-5 transition-all duration-500 hover:border-foreground/20 sm:p-6",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="mb-4 text-muted-foreground">{project.icon}</div>
      <h3 className="mb-3 text-lg font-semibold text-foreground sm:text-xl">{project.title}</h3>
      <p className="mb-4 text-xs leading-relaxed text-muted-foreground sm:text-sm">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-sm border border-border bg-secondary px-2.5 py-1 text-xs text-muted-foreground">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
