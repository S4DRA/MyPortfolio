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
          title: "Exairon Documentation Website",
          description:
            "One of the website design projects I worked on was a documentation-focused website for Exairon. Even though I do not currently have access to the live site or screenshots, the project was centered on making technical information easier to navigate and understand.",
          items: [
            "Designed the structure around readability, so users could move through guides, references, and product information without feeling lost.",
            "Focused on documentation hierarchy, including clearer section grouping, predictable navigation, and fast scanning for technical content.",
            "Balanced company branding with a clean utility-first layout so the site could feel professional while still being practical for everyday use.",
          ],
        },
      ]}
      showcases={[
        {
          title: "Exairon Website Sample",
          description:
            "This sample presents a landing page for Exairon with a strong hero section, partner logos, and feature-led messaging. The dark blue and orange contrast gives it a clear brand identity, while the structure supports quick reading through headline, proof, and product explanation sections.",
          tags: ["Landing Page", "Product Website", "Branding"],
          imageSrc: "/website-1.png",
          imageAlt: "Exairon website landing page sample",
        },
        {
          title: "Portfolio Experience",
          description:
            "A polished personal site direction that mixes atmosphere, motion, and project-first storytelling.",
          tags: ["Portfolio", "Motion", "Storytelling"],
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
