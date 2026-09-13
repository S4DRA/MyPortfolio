"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { useExperience } from "@/hooks/use-experience"
import { ScrollTrigger } from "@/lib/animation/gsap"
import { subscribeFrame } from "@/lib/animation/frame"
import { useSceneStore } from "./cinematic-shell"

export function ScrollController({ enabled = false }: { enabled?: boolean }) {
  const pathname = usePathname()
  const store = useSceneStore()
  const { device, finePointer, reducedMotion } = useExperience()

  useEffect(() => {
    if (!enabled || device !== "desktop" || !finePointer || reducedMotion) return
    let disposed = false
    let cleanup: (() => void) | undefined
    void import("lenis").then(({ default: Lenis }) => {
      if (disposed) return
      const lenis = new Lenis({
        autoRaf: false,
        smoothWheel: true,
        syncTouch: false,
        anchors: true,
        stopInertiaOnNavigate: true,
        respectReducedMotion: true,
        prevent: node => Boolean(node.closest("[data-lenis-prevent]")),
      })
      const unsubscribeScroll = lenis.on("scroll", ScrollTrigger.update)
      const unsubscribeFrame = subscribeFrame(time => lenis.raf(time))
      const unregisterNavigation = store.setScrollTo(element => lenis.scrollTo(element, {
        offset: -(parseFloat(getComputedStyle(element).scrollMarginTop) || 0),
      }))
      // Do not override history.scrollRestoration or scroll to zero on route changes.
      const restore = () => {
        lenis.resize()
        lenis.scrollTo(window.scrollY, { immediate: true })
        ScrollTrigger.refresh(true)
      }
      window.addEventListener("pageshow", restore)
      window.addEventListener("popstate", restore)
      cleanup = () => {
        unsubscribeFrame()
        unsubscribeScroll()
        unregisterNavigation()
        window.removeEventListener("pageshow", restore)
        window.removeEventListener("popstate", restore)
        lenis.destroy()
      }
      ScrollTrigger.refresh(true)
    }).catch(error => console.warn("Smooth scrolling unavailable; using native scrolling.", error))
    return () => { disposed = true; cleanup?.() }
  }, [enabled, device, finePointer, reducedMotion, pathname, store])

  return null
}
