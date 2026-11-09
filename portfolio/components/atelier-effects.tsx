"use client"

import { useEffect } from "react"

export function AtelierEffects() {
  useEffect(() => {
    const motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const root = document.documentElement
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"))
    const observer = motionOK && "IntersectionObserver" in window
      ? new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add("atelier-revealed")
              observer?.unobserve(entry.target)
            }
          })
        }, { threshold: 0.08, rootMargin: "0px 0px -28px 0px" })
      : null

    elements.forEach(element => {
      if (observer) observer.observe(element)
      else element.classList.add("atelier-revealed")
    })
    if (observer) root.classList.add("atelier-motion-ready")

    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        const available = document.documentElement.scrollHeight - window.innerHeight
        root.style.setProperty("--atelier-scroll-progress", String(available > 0 ? window.scrollY / available : 0))
        frame = 0
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })

    const tilt = document.querySelector<HTMLElement>("[data-pointer-tilt]")
    const onMove = (event: PointerEvent) => {
      if (!tilt || !motionOK || event.pointerType !== "mouse") return
      const bounds = tilt.getBoundingClientRect()
      tilt.style.setProperty("--pointer-x", String((event.clientX - bounds.left) / bounds.width - 0.5))
      tilt.style.setProperty("--pointer-y", String((event.clientY - bounds.top) / bounds.height - 0.5))
    }
    const onLeave = () => {
      tilt?.style.setProperty("--pointer-x", "0")
      tilt?.style.setProperty("--pointer-y", "0")
    }
    tilt?.addEventListener("pointermove", onMove)
    tilt?.addEventListener("pointerleave", onLeave)

    return () => {
      observer?.disconnect()
      root.classList.remove("atelier-motion-ready")
      root.style.removeProperty("--atelier-scroll-progress")
      window.removeEventListener("scroll", onScroll)
      tilt?.removeEventListener("pointermove", onMove)
      tilt?.removeEventListener("pointerleave", onLeave)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])
  return null
}
