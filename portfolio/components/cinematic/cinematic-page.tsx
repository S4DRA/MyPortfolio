import type { ReactNode } from "react"

// Semantic DOM layer. Layout is caller-owned; no design or scroll length is imposed.
export function CinematicPage({ children, className }: { children: ReactNode; className?: string }) {
  return <main className={className} data-cinematic-page>{children}</main>
}
