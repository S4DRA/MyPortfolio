"use client"

import { useEffect } from "react"

export function PackMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".pack-root")
    if (!root) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const elements = Array.from(root.querySelectorAll<HTMLElement>("[data-pack-reveal]"))
    const observer = !reduced && typeof IntersectionObserver !== "undefined"
      ? new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return
            entry.target.classList.add("pack-visible")
            observer?.unobserve(entry.target)
          })
        }, { threshold: 0.07, rootMargin: "0px 0px -25px 0px" })
      : null

    if (observer) {
      root.classList.add("pack-motion-ready")
      elements.forEach(element => observer.observe(element))
    } else {
      elements.forEach(element => element.classList.add("pack-visible"))
    }

    // Native <details> handles the menu even without JavaScript.
    const menu = root.querySelector<HTMLDetailsElement>(".pack-mobile-menu")
    const closeMenu = () => { if (menu) menu.open = false }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu()
    }
    const links = Array.from(menu?.querySelectorAll<HTMLAnchorElement>("a") ?? [])
    links.forEach(link => link.addEventListener("click", closeMenu))
    window.addEventListener("keydown", onKeyDown)

    return () => {
      observer?.disconnect()
      root.classList.remove("pack-motion-ready")
      links.forEach(link => link.removeEventListener("click", closeMenu))
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [])
  return null
}
