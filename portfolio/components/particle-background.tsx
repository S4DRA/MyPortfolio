"use client"

import { useEffect, useRef } from "react"
import { useReducedMotion } from "@/hooks/use-experience"
import { cappedDpr, subscribeFrame } from "@/lib/animation/frame"

type CloudBand = {
  y: number
  height: number
  speed: number
  offset: number
  alpha: number
}

type LightningBolt = {
  points: { x: number; y: number }[]
  branches: { x: number; y: number }[][]
  life: number
  maxLife: number
  width: number
  color: string
}

const drawPartialPath = (
  ctx: CanvasRenderingContext2D,
  points: { x: number; y: number }[],
  progress: number
) => {
  if (points.length < 2 || progress <= 0) return

  const lengths = points.slice(1).map((point, index) => {
    const previous = points[index]
    return Math.hypot(point.x - previous.x, point.y - previous.y)
  })
  const totalLength = lengths.reduce((sum, length) => sum + length, 0)
  let remaining = totalLength * Math.min(progress, 1)

  ctx.beginPath()
  ctx.moveTo(points[0].x, points[0].y)

  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1]
    const point = points[index]
    const length = lengths[index - 1]

    if (remaining >= length) {
      ctx.lineTo(point.x, point.y)
      remaining -= length
      continue
    }

    const segmentProgress = length === 0 ? 0 : remaining / length
    ctx.lineTo(
      previous.x + (point.x - previous.x) * segmentProgress,
      previous.y + (point.y - previous.y) * segmentProgress
    )
    break
  }
}

