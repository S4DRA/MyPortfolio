"use client"

import { useEffect, useRef } from "react"

type Ribbon = {
  baseY: number
  amplitude: number
  speed: number
  thickness: number
  hue: number
  alpha: number
  offset: number
}

type Orb = {
  radius: number
  angle: number
  speed: number
  orbitX: number
  orbitY: number
  size: number
  hue: number
  alpha: number
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId = 0
    let ribbons: Ribbon[] = []
    let orbs: Orb[] = []
    let frame = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createScene = () => {
      const ribbonCount = Math.max(4, Math.floor(canvas.height / 220))
      ribbons = Array.from({ length: ribbonCount }, (_, index) => ({
        baseY: ((index + 1) / (ribbonCount + 1)) * canvas.height,
        amplitude: 26 + Math.random() * 22,
        speed: 0.0022 + Math.random() * 0.0015,
        thickness: 50 + Math.random() * 36,
        hue: 318 + Math.random() * 34,
        alpha: 0.05 + Math.random() * 0.05,
        offset: Math.random() * Math.PI * 2,
      }))

      orbs = Array.from({ length: 6 }, (_, index) => ({
        radius: 90 + index * 28 + Math.random() * 24,
        angle: Math.random() * Math.PI * 2,
        speed: 0.0018 + Math.random() * 0.0015,
        orbitX: canvas.width * (0.35 + Math.random() * 0.3),
        orbitY: canvas.height * (0.24 + Math.random() * 0.34),
        size: 110 + Math.random() * 70,
        hue: 330 + Math.random() * 20,
        alpha: 0.035 + Math.random() * 0.03,
      }))
    }

    const drawBackdrop = () => {
      const background = ctx.createLinearGradient(0, 0, 0, canvas.height)
      background.addColorStop(0, "rgba(255, 255, 255, 0.98)")
      background.addColorStop(0.5, "rgba(248, 248, 248, 0.96)")
      background.addColorStop(1, "rgba(241, 241, 241, 0.98)")
      ctx.fillStyle = background
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const spotlight = ctx.createRadialGradient(
        canvas.width * 0.5,
        canvas.height * 0.22,
        0,
        canvas.width * 0.5,
        canvas.height * 0.22,
        canvas.width * 0.55
      )
      spotlight.addColorStop(0, "rgba(0, 0, 0, 0.045)")
      spotlight.addColorStop(0.4, "rgba(0, 0, 0, 0.03)")
      spotlight.addColorStop(0.7, "rgba(0, 0, 0, 0.015)")
      spotlight.addColorStop(1, "rgba(0, 0, 0, 0)")
      ctx.fillStyle = spotlight
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    const drawRibbons = () => {
      ribbons.forEach((ribbon) => {
        ctx.beginPath()

        for (let x = 0; x <= canvas.width + 20; x += 12) {
          const wave =
            Math.sin(x * 0.008 + frame * ribbon.speed + ribbon.offset) *
              ribbon.amplitude +
            Math.sin(x * 0.0032 - frame * ribbon.speed * 0.7) * 16
          const y = ribbon.baseY + wave

          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        ctx.strokeStyle = `rgba(0, 0, 0, ${ribbon.alpha})`
        ctx.lineWidth = ribbon.thickness
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
        ctx.filter = "blur(18px)"
        ctx.stroke()

        ctx.strokeStyle = `rgba(20, 20, 20, ${ribbon.alpha * 1.4})`
        ctx.lineWidth = Math.max(1, ribbon.thickness * 0.08)
        ctx.filter = "blur(0px)"
        ctx.stroke()
      })
    }

    const drawOrbs = () => {
      orbs.forEach((orb, index) => {
        orb.angle += orb.speed
        const x = orb.orbitX + Math.cos(orb.angle + index) * orb.radius
        const y =
          orb.orbitY +
          Math.sin(orb.angle * 1.12 + index * 0.6) * (orb.radius * 0.42)

        const glow = ctx.createRadialGradient(x, y, 0, x, y, orb.size)
        glow.addColorStop(0, `rgba(0, 0, 0, ${orb.alpha * 0.7})`)
        glow.addColorStop(0.3, `rgba(20, 20, 20, ${orb.alpha * 0.45})`)
        glow.addColorStop(1, "rgba(0, 0, 0, 0)")
        ctx.fillStyle = glow
        ctx.fillRect(x - orb.size, y - orb.size, orb.size * 2, orb.size * 2)
      })
    }

    const drawGrid = () => {
      ctx.save()
      ctx.strokeStyle = "rgba(0, 0, 0, 0.05)"
      ctx.lineWidth = 1

      for (let y = 0; y < canvas.height; y += 120) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      for (let x = 0; x < canvas.width; x += 160) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      ctx.restore()
    }

    const render = () => {
      frame += 1
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawBackdrop()
      drawGrid()
      drawOrbs()
      drawRibbons()
      ctx.filter = "none"
      animationId = window.requestAnimationFrame(render)
    }

    const handleResize = () => {
      resize()
      createScene()
    }

    handleResize()
    render()
    window.addEventListener("resize", handleResize)

    return () => {
      window.cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
      ctx.filter = "none"
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0.72 }}
    />
  )
}
