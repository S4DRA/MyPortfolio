import type { Metadata } from "next"
import { PortfolioPage } from "@/components/portfolio-page"

export const metadata: Metadata = {
  title: "Logo | Sadra Ahadiyan",
  description: "Logo concepts and identity thinking in Sadra Ahadiyan's portfolio.",
}

export default function LogoPage() {
  return (
    <PortfolioPage
      eyebrow="Identity"
      title="Logo Design"
      intro="This page is dedicated to logo exploration, brand symbols, and visual identity systems. It highlights how I approach clarity, memorability, and personality when shaping a mark."
      metrics={[
        { label: "Focus", value: "Brand Identity" },
        { label: "Priority", value: "Clarity + Recall" },
        { label: "Style", value: "Modern Minimal" },
        { label: "Goal", value: "Strong First Impression" },
      ]}
      sections={[
        {
          title: "Design Approach",
          description:
            "My logo process starts with understanding the brand story before moving into shapes, proportions, and typography.",
          items: [
            "Translate a brand idea into a simple and memorable symbol.",
            "Test how the mark behaves in light, dark, and small-size usage.",
            "Balance minimal form with enough uniqueness to feel recognizable.",
          ],
        },
        {
          title: "What This Page Can Hold",
          description:
            "As the portfolio grows, this section can feature full branding studies and logo variations.",
          items: [
            "Primary and secondary logo systems for different placements.",
            "Typography pairings and color directions for brand consistency.",
            "Mockups for packaging, social banners, and digital product use.",
          ],
        },
      ]}
      showcases={[
        {
          title: "Tech Startup Mark",
          description:
            "A crisp geometric logo direction designed to feel intelligent, reliable, and future-facing.",
          tags: ["Geometry", "Grid", "Scalable"],
        },
        {
          title: "Personal Brand Symbol",
          description:
            "A custom identity concept built around initials, motion, and a clean digital-first presence.",
          tags: ["Monogram", "Personal Brand", "Digital"],
        },
        {
          title: "Gaming Identity Direction",
          description:
            "A more expressive concept that combines dramatic contrast with a symbol that works in streams and promotional art.",
          tags: ["Esports", "Bold", "Merch"],
        },
      ]}
    />
  )
}
