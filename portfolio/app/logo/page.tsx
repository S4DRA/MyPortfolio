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
      showcases={[
        {
          title: "3. Bahcesehir University Iranian Students Community",
          description:
            "This circular badge feels official and community-driven. The outer rings, bilingual naming, and central Iranian imagery make it read more like an institutional emblem than a startup logo, which suits a student association well.",
          tags: ["Emblem", "Community", "Institutional"],
          imageSrc: "/3.png",
          imageAlt: "Circular logo for Bahcesehir University Iranian Students Community",
        },
        {
          title: "4. ROOTONSET Neon Wordmark",
          description:
            "The glowing treatment gives this version a strong gaming or music-brand energy. The mountain-like silhouette around the lettering makes the word feel carved into a peak, which adds scale and drama.",
          tags: ["Wordmark", "Neon", "High Energy"],
          imageSrc: "/4.png",
          imageAlt: "Neon ROOTONSET wordmark on a black background",
        },
        {
          title: "5. ROOTONSET Black and White",
          description:
            "This black-and-white version strips the concept back to form and contrast. It keeps the same towering perspective, which is a good sign that the core shape is memorable even without color or glow effects.",
          tags: ["Wordmark", "Monochrome", "Form Study"],
          imageSrc: "/5.png",
          imageAlt: "Black and white ROOTONSET wordmark",
        },
        {
          title: "6. Minimal Peak Symbol",
          description:
            "This mark is extremely reduced: just a few vertical forms building to a central peak. It reads like a skyline, a crown, or a stylized monogram, so it has flexibility, but it may need more surrounding brand context to feel unique.",
          tags: ["Minimal", "Abstract", "Architectural"],
          imageSrc: "/6.jpg",
          imageAlt: "Minimal black symbol made of five rising vertical shapes",
        },
        {
          title: "7. Experimental Lightning Mark",
          description:
            "This feels raw, aggressive, and motion-heavy. The central shape suggests a slashed letterform with electric or flame-like accents, which creates attitude fast, though it is less immediately legible than the more structured pieces.",
          tags: ["Experimental", "Dynamic", "Edgy"],
          imageSrc: "/7.jpg",
          imageAlt: "Abstract black and white symbol with jagged electric accents",
        },
        {
          title: "8. ROOTONSET Soft Gradient Variant",
          description:
            "This version softens the neon direction into something more polished and product-ready. The gradient and drop-shadow still give it depth, but the lighter background makes it feel more versatile for broader brand applications.",
          tags: ["Wordmark", "Gradient", "Refined"],
          imageSrc: "/8.jpg",
          imageAlt: "ROOTONSET wordmark with a silver and purple-red gradient",
        },
      ]}
    />
  )
}
