import type { Metadata } from "next"
import { PortfolioPage } from "@/components/portfolio-page"

export const metadata: Metadata = {
  title: "Website Design | Sadra Ahadiyan",
  description: "Website design work and interface thinking in Sadra Ahadiyan's portfolio.",
}

export default function WebsiteDesignPage() {
  return (
    <PortfolioPage
      eyebrow="Web"
      title="Website Design"
      intro="This page focuses on digital interfaces, responsive layouts, and the visual systems behind modern websites. I care about combining clean structure with a strong visual atmosphere."
      metrics={[
        { label: "Focus", value: "UI + UX" },
        { label: "Strength", value: "Responsive Layouts" },
        { label: "Direction", value: "Modern Visual Systems" },
        { label: "Goal", value: "Clear User Flow" },
      ]}
      sections={[
        {
          title: "Design Principles",
          description:
            "I approach web design as both a visual and usability problem, making sure a page feels good and guides users clearly.",
          items: [
            "Build layouts that stay clean across desktop, tablet, and mobile.",
            "Use visual hierarchy to direct attention without overwhelming the interface.",
            "Create components that feel consistent while still supporting personality.",
          ],
        },
        {
          title: "Possible Content",
          description:
            "This page is ready for case studies, mockups, and redesign work as more projects are added.",
          items: [
            "Landing page concepts with strong messaging and conversion paths.",
            "Portfolio and studio websites designed around storytelling.",
            "Dashboard or product interface explorations for more complex systems.",
          ],
        },
      ]}
      showcases={[
        {
          title: "Portfolio Experience",
          description:
            "A polished personal site direction that mixes atmosphere, motion, and project-first storytelling.",
          tags: ["Portfolio", "Motion", "Storytelling"],
        },
        {
          title: "Startup Landing Page",
          description:
            "A clean marketing page layout built to introduce a product quickly and move visitors toward action.",
          tags: ["Landing Page", "Conversion", "Branding"],
        },
        {
          title: "Creative Studio Site",
          description:
            "A more expressive web concept where typography, image rhythm, and transitions define the mood.",
          tags: ["Creative", "Editorial", "Responsive"],
        },
      ]}
    />
  )
}
