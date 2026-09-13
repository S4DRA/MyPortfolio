"use client"

import { gsap } from "./gsap"

type FrameListener = (time: number, delta: number) => void
const listeners = new Set<FrameListener>()
let attached = false

function tick(time: number, delta: number) {
  for (const listener of listeners) listener(time * 1000, Math.min(delta, 64))
}

function syncVisibility() {
  const shouldAttach = listeners.size > 0 && !document.hidden
  if (shouldAttach && !attached) gsap.ticker.add(tick)
  if (!shouldAttach && attached) gsap.ticker.remove(tick)
  attached = shouldAttach
}

// A thin adapter over GSAP's ticker, not a second RAF engine.
export function subscribeFrame(listener: FrameListener) {
  if (listeners.size === 0) document.addEventListener("visibilitychange", syncVisibility)
  listeners.add(listener)
  syncVisibility()
  return () => {
    listeners.delete(listener)
    syncVisibility()
    if (listeners.size === 0) document.removeEventListener("visibilitychange", syncVisibility)
  }
}

export function getFrameSubscriberCount() { return listeners.size }

export function cappedDpr(limit = 1.5) {
  return Math.min(window.devicePixelRatio || 1, limit)
}
