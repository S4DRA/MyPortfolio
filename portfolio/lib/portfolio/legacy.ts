import { Bot, Camera, Gamepad2, HeartPulse, MessageCircle, RadioTower, Star, Wallet } from "lucide-react"
import { projects } from "./projects"

const icons = { Bot, Camera, Gamepad2, HeartPulse, MessageCircle, RadioTower, Star, Wallet }

// This adapter locks the current presentation/order independently of future chapter order.
export const featuredProjects = projects.filter(p => p.legacyHome?.kind === "featured").map(p => ({
  id: p.id,
  index: p.index,
  order: projects.filter(project => project.legacyHome).indexOf(p) + 2,
  title: p.title,
  eyebrow: p.legacyHome?.eyebrow,
  icon: icons[p.legacyHome!.icon],
  oneLine: p.tagline ?? "",
  problem: p.problem ?? "",
  role: p.role ?? "",
  built: p.solution ?? "",
  decision: p.decision ?? "",
  change: p.outcomes?.join(" ") ?? "",
  status: p.status ?? "",
  links: p.links ?? [],
  visuals: (p.gallery ?? []).map(asset => ({ ...asset, className: asset.legacyClassName })),
}))

export const otherProjects = projects.filter(p => p.legacyHome?.kind === "secondary").map(p => ({
  id: p.id,
  index: p.index,
  order: projects.filter(project => project.legacyHome).indexOf(p) + 2,
  title: p.title,
  type: p.category,
  icon: icons[p.legacyHome!.icon],
  description: p.summary,
  evidence: p.evidence,
  tags: p.technologies ?? [],
}))
