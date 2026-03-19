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
      showcases={[
        {
          title: "DasaPhase",
          description:
            "A surreal game concept about a boy waking late for school and slipping into a mysterious dreamlike world.",
          tags: ["Narrative", "Concept", "Atmosphere"],
        },
        {
          title: "School-to-Dream Transition",
          description:
            "A level progression idea built around contrast, turning an ordinary environment into something uncanny and symbolic.",
          tags: ["Level Design", "Mood", "Pacing"],
        },
        {
          title: "Interactive Worldbuilding",
          description:
            "A direction for creating lore and emotional context through environment design rather than exposition alone.",
          tags: ["Worldbuilding", "Story", "Immersion"],
        },
      ]}
    />
  )
}
