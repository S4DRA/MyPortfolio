"use client"

import { useCallback, useSyncExternalStore } from "react"

function useMediaQuery(query: string, serverValue = false) {
  const subscribe = useCallback((notify: () => void) => {
    const media = window.matchMedia(query)
    media.addEventListener("change", notify)
    return () => media.removeEventListener("change", notify)
  }, [query])
  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query])
  return useSyncExternalStore(subscribe, getSnapshot, () => serverValue)
}

// Safe on the server and during hydration; preference changes are observed live.
export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)", true)
}

export function useExperience() {
  const desktop = useMediaQuery("(min-width: 1280px)")
  const tablet = useMediaQuery("(min-width: 768px)")
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)")
  const reducedMotion = useReducedMotion()
  return { device: desktop ? "desktop" as const : tablet ? "tablet" as const : "mobile" as const, finePointer, reducedMotion }
}
