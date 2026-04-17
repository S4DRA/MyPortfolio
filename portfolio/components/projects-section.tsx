"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const projects = [
  {
    title: "Smart Office Security Camera",
    hook: "Why wait for a security review when the camera can escalate risk instantly?",
    summary:
      "An AI surveillance workflow built to detect unauthorized entry in office environments and trigger immediate alerts before a human operator even notices the problem.",
    problem:
      "Traditional camera feeds are passive. Someone still needs to watch them, which means suspicious movement can be missed until it is too late.",
    approach:
      "I combined YOLOv5-based person detection with a Python alerting workflow and Telegram notifications to turn a passive stream into a real-time security signal.",
    impact:
      "Cuts response time from manual monitoring to instant alert delivery and creates a stronger operational case for low-cost AI monitoring in small offices.",
    tags: ["Python", "YOLOv5", "Computer Vision", "Telegram API", "Real-Time Alerts"],
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "User Rating Prediction System",
    hook: "Why should recommendation quality depend on guesswork when user patterns already tell a story?",
    summary:
      "A predictive modeling project designed to estimate user ratings from previous behavior and translate raw preference data into actionable recommendation logic.",
    problem:
      "Platforms that rely on ratings need better ways to anticipate user preferences, especially when explicit feedback is incomplete or inconsistent.",
    approach:
      "I built the system in C++ using algorithmic modeling to identify behavioral patterns and infer likely future ratings from historical user input.",
    impact:
      "Demonstrates the recommendation-engine thinking behind smarter personalization and shows how structured modeling can reduce cold-start friction in product discovery.",
    tags: ["C++", "Algorithms", "Predictive Modeling", "Data Analysis"],
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "10 Interaction App",
    hook: "Why make users adapt to the interface when the interface can adapt to them?",
    summary:
      "An interaction design project exploring how a single app can support multiple input patterns, user intents, and behavioral flows without becoming chaotic.",
    problem:
      "Many apps look polished but collapse when users interact in different ways or move beyond the ideal path imagined by the designer.",
    approach:
      "I designed and structured ten distinct interaction mechanisms, testing how layout, flow, and interface feedback could stay coherent across multiple user behaviors.",
    impact:
      "Strengthened my ability to design products that feel intuitive under real usage instead of only in static mockups, which directly improves frontend decision-making.",
    tags: ["UI/UX", "Interaction Design", "Research", "Product Thinking"],
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Health Tracker App Research",
    hook: "Why do health products lose trust so easily? Usually because clarity breaks before the code does.",
    summary:
      "A research and documentation project analyzing a health-tracking application through the lenses of usability, technical structure, and communication quality.",
    problem:
      "Health products live or die on trust. Weak documentation and unclear system thinking can make even useful tools feel unreliable or hard to adopt.",
    approach:
      "I audited the application, mapped its core functionality, and produced professional documentation that made the product easier to understand, evaluate, and communicate.",
    impact:
      "Improved my product analysis discipline and showed how strong technical documentation can reduce ambiguity, improve onboarding, and support better iteration.",
    tags: ["Research", "Documentation", "Health Tech", "Product Analysis"],
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: "DasaPhase Game Concept",
    hook: "Why do certain game worlds stay in your head long after the screen goes dark?",
    summary:
      "A narrative game concept built around a surreal school-to-dream-world transition, designed to merge story tension, atmosphere, and environmental curiosity.",
    problem:
      "Many student game concepts stop at plot description. They do not build a world with enough emotional logic to make players want to keep exploring.",
    approach:
      "I developed the concept around mood, pacing, and environmental storytelling so the world itself becomes part of the narrative engine.",
    impact:
      "Expanded my storytelling range and sharpened my ability to design products and experiences that create emotional pull, not just technical functionality.",
    tags: ["Game Design", "Storytelling", "Worldbuilding", "Concept Design"],
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "IoT Research",
    hook: "Why is IoT powerful and fragile at the same time? Because every connected device is both a feature and a risk.",
    summary:
      "A research-driven project exploring Internet of Things systems, networking behavior, and the architectural tradeoffs behind connected environments.",
    problem:
      "IoT conversations are often too abstract. Teams need clearer explanations of how connectivity, reliability, and system design affect real-world deployment.",
    approach:
      "I analyzed core IoT concepts, networking foundations, and implementation considerations, then translated that work into a structured technical presentation.",
    impact:
      "Built stronger systems-level thinking around distributed devices and improved my ability to explain technical infrastructure in a way decision-makers can follow.",
    tags: ["IoT", "Networking", "Research", "Systems Thinking"],
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

          <div className="mb-8 max-w-3xl sm:mb-12">
            <span className="section-kicker">Case studies, not filler</span>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              These projects are framed the way serious teams evaluate work: what problem existed,
              how I approached it, what stack I used, and why the result matters.
            </p>
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
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
        "premium-panel magnetic-card rounded-[1.5rem] border p-5 transition-all duration-500 hover:border-primary/20 hover:shadow-[0_22px_50px_rgba(18,25,38,0.1)] sm:p-6",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="inline-flex rounded-2xl border border-primary/15 bg-primary/8 p-3 text-primary">
          {project.icon}
        </div>
        <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background/70 px-3 py-1 text-[0.72rem] uppercase tracking-[0.2em] text-muted-foreground">
          WHY this project
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>

      <p className="text-sm font-medium leading-relaxed text-primary sm:text-[0.95rem]">{project.hook}</p>
      <h3 className="mt-4 text-2xl font-semibold text-foreground">{project.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[0.98rem]">{project.summary}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <CaseStudyBlock label="Problem" content={project.problem} />
        <CaseStudyBlock label="Approach" content={project.approach} />
      </div>

      <div className="mt-4 rounded-[1.15rem] border border-primary/12 bg-primary/6 p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Impact</p>
        <p className="mt-2 text-sm leading-relaxed text-foreground/90">{project.impact}</p>
      </div>

      <div className="mt-5">
        <p className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Tech stack
          <ChevronRight className="h-3.5 w-3.5" />
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border bg-background/82 px-3 py-1.5 text-xs text-muted-foreground shadow-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

function CaseStudyBlock({ label, content }: { label: string; content: string }) {
  return (
    <div className="rounded-[1.15rem] border border-border/75 bg-background/78 p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <p className="mt-2 text-sm leading-relaxed text-foreground/88">{content}</p>
    </div>
  )
}
