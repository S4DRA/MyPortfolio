export type PortfolioAsset = {
  src: string
  alt: string
  width?: number
  height?: number
  label?: string
  legacyClassName?: string
}

export type ProjectShowcase = {
  title: string
  description: string
  tags: string[]
  imageSrc?: string
  imageAlt?: string
  order: number
}

export type PortfolioProject = {
  id: string
  slug: string
  index?: string
  title: string
  shortTitle?: string
  category: string
  year?: string
  status?: string
  tagline?: string
  summary?: string
  longDescription?: string
  role?: string
  responsibilities?: string[]
  technologies?: string[]
  problem?: string
  solution?: string
  decision?: string
  outcomes?: string[]
  evidence?: string
  projectUrl?: string
  repositoryUrl?: string
  links?: { label: string; href: string; internal: boolean }[]
  logo?: PortfolioAsset
  heroAsset?: PortfolioAsset
  gallery?: PortfolioAsset[]
  videos?: { src: string; poster?: string; caption: string }[]
  accent?: string
  background?: string
  foreground?: string
  featured: boolean
  archive: boolean
  order: number
  contentState: "placeholder" | "existing"
  missing?: string[]
  // Preserve route-specific copy while all project content lives in one catalog.
  presentations?: Record<string, ProjectShowcase>
  legacyHome?: {
    kind: "featured" | "secondary"
    icon: "Wallet" | "Bot" | "MessageCircle" | "Camera" | "Star" | "HeartPulse" | "RadioTower" | "Gamepad2"
    eyebrow?: string
    tone?: string
  }
}
