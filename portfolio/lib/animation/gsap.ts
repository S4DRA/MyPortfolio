"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
  // Lenis consumes real elapsed milliseconds from the same ticker.
  gsap.ticker.lagSmoothing(0)
}

export { gsap, ScrollTrigger }
