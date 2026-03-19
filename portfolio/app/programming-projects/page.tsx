import type { Metadata } from "next"
import { PortfolioPage } from "@/components/portfolio-page"

export const metadata: Metadata = {
  title: "Programming Projects | Sadra Ahadiyan",
  description: "Programming projects from Sadra Ahadiyan across AI, software, and research.",
}

export default function ProgrammingProjectsPage() {
  return (
    <PortfolioPage
      eyebrow="Code"
      title="Programming Projects"
      intro="This page is for software engineering work across AI, algorithms, and application development. It reflects both my technical curiosity and my interest in solving practical problems with code."
      metrics={[
        { label: "Core Areas", value: "AI + Software" },
        { label: "Languages", value: "Python, C++, Web" },
        { label: "Style", value: "Practical Problem Solving" },
        { label: "Goal", value: "Build Useful Systems" },
      ]}
      sections={[
        {
          title: "Technical Interests",
          description:
            "My strongest motivation in programming is turning ideas into working systems that have a clear purpose.",
          items: [
            "Develop AI-assisted tools that respond to real-world inputs.",
            "Explore algorithms and modeling techniques for structured problem solving.",
            "Build maintainable interfaces and systems that are easy to extend over time.",
          ],
        },
        {
          title: "Project Categories",
          description:
            "This page can organize software work by domain as the portfolio expands.",
          items: [
            "Computer vision and intelligent automation projects.",
            "Academic programming assignments and data-driven experiments.",
            "Full-stack or frontend builds that combine design with engineering.",
          ],
        },
      ]}
      showcases={[
        {
          title: "Smart Office Security Camera",
          description:
            "An AI-based monitoring system using vision models and alerting logic to detect suspicious events in real time.",
          tags: ["Python", "YOLOv5", "Telegram API"],
        },
        {
          title: "User Rating Prediction System",
          description:
            "A C++ modeling project focused on interpreting rating behavior and generating useful predictions.",
          tags: ["C++", "Algorithms", "Prediction"],
        },
        {
          title: "Interaction App Prototype",
          description:
            "A university project centered on application structure, interface behavior, and multi-step user interaction.",
          tags: ["UI Logic", "Prototype", "Research"],
        },
      ]}
    />
  )
}
