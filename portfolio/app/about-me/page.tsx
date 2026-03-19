import type { Metadata } from "next"
import Image from "next/image"
import { PortfolioPage } from "@/components/portfolio-page"

export const metadata: Metadata = {
  title: "About Me | Sadra Ahadiyan",
  description: "A detailed about page for Sadra Ahadiyan's portfolio.",
}

export default function AboutMePage() {
  return (
    <PortfolioPage
      eyebrow="Profile"
      title="About Me"
      intro="I'm Sadra Ahadiyan, a computer engineering student at Bahcesehir University in Istanbul. I'm interested in building intelligent systems, designing thoughtful digital experiences, and exploring game development as a creative medium."
      heroVisual={
        <div className="mx-auto max-w-sm">
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card/70 p-3 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            <Image
              src="/myPhoto.jpg"
              alt="Portrait of Sadra Ahadiyan"
              width={900}
              height={1100}
              className="relative z-10 aspect-[4/5] w-full rounded-[1.4rem] object-cover object-center"
              priority
            />
          </div>
        </div>
      }
      metrics={[
        { label: "University", value: "BAU Istanbul" },
        { label: "Field", value: "Computer Engineering" },
        { label: "Interests", value: "AI, Design, Games" },
        { label: "Base", value: "Istanbul, Turkey" },
      ]}
      sections={[
        {
          title: "What Drives Me",
          description:
            "I enjoy combining technical depth with creativity, especially in projects that have both a functional and emotional impact.",
          items: [
            "Learning how intelligent systems can solve meaningful everyday problems.",
            "Designing digital products that feel polished, clear, and engaging.",
            "Exploring game development as a way to tell stories through interaction.",
          ],
        },
        {
          title: "How I Work",
          description:
            "My process is usually a mix of research, experimentation, and iteration until the idea feels solid both technically and visually.",
          items: [
            "Start with understanding the purpose and constraints of the project.",
            "Prototype quickly, then refine structure, detail, and usability.",
            "Keep learning from every project and carry those lessons into the next one.",
          ],
        },
      ]}
      showcases={[
        {
          title: "AI and Computer Vision",
          description:
            "A technical path that lets me work on systems capable of interpreting and reacting to the world.",
          tags: ["AI", "Vision", "Problem Solving"],
        },
        {
          title: "Creative Web Work",
          description:
            "A design direction focused on expressive but usable interfaces for portfolios, products, and personal brands.",
          tags: ["Web Design", "Frontend", "UX"],
        },
        {
          title: "Game Development",
          description:
            "An area where I can combine worldbuilding, storytelling, and interactivity into one craft.",
          tags: ["Games", "Narrative", "Creativity"],
        },
      ]}
    />
  )
}
