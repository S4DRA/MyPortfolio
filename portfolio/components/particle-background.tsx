"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId = 0
    let particles: Particle[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      const particleCount = Math.floor((canvas.width * canvas.height) / 12000)
      particles = []

      for (let i = 0; i < particleCount; i += 1) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.26,
          vy: (Math.random() - 0.5) * 0.26,
          size: Math.random() * 2.1 + 0.55,
          opacity: Math.random() * 0.28 + 0.18,
        })
      }
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        const previousX = particle.x
        const previousY = particle.y

        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy)
        const tailLength = 14 + speed * 22
        const angle = Math.atan2(particle.vy, particle.vx)
        const tailX = particle.x - Math.cos(angle) * tailLength
        const tailY = particle.y - Math.sin(angle) * tailLength

        const trail = ctx.createLinearGradient(particle.x, particle.y, tailX, tailY)
        trail.addColorStop(0, `rgba(2, 6, 23, ${particle.opacity * 0.55})`)
        trail.addColorStop(1, "rgba(2, 6, 23, 0)")

        ctx.beginPath()
        ctx.moveTo(particle.x, particle.y)
        ctx.lineTo(tailX, tailY)
        ctx.strokeStyle = trail
        ctx.lineWidth = particle.size * 0.7
        ctx.lineCap = "round"
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(2, 6, 23, ${particle.opacity})`
        ctx.fill()

        const wrappedAcrossEdge =
          Math.abs(previousX - particle.x) > canvas.width * 0.5 ||
          Math.abs(previousY - particle.y) > canvas.height * 0.5

        if (wrappedAcrossEdge) {
          return
        }

        for (let i = index + 1; i < particles.length; i += 1) {
          const otherParticle = particles[i]
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(2, 6, 23, ${0.07 * (1 - distance / 120)})`
            ctx.lineWidth = 0.45
            ctx.stroke()
          }
        }
      })

      animationId = window.requestAnimationFrame(drawParticles)
    }

    const handleResize = () => {
      resize()
      createParticles()
    }

    resize()
    createParticles()
    drawParticles()

    window.addEventListener("resize", handleResize)

    return () => {
      window.cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0.48 }}
    />
  )
}
