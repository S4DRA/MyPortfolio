"use client"

import { useCallback, useSyncExternalStore } from "react"
import { useSceneStore } from "@/components/cinematic/cinematic-shell"
import { useReducedMotion } from "./use-experience"

export function useSceneNavigation() {
  const store = useSceneStore()
  const reducedMotion = useReducedMotion()
  const activeScene = useSyncExternalStore(store.subscribeNavigation, store.getActive, () => null)
  const jumpToScene = useCallback((id: string) => {
    const element = document.getElementById(id)
    if (!element) return false
    element.focus({ preventScroll: true })
    store.scrollTo(element, reducedMotion)
    // Native anchors/history remain usable; no route transition is required.
    window.history.pushState(window.history.state, "", `#${encodeURIComponent(id)}`)
    return true
  }, [reducedMotion, store])
  return { activeScene, activeProjectId: activeScene?.projectId, activeProjectIndex: activeScene?.projectIndex, jumpToScene }
}
