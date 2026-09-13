import { getProjectShowcases } from "@/lib/portfolio/projects"
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
      intro="This page brings together a small logo set ranging from formal community identity to expressive wordmarks and stripped-back symbols. Each piece explores a different balance of readability, atmosphere, and personality."
      metrics={[
        { label: "Pieces", value: "6 Concepts" },
        { label: "Range", value: "Formal to Experimental" },
        { label: "Main Thread", value: "Shape + Recognition" },
        { label: "Focus", value: "Memorable Visual Tone" },
      ]}
      sections={[
        {
          title: "What Stands Out",
          description:
            "Across these images, the strongest ideas come from pushing one clear visual move at a time instead of overloading the mark.",
          items: [
            "The wordmark pieces lean on tall perspective, heavy outlines, and dramatic framing to feel loud and unmistakable.",
            "The minimal symbols use vertical bars and sharp peaks to suggest architecture, height, and stability with very little detail.",
            "The emblem approach uses rings, typography, and national references to communicate community and identity more directly.",
          ],
        },
        {
          title: "Reading The Set",
          description:
            "The collection feels like a mix of polished directions and exploratory sketches, which makes the process visible instead of only showing final marks.",
          items: [
            "Some logos are built for impact first, especially the luminous ROOTONSET variants.",
            "Some are reduced to core silhouettes, which helps test whether the idea survives without effects.",
            "Some images read like rough concept captures, useful for finding a unique motion or attitude before refinement.",
          ],
        },
      ]}
      showcases={getProjectShowcases("logo")}
    />
  )
}
