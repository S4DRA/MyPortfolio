"use client"

import { useEffect, useRef } from "react"
import { PerspectiveCamera, Scene, WebGLRenderer } from "three"
import { cappedDpr } from "@/lib/animation/frame"
import { useSceneStore } from "./cinematic-shell"

export function VisualLayer() {
  const hostRef = useRef<HTMLDivElement>(null)
  const store = useSceneStore()

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    // Each effect owns its canvas/context. Strict Mode must never reuse a lost context.
    const canvas = document.createElement("canvas")
    canvas.style.width = "100%"
    canvas.style.height = "100%"
    host.appendChild(canvas)
    let renderer: WebGLRenderer
    try {
      renderer = new WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "low-power" })
    } catch (error) {
      canvas.dataset.webgl = "unavailable"
      console.warn("WebGL unavailable; portfolio content remains in the DOM.", error)
      return () => canvas.remove()
    }
    const scene = new Scene()
    const camera = new PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.z = 1
    renderer.setClearColor(0x000000, 0)
    canvas.dataset.webgl = "ready"
    let contextLost = false

    const render = () => {
      if (document.hidden || contextLost || !canvas.isConnected) return
      // Future visual modules consume this same imperative snapshot, without React frame state.
      scene.userData.scenes = store.getScenes()
      renderer.render(scene, camera)
    }
    const resize = () => {
      renderer.setPixelRatio(cappedDpr())
      renderer.setSize(window.innerWidth, window.innerHeight, false)
      camera.aspect = window.innerWidth / Math.max(1, window.innerHeight)
      camera.updateProjectionMatrix()
      render()
    }
    const loseContext = (event: Event) => {
      event.preventDefault()
      contextLost = true
      canvas.dataset.webgl = "lost"
      console.warn("WebGL context lost; DOM portfolio remains available.")
    }
    const restoreContext = () => { contextLost = false; canvas.dataset.webgl = "ready"; resize() }
    const unsubscribe = store.subscribe(render)
    canvas.addEventListener("webglcontextlost", loseContext)
    canvas.addEventListener("webglcontextrestored", restoreContext)
    window.addEventListener("resize", resize)
    document.addEventListener("visibilitychange", render)
    resize()

    return () => {
      unsubscribe()
      canvas.removeEventListener("webglcontextlost", loseContext)
      canvas.removeEventListener("webglcontextrestored", restoreContext)
      window.removeEventListener("resize", resize)
      document.removeEventListener("visibilitychange", render)
      renderer.dispose()
      renderer.forceContextLoss()
      canvas.remove()
      // Future geometry/material/texture owners must dispose their resources here as well.
    }
  }, [store])

  return <div ref={hostRef} aria-hidden="true" className="cinematic-visual-layer" />
}
