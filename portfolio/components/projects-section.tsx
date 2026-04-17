"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const projects = [
  {
    title: "Smart Office Security Camera",
    hook: "Why wait for a security review when the camera can escalate risk instantly?",
    summary:
      "An AI surveillance workflow that turns passive camera footage into an active security layer for small offices that cannot afford a full monitoring team.",
    problem:
      "Traditional security cameras record everything and prevent nothing. In a real office, that means suspicious entry can go unnoticed until after the incident.",
    approach:
      "I combined YOLOv5-based person detection, Python event handling, and Telegram notifications to create a lightweight real-time escalation loop instead of a passive archive.",
    impact:
      "Transforms monitoring from delayed review to immediate action. The concept shows how AI can compress response time and create enterprise-style awareness with a student-built budget.",
    stats: {
      systemResponse: 92,
      productClarity: 76,
      realWorldFit: 88,
    },
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
      "A recommendation-oriented prediction system designed to infer likely user ratings and make messy preference data usable for better personalization logic.",
    problem:
      "Products that depend on ratings rarely get complete feedback. That leaves gaps in personalization and weakens discovery for both users and the platform.",
    approach:
      "I built the model in C++ and focused on the algorithmic side of pattern recognition, using historical preference signals to predict future rating behavior.",
    impact:
      "Frames me as someone who understands recommendation logic beyond the UI layer. It is the kind of systems thinking that matters in marketplaces, media products, and discovery platforms.",
    stats: {
      systemResponse: 84,
      productClarity: 72,
      realWorldFit: 81,
    },
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
      "An interaction design exploration focused on building one product experience that can support multiple user behaviors without losing clarity.",
    problem:
      "Too many interfaces only work for the ideal user path. Real users move differently, hesitate, backtrack, and explore in ways that polished mockups often ignore.",
    approach:
      "I designed ten interaction models inside one app concept and used them to test hierarchy, navigation feedback, and flow resilience across different behaviors.",
    impact:
      "Sharpened my frontend decision-making by forcing the interface to survive real behavior, not just look clean in a design review.",
    stats: {
      systemResponse: 71,
      productClarity: 94,
      realWorldFit: 79,
    },
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
      "A health-product audit focused on usability, technical clarity, and the documentation layer that often determines whether people trust the product at all.",
    problem:
      "Health products operate under a trust penalty. If the system is unclear, the interface feels unreliable, and adoption drops even when the underlying functionality works.",
    approach:
      "I reviewed the core user flow, mapped the product logic, and translated the app into structured documentation that made evaluation and onboarding much easier.",
    impact:
      "Shows that I care about the invisible layers of product quality. Clear communication reduces friction, improves onboarding, and makes future iteration faster.",
    stats: {
      systemResponse: 68,
      productClarity: 91,
      realWorldFit: 82,
    },
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
      "A narrative worldbuilding concept built around a surreal school-to-dream-world transition, designed to create emotional pull through atmosphere and story logic.",
    problem:
      "A lot of game concepts stop at plot summary. They never build enough world logic or emotional tension to make exploration feel necessary.",
    approach:
      "I focused on pacing, environmental storytelling, and symbolic worldbuilding so the setting itself becomes part of the narrative engine.",
    impact:
      "This project expands the emotional side of my design range. It proves I can think beyond functionality and build experiences that leave a stronger memory trace.",
    stats: {
      systemResponse: 63,
      productClarity: 80,
      realWorldFit: 70,
    },
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
      "A systems-focused research project exploring IoT architecture, networking behavior, and the tradeoffs that appear when connected devices move from theory to deployment.",
    problem:
      "IoT is easy to oversimplify. In practice, reliability, security, latency, and device coordination all affect whether a connected system is useful or fragile.",
    approach:
      "I studied core IoT architecture, networking foundations, and deployment considerations, then translated that research into a structured technical presentation.",
    impact:
      "Strengthened my systems-level reasoning and my ability to explain complex infrastructure in a way non-specialists can actually follow.",
    stats: {
      systemResponse: 77,
      productClarity: 74,
      realWorldFit: 78,
    },
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
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
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
            <h2 className="text-xl text-foreground sm:text-3xl md:text-4xl">Proof of Work</h2>
            <div className="h-px max-w-xs flex-1 bg-border" />
          </div>

          <div className="mb-8 max-w-3xl sm:mb-12">
            <span className="section-kicker">WHY this work is credible</span>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Can systems react faster than humans, predict intent earlier, or feel more intuitive
              in motion? Each case study answers a real question instead of just presenting a build.
            </p>
          </div>

          <ProjectSpotlight
            project={projects[activeProjectIndex]}
            activeProjectIndex={activeProjectIndex}
            onSelect={setActiveProjectIndex}
          />

          <div className="grid gap-5 xl:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                isVisible={isVisible}
                isActive={index === activeProjectIndex}
                onActivate={() => setActiveProjectIndex(index)}
              />
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
  isActive,
  onActivate,
}: {
  project: (typeof projects)[0]
  index: number
  isVisible: boolean
  isActive: boolean
  onActivate: () => void
}) {
  return (
    <div
      className={cn(
        "signal-card signal-rail magnetic-card rounded-[1.3rem] border p-4 transition-all duration-500 hover:border-primary/20 hover:shadow-[0_22px_50px_rgba(18,25,38,0.1)] sm:rounded-[1.5rem] sm:p-6",
        isActive ? "border-primary/25 shadow-[0_24px_55px_rgba(18,25,38,0.11)]" : "",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={onActivate}
      onFocus={onActivate}
    >
      <div className="mb-5 flex flex-col items-start gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="inline-flex rounded-2xl border border-primary/15 bg-primary/8 p-3 text-primary">
          {project.icon}
        </div>
        <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background/70 px-3 py-1 text-[0.66rem] uppercase tracking-[0.16em] text-muted-foreground sm:text-[0.72rem] sm:tracking-[0.2em]">
          Why this matters
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>

      <p className="text-sm font-medium leading-relaxed text-primary sm:text-[0.95rem]">{project.hook}</p>
      <h3 className="mt-4 text-[1.45rem] font-semibold leading-tight text-foreground sm:text-2xl">{project.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[0.98rem]">{project.summary}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <CaseStudyBlock label="Problem" content={project.problem} />
        <CaseStudyBlock label="Approach" content={project.approach} />
      </div>

      <div className="mt-4 rounded-[1.15rem] border border-primary/12 bg-primary/6 p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Outcome</p>
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

function ProjectSpotlight({
  project,
  activeProjectIndex,
  onSelect,
}: {
  project: (typeof projects)[0]
  activeProjectIndex: number
  onSelect: (index: number) => void
}) {
  return (
    <div className="signal-panel mb-8 overflow-hidden rounded-[1.5rem] border border-border/80 p-5 sm:mb-12 sm:p-8">
      <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
            Live Case Study Spotlight
          </p>
          <p className="mt-3 max-w-2xl text-xl leading-tight text-foreground sm:text-[1.85rem]">
            {project.hook}
          </p>
          <h3 className="mt-4 text-2xl text-foreground sm:text-3xl">{project.title}</h3>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {project.summary}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {projects.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => onSelect(index)}
                className={cn(
                  "rounded-full border px-3 py-2 text-xs uppercase tracking-[0.16em] transition-all",
                  index === activeProjectIndex
                    ? "border-primary/30 bg-primary/10 text-foreground"
                    : "border-border bg-background/70 text-muted-foreground hover:border-primary/20 hover:text-foreground"
                )}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>

        <div className="signal-card rounded-[1.25rem] border border-border/80 p-4 sm:p-5">
          <p className="text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
            System Readout
          </p>
          <div className="mt-5 space-y-4">
            <SignalMeter label="System Response" value={project.stats.systemResponse} />
            <SignalMeter label="Product Clarity" value={project.stats.productClarity} />
            <SignalMeter label="Real-World Fit" value={project.stats.realWorldFit} />
          </div>
          <div className="mt-5 rounded-[1rem] border border-border/70 bg-background/70 p-4">
            <p className="text-[0.64rem] uppercase tracking-[0.18em] text-muted-foreground">
              Outcome Snapshot
            </p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/88">{project.impact}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function SignalMeter({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
        <span className="text-foreground">{label}</span>
        <span className="text-muted-foreground">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,rgba(203,119,46,0.95),rgba(64,84,163,0.78))] transition-all duration-500"
          style={{ width: `${value}%` }}
        />
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
