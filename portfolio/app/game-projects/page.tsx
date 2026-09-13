import { getProjectShowcases } from "@/lib/portfolio/projects"
import type { Metadata } from "next"
import { PortfolioPage } from "@/components/portfolio-page"

export const metadata: Metadata = {
  title: "Game Projects | Sadra Ahadiyan",
  description: "Game projects and interactive concepts from Sadra Ahadiyan's portfolio.",
}

export default function GameProjectsPage() {
  return (
    <PortfolioPage
      eyebrow="Games"
      title="Game Projects"
      intro="This page brings together my game concepts, interactive ideas, and narrative-driven experiments. Game development is where my interest in technology and creativity naturally meet."
      metrics={[
        { label: "Focus", value: "Interactive Storytelling" },
        { label: "Interest", value: "Gameplay Concepts" },
        { label: "Strength", value: "Mood + Structure" },
        { label: "Goal", value: "Memorable Experiences" },
      ]}
      sections={[
        {
          title: "Creative Direction",
          description:
            "I’m especially drawn to games that combine atmosphere, mechanics, and story into one coherent experience.",
          items: [
            "Design worlds that feel emotionally distinct and visually memorable.",
            "Shape gameplay loops around curiosity, tension, and discovery.",
            "Use narrative context to make mechanics feel purposeful instead of disconnected.",
          ],
        },
        {
          title: "Future Expansion",
          description:
            "This page can grow into a space for prototypes, devlogs, level ideas, and worldbuilding notes.",
          items: [
            "Concept summaries and design pillars for each game idea.",
            "Visual style notes, environment references, and gameplay goals.",
            "Prototype screenshots, mechanics breakdowns, and story beats.",
          ],
        },
      ]}
      showcases={getProjectShowcases("game-projects")}
    />
  )
}
