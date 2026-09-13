"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { gsap, ScrollTrigger } from "@/lib/animation/gsap"
import { useExperience } from "@/hooks/use-experience"
import { useSceneStore } from "./cinematic-shell"

export type SceneProps = {
  id: string
  projectId?: string
  projectIndex?: string
  order: number
  children: ReactNode
  className?: string
  as?: "section" | "article"
  pin?: boolean
  scrollDistance?: number | (() => number)
  buildTimeline?: (timeline: ReturnType<typeof gsap.timeline>, element: HTMLElement) => void
  onProgress?: (progress: number) => void
  onEnter?: () => void
  onLeave?: () => void
}

export function Scene({ id, projectId, projectIndex, order, children, className, as: Tag = "section", pin = false, scrollDistance, buildTimeline, onProgress, onEnter, onLeave }: SceneProps) {
  const ref = useRef<HTMLElement>(null)
  const store = useSceneStore()
  const { device, reducedMotion } = useExperience()

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const unregister = store.register({ id, projectId, projectIndex, order })
    const spatialMotion = device === "desktop" && !reducedMotion
    const context = gsap.context(() => {
      const timeline = spatialMotion && buildTimeline ? gsap.timeline({ paused: true }) : undefined
      if (timeline) buildTimeline?.(timeline, element)
      const update = (trigger: ScrollTrigger) => {
        store.update(id, trigger.progress, trigger.isActive)
        // Static mode still reports navigation position, but never applies motion callbacks.
        if (spatialMotion) {
          timeline?.progress(trigger.progress)
          onProgress?.(trigger.progress)
        }
      }
      ScrollTrigger.create({
        id: `scene:${id}`,
        trigger: element,
        start: spatialMotion && pin ? "top top" : "top center",
        end: spatialMotion && scrollDistance !== undefined
          ? () => `+=${Math.max(1, typeof scrollDistance === "function" ? scrollDistance() : scrollDistance)}`
          : "bottom center",
        pin: spatialMotion && pin,
        invalidateOnRefresh: true,
        onUpdate: update,
        onRefresh: update,
        onToggle: trigger => {
          update(trigger)
          if (trigger.isActive) onEnter?.()
          else onLeave?.()
        },
      })
    }, element)
    // Images/fonts can change geometry after the trigger was created.
    const refresh = () => ScrollTrigger.refresh(true)
    element.addEventListener("load", refresh, true)
    let disposed = false
    void document.fonts.ready.then(() => { if (!disposed) refresh() })
    return () => {
      disposed = true
      element.removeEventListener("load", refresh, true)
      context.revert()
      unregister()
    }
  }, [id, projectId, projectIndex, order, store, device, reducedMotion, pin, scrollDistance, buildTimeline, onProgress, onEnter, onLeave])

  return <Tag ref={ref} id={id} className={className} data-scene={id} tabIndex={-1}>{children}</Tag>
}
