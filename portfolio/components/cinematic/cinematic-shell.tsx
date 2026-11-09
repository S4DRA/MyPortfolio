"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"
import { createSceneStore, type SceneStore } from "@/lib/animation/scene-store"
import { useExperience } from "@/hooks/use-experience"
import { ScrollController } from "./scroll-controller"

const VisualLayer = dynamic(() => import("./visual-layer").then(module => module.VisualLayer), { ssr: false })
const SceneContext = createContext<SceneStore | null>(null)

export function useSceneStore() {
  const store = useContext(SceneContext)
  if (!store) throw new Error("Cinematic scenes require CinematicShell")
  return store
}

export function CinematicShell({ children, smoothScroll = false }: { children: ReactNode; smoothScroll?: boolean }) {
  const [store] = useState(createSceneStore)
  const { device, reducedMotion } = useExperience()
  const pathname = usePathname()
  const legacyVisuals = pathname !== "/"
  return (
    <SceneContext.Provider value={store}>
      <ScrollController enabled={smoothScroll && legacyVisuals} />
      {legacyVisuals && device !== "mobile" && !reducedMotion ? <VisualLayer /> : null}
      {children}
    </SceneContext.Provider>
  )
}
