"use client"

import { useEffect, useRef } from "react"

type WaveLine = {
  baseY: number
  amplitude: number
  wavelength: number
  speed: number
  thickness: number
  alpha: number
  phase: number
  color: string
}

type Ripple = {
  x: number
  y: number
  radius: number
  life: number
  maxLife: number
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId = 0
    let waves: WaveLine[] = []
    let ripples: Ripple[] = []
    let frame = 0

    const pointer = {
      x: 0,
      y: 0,
      active: false,
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createScene = () => {
      const lineCount = Math.max(7, Math.floor(canvas.height / 110))
      const colors = [
        "79, 96, 145",
        "103, 126, 182",
        "162, 128, 177",
        "194, 146, 108",
      ]

      waves = Array.from({ length: lineCount }, (_, index) => ({
        baseY: ((index + 1) / (lineCount + 1)) * canvas.height,
        amplitude: 20 + Math.random() * 34,
        wavelength: 180 + Math.random() * 260,
        speed: 0.35 + Math.random() * 0.65,
        thickness: 1.2 + Math.random() * 3.6,
        alpha: 0.08 + Math.random() * 0.1,
        phase: Math.random() * Math.PI * 2,
        color: colors[index % colors.length],
      }))
    }

    const pushRipple = (x: number, y: number) => {
      ripples.push({
        x,
        y,
        radius: 0,
        life: 0,
        maxLife: 80,
      })

      if (ripples.length > 6) {
        ripples = ripples.slice(-6)
      }
    }

    const handlePointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
      pointer.active = true
    }

    const handlePointerLeave = () => {
      pointer.active = false
    }

    const handlePointerDown = (event: PointerEvent) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
      pointer.active = true
      pushRipple(event.clientX, event.clientY)
    }

    const drawBackdrop = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "rgba(255, 252, 247, 0.98)")
      gradient.addColorStop(0.5, "rgba(248, 244, 237, 0.98)")
      gradient.addColorStop(1, "rgba(243, 238, 231, 0.99)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    const drawAmbientGlow = () => {
      const glowA = ctx.createRadialGradient(
        canvas.width * 0.24,
        canvas.height * 0.18,
        0,
        canvas.width * 0.24,
        canvas.height * 0.18,
        canvas.width * 0.28
      )
      glowA.addColorStop(0, "rgba(125, 146, 212, 0.08)")
      glowA.addColorStop(1, "rgba(125, 146, 212, 0)")
      ctx.fillStyle = glowA
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const glowB = ctx.createRadialGradient(
        canvas.width * 0.78,
        canvas.height * 0.74,
        0,
        canvas.width * 0.78,
        canvas.height * 0.74,
        canvas.width * 0.26
      )
      glowB.addColorStop(0, "rgba(196, 147, 108, 0.07)")
      glowB.addColorStop(1, "rgba(196, 147, 108, 0)")
      ctx.fillStyle = glowB
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    const getRippleDistortion = (x: number, y: number) => {
      let offsetY = 0

      ripples.forEach((ripple) => {
        const dx = x - ripple.x
        const dy = y - ripple.y
        const distance = Math.hypot(dx, dy)
        const band = Math.abs(distance - ripple.radius)

        if (band < 54) {
          const wave = (1 - band / 54) * 26 * (1 - ripple.life / ripple.maxLife)
          offsetY += Math.sin((distance - ripple.radius) * 0.06) * wave
        }
      })

      return offsetY
    }

    const drawWave = (wave: WaveLine, index: number) => {
      ctx.beginPath()

      for (let x = -40; x <= canvas.width + 40; x += 8) {
        const travel = x + frame * wave.speed * -1.8
        const primary =
          Math.sin(travel / wave.wavelength + wave.phase) * wave.amplitude
        const secondary =
          Math.cos(travel / (wave.wavelength * 0.52) + wave.phase * 0.8) *
          wave.amplitude *
          0.28
        const tertiary =
          Math.sin(travel / (wave.wavelength * 1.9) - wave.phase * 0.6 + frame * 0.01) *
          12

        let y = wave.baseY + primary + secondary + tertiary

        if (pointer.active) {
          const dx = x - pointer.x
          const dy = y - pointer.y
          const distance = Math.hypot(dx, dy)
          const influence = 190

          if (distance < influence) {
            y += (1 - distance / influence) * 42 * Math.sign(dy || 1)
          }
        }

        y += getRippleDistortion(x, y)

        if (x <= -40) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.strokeStyle = `rgba(${wave.color}, ${wave.alpha})`
      ctx.lineWidth = wave.thickness
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      ctx.shadowBlur = 18
      ctx.shadowColor = `rgba(${wave.color}, ${wave.alpha * 0.22})`
      ctx.stroke()

      ctx.beginPath()
      for (let x = -40; x <= canvas.width + 40; x += 16) {
        const travel = x + frame * wave.speed * -1.8
        const primary =
          Math.sin(travel / wave.wavelength + wave.phase) * wave.amplitude
        const secondary =
          Math.cos(travel / (wave.wavelength * 0.52) + wave.phase * 0.8) *
          wave.amplitude *
          0.28
        const tertiary =
          Math.sin(travel / (wave.wavelength * 1.9) - wave.phase * 0.6 + frame * 0.01) *
          12
        let y = wave.baseY + primary + secondary + tertiary

        if (pointer.active) {
          const dx = x - pointer.x
          const dy = y - pointer.y
          const distance = Math.hypot(dx, dy)
          const influence = 190

          if (distance < influence) {
            y += (1 - distance / influence) * 42 * Math.sign(dy || 1)
          }
        }

        y += getRippleDistortion(x, y)
        ctx.moveTo(x, y)
        ctx.arc(x, y, 0.8 + (index % 3) * 0.25, 0, Math.PI * 2)
      }

      ctx.fillStyle = `rgba(${wave.color}, ${Math.min(wave.alpha * 1.65, 0.22)})`
      ctx.fill()
      ctx.shadowBlur = 0
    }

    const drawRipples = () => {
      ctx.save()
      ripples = ripples.filter((ripple) => ripple.life < ripple.maxLife)

      ripples.forEach((ripple) => {
        ripple.life += 1
        ripple.radius += 7
        const alpha = (1 - ripple.life / ripple.maxLife) * 0.16

        ctx.beginPath()
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(115, 138, 196, ${alpha})`
        ctx.lineWidth = 1.1
        ctx.stroke()
      })

      ctx.restore()
    }

    const render = () => {
      frame += 1
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawBackdrop()
      drawAmbientGlow()
      waves.forEach((wave, index) => drawWave(wave, index))
      drawRipples()
      animationId = window.requestAnimationFrame(render)
    }

    const handleResize = () => {
      resize()
      createScene()
    }

    handleResize()
    render()
    window.addEventListener("resize", handleResize)
    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerdown", handlePointerDown)
    document.addEventListener("pointerleave", handlePointerLeave)

    return () => {
      window.cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerdown", handlePointerDown)
      document.removeEventListener("pointerleave", handlePointerLeave)
      ctx.shadowBlur = 0
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0.76 }}
    />
  )
}