export function ParticleBackground() {
  const reducedMotion = useReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const pendingStrikes = new Set<number>()
    const scheduleStrike = (delay: number) => {
      const timer = window.setTimeout(() => {
        pendingStrikes.delete(timer)
        if (!document.hidden) createBolt()
      }, delay)
      pendingStrikes.add(timer)
    }
    let frame = 0
    let clouds: CloudBand[] = []
    let bolts: LightningBolt[] = []
    let nextStrike = 18

    const resize = () => {
      const dpr = cappedDpr()
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const createScene = () => {
      const viewWidth = window.innerWidth
      const viewHeight = window.innerHeight

      clouds = Array.from({ length: 7 }, (_, index) => ({
        y: (index / 6) * viewHeight - viewHeight * 0.12,
        height: 90 + Math.random() * 130,
        speed: 0.18 + Math.random() * 0.42,
        offset: Math.random() * viewWidth,
        alpha: 0.07 + Math.random() * 0.1,
      }))

      bolts = []
      nextStrike = 38 + Math.floor(Math.random() * 54)
    }

    const createBolt = () => {
      const viewWidth = window.innerWidth
      const viewHeight = window.innerHeight

      const origins = [
        {
          x: Math.random() * viewWidth,
          y: -30,
          angle: Math.PI / 2 + (Math.random() - 0.5) * 1.1,
        },
        {
          x: Math.random() * viewWidth,
          y: viewHeight + 30,
          angle: -Math.PI / 2 + (Math.random() - 0.5) * 1.1,
        },
        {
          x: -30,
          y: Math.random() * viewHeight,
          angle: (Math.random() - 0.5) * 0.9,
        },
        {
          x: viewWidth + 30,
          y: Math.random() * viewHeight,
          angle: Math.PI + (Math.random() - 0.5) * 0.9,
        },
        {
          x: viewWidth * (0.32 + Math.random() * 0.36),
          y: viewHeight * (0.24 + Math.random() * 0.48),
          angle: Math.random() * Math.PI * 2,
        },
      ]

      const origin = origins[Math.floor(Math.random() * origins.length)]
      const length = 160 + Math.random() * Math.min(viewWidth, viewHeight) * 1
      const segments = 7 + Math.floor(Math.random() * 12)
      const step = length / segments
      const jagAmount = 12 + Math.random() * 34
      const colorOptions = [
        "103, 232, 249",
        "45, 212, 191",
        "147, 197, 253",
      ]
      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)]
      const points = Array.from({ length: segments }, (_, index) => {
        const distance = index * step
        const bend = Math.sin(index * 1.7 + frame * 0.03) * jagAmount * 0.35
        const jag = index === 0 ? 0 : (Math.random() - 0.5) * jagAmount
        const angle = origin.angle + (Math.random() - 0.5) * 0.22
        const normal = angle + Math.PI / 2

        return {
          x: origin.x + Math.cos(angle) * distance + Math.cos(normal) * (jag + bend),
          y: origin.y + Math.sin(angle) * distance + Math.sin(normal) * (jag + bend),
        }
      })

      const branches = points
        .slice(1, -1)
        .filter(() => Math.random() > 0.55)
        .map((point) => {
          const branchAngle = origin.angle + (Math.random() > 0.5 ? 1 : -1) * (0.7 + Math.random() * 0.9)
          const branchLength = 28 + Math.random() * 105
          const branchSegments = 2 + Math.floor(Math.random() * 4)

        return Array.from({ length: branchSegments }, (_, index) => {
          const distance = (index / Math.max(branchSegments - 1, 1)) * branchLength
          const jag = index === 0 ? 0 : (Math.random() - 0.5) * 16

          return {
            x: point.x + Math.cos(branchAngle) * distance + jag,
              y: point.y + Math.sin(branchAngle) * distance + jag * 0.45,
            }
          })
        })

      bolts.push({
        points,
        branches,
        life: 0,
        maxLife: 150 + Math.floor(Math.random() * 80),
        width: 0.7 + Math.random() * 1.35,
        color,
      })

      if (bolts.length > 18) {
        bolts = bolts.slice(-18)
      }
    }

    const drawBackdrop = () => {
      const viewWidth = window.innerWidth
      const viewHeight = window.innerHeight
      const gradient = ctx.createLinearGradient(0, 0, 0, viewHeight)
      gradient.addColorStop(0, "rgba(6, 9, 18, 0.98)")
      gradient.addColorStop(0.5, "rgba(12, 18, 32, 0.98)")
      gradient.addColorStop(1, "rgba(18, 24, 34, 0.99)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, viewWidth, viewHeight)

      ctx.strokeStyle = "rgba(125, 211, 252, 0.035)"
      ctx.lineWidth = 1
      const gridSize = 72
      for (let x = (frame * 0.18) % gridSize; x < viewWidth; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, viewHeight)
        ctx.stroke()
      }
      for (let y = (frame * 0.12) % gridSize; y < viewHeight; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(viewWidth, y)
        ctx.stroke()
      }
    }

    const drawClouds = () => {
      const viewWidth = window.innerWidth
      const viewHeight = window.innerHeight

      clouds.forEach((cloud, index) => {
        cloud.offset = (cloud.offset + cloud.speed) % (viewWidth * 2)
        const x = cloud.offset - viewWidth
        const y = cloud.y + Math.sin(frame * 0.006 + index) * 16
        const gradient = ctx.createLinearGradient(0, y, 0, y + cloud.height)

        gradient.addColorStop(0, `rgba(34, 49, 82, ${cloud.alpha * 0.35})`)
        gradient.addColorStop(0.5, `rgba(44, 65, 104, ${cloud.alpha})`)
        gradient.addColorStop(1, "rgba(8, 12, 22, 0)")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.ellipse(x, y, viewWidth * 0.78, cloud.height, 0.06, 0, Math.PI * 2)
        ctx.ellipse(x + viewWidth * 0.58, y + 18, viewWidth * 0.7, cloud.height * 0.82, -0.04, 0, Math.PI * 2)
        ctx.fill()
      })

      const horizonGlow = ctx.createRadialGradient(
        viewWidth * 0.72,
        viewHeight * 0.22,
        0,
        viewWidth * 0.72,
        viewHeight * 0.22,
        viewWidth * 0.42
      )
      horizonGlow.addColorStop(0, "rgba(59, 130, 246, 0.16)")
      horizonGlow.addColorStop(0.48, "rgba(20, 184, 166, 0.07)")
      horizonGlow.addColorStop(1, "rgba(20, 184, 166, 0)")
      ctx.fillStyle = horizonGlow
      ctx.fillRect(0, 0, viewWidth, viewHeight)
    }

    const drawLightning = () => {
      bolts = bolts.filter((bolt) => bolt.life < bolt.maxLife)

      bolts.forEach((bolt) => {
        bolt.life += 1
        const progress = bolt.life / bolt.maxLife
        const drawProgress = Math.min(1, progress / 0.76)
        const holdFade = progress < 0.86 ? 1 : 1 - (progress - 0.86) / 0.14
        const alpha = Math.max(0, holdFade)

        ctx.save()
        ctx.lineCap = "square"
        ctx.lineJoin = "miter"
        ctx.miterLimit = 3

        drawPartialPath(ctx, bolt.points, drawProgress)
        ctx.strokeStyle = `rgba(${bolt.color}, ${alpha * 0.78})`
        ctx.lineWidth = bolt.width
        ctx.stroke()

        drawPartialPath(ctx, bolt.points, drawProgress)
        ctx.strokeStyle = `rgba(226, 244, 255, ${alpha * 0.42})`
        ctx.lineWidth = Math.max(0.45, bolt.width * 0.38)
        ctx.stroke()

        bolt.branches.forEach((branch) => {
          const branchProgress = Math.max(0, (drawProgress - 0.32) / 0.68)
          drawPartialPath(ctx, branch, branchProgress)
          ctx.strokeStyle = `rgba(${bolt.color}, ${alpha * 0.45})`
          ctx.lineWidth = Math.max(0.45, bolt.width * 0.42)
          ctx.stroke()
        })

        ctx.restore()
      })
    }

    const render = () => {
      // React can detach a route before its passive-effect cleanup runs.
      if (!canvas.isConnected) return
      frame += 1
      nextStrike -= 1

      if (nextStrike <= 0) {
        createBolt()
        if (Math.random() > 0.52) scheduleStrike(140 + Math.random() * 160)
        if (Math.random() > 0.76) scheduleStrike(260 + Math.random() * 180)
        nextStrike = 56 + Math.floor(Math.random() * 104)
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawBackdrop()
      drawClouds()
      drawLightning()
    }

    const handleResize = () => {
      resize()
      createScene()
      render()
    }

    handleResize()
    const unsubscribe = reducedMotion ? undefined : subscribeFrame(render)
    window.addEventListener("resize", handleResize)

    return () => {
      unsubscribe?.()
      pendingStrikes.forEach(timer => window.clearTimeout(timer))
      window.removeEventListener("resize", handleResize)
      ctx.shadowBlur = 0
    }
  }, [reducedMotion])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-background-motion={reducedMotion ? "static" : "animated"}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0.72 }}
    />
  )
}
