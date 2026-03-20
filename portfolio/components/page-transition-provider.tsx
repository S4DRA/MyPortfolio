"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { usePathname, useRouter } from "next/navigation"
import { portfolioPages } from "@/lib/portfolio-pages"

type PageTransitionContextValue = {
  navigateWithTransition: (href: string) => void
  isTransitioning: boolean
}

type TransitionParticle = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

const transitionStars = [
  { top: "24%", left: "31%", size: "h-2 w-2", delay: "0ms", duration: "1.8s" },
  { top: "30%", left: "68%", size: "h-1.5 w-1.5", delay: "240ms", duration: "1.6s" },
  { top: "40%", left: "24%", size: "h-2.5 w-2.5", delay: "120ms", duration: "2s" },
  { top: "43%", left: "76%", size: "h-2 w-2", delay: "420ms", duration: "1.7s" },
  { top: "58%", left: "29%", size: "h-1.5 w-1.5", delay: "180ms", duration: "1.9s" },
  { top: "62%", left: "72%", size: "h-2.5 w-2.5", delay: "360ms", duration: "2.1s" },
  { top: "71%", left: "42%", size: "h-2 w-2", delay: "540ms", duration: "1.85s" },
  { top: "27%", left: "50%", size: "h-1.5 w-1.5", delay: "300ms", duration: "1.75s" },
] as const

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null)

export function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [phase, setPhase] = useState<"idle" | "cover" | "reveal">("idle")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [destinationHref, setDestinationHref] = useState<string | null>(null)
  const pendingPathRef = useRef<string | null>(null)
  const coverTimeoutRef = useRef<number | null>(null)
  const revealTimeoutRef = useRef<number | null>(null)
  const transitionCanvasRef = useRef<HTMLCanvasElement>(null)

  const clearTimers = useCallback(() => {
    if (coverTimeoutRef.current) {
      window.clearTimeout(coverTimeoutRef.current)
      coverTimeoutRef.current = null
    }
    if (revealTimeoutRef.current) {
      window.clearTimeout(revealTimeoutRef.current)
      revealTimeoutRef.current = null
    }
  }, [])

  const navigateWithTransition = useCallback(
    (href: string) => {
      if (isTransitioning || href === pathname) return

      clearTimers()
      pendingPathRef.current = href
      setDestinationHref(href)
      setIsTransitioning(true)
      setPhase("cover")

      coverTimeoutRef.current = window.setTimeout(() => {
        router.push(href)
      }, 560)
    },
    [clearTimers, isTransitioning, pathname, router]
  )

  useEffect(() => {
    if (!isTransitioning) return
    if (pendingPathRef.current !== pathname) return

    const frame = window.requestAnimationFrame(() => {
      setPhase("reveal")
    })

    revealTimeoutRef.current = window.setTimeout(() => {
      setIsTransitioning(false)
      setPhase("idle")
      pendingPathRef.current = null
      setDestinationHref(null)
    }, 460)

    return () => window.cancelAnimationFrame(frame)
  }, [isTransitioning, pathname])

  useEffect(() => clearTimers, [clearTimers])

  useEffect(() => {
    if (!isTransitioning) return

    const canvas = transitionCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId = 0
    let particles: TransitionParticle[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      const particleCount = Math.floor((canvas.width * canvas.height) / 22000)
      particles = []

      for (let i = 0; i < particleCount; i += 1) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          size: Math.random() * 2 + 0.45,
          opacity: Math.random() * 0.2 + 0.12,
        })
      }
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy)
        const tailLength = 10 + speed * 18
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

        for (let i = index + 1; i < particles.length; i += 1) {
          const otherParticle = particles[i]
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 110) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(2, 6, 23, ${0.05 * (1 - distance / 110)})`
            ctx.lineWidth = 0.4
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

    handleResize()
    drawParticles()
    window.addEventListener("resize", handleResize)

    return () => {
      window.cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }, [isTransitioning])

  const value = useMemo(
    () => ({ navigateWithTransition, isTransitioning }),
    [isTransitioning, navigateWithTransition]
  )

  const destinationLabel =
    portfolioPages.find((page) => page.href === destinationHref)?.title ??
    (destinationHref === "/" ? "Home" : "Portfolio")

  const isCover = phase === "cover"
  const isReveal = phase === "reveal"

  return (
    <PageTransitionContext.Provider value={value}>
      {children}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 z-[100] overflow-hidden transition-opacity duration-200 ${
          phase === "idle" ? "opacity-0" : "opacity-100"
        }`}
      >
        <div
          className={`absolute inset-0 bg-[rgba(249,247,242,0.68)] backdrop-blur-[2px] transition-opacity duration-300 ${
            isCover ? "opacity-100" : isReveal ? "opacity-0" : "opacity-0"
          }`}
        />

        <canvas
          ref={transitionCanvasRef}
          className={`absolute inset-0 transition-opacity duration-300 ${
            isCover ? "opacity-75" : isReveal ? "opacity-0" : "opacity-0"
          }`}
        />

        <div className="absolute inset-0">
          {transitionStars.map((star, index) => (
            <div
              key={`${star.left}-${star.top}`}
              className={`absolute transition-all duration-300 ${
                isCover ? "opacity-100" : isReveal ? "opacity-0" : "opacity-0"
              }`}
              style={{
                top: star.top,
                left: star.left,
                animationDelay: star.delay,
              }}
            >
              <div
                className={`${star.size} animate-pulse rounded-full bg-foreground/75 shadow-[0_0_12px_rgba(15,23,42,0.14)]`}
                style={{ animationDuration: star.duration }}
              />
              <div
                className="absolute left-1/2 top-1/2 h-6 w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-foreground/25 to-transparent"
                style={{ transform: `translate(-50%, -50%) rotate(${index * 24}deg)` }}
              />
              <div
                className="absolute left-1/2 top-1/2 h-px w-6 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-foreground/25 to-transparent"
                style={{ transform: `translate(-50%, -50%) rotate(${index * 24}deg)` }}
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <div
            className={`absolute h-[20rem] w-[20rem] rounded-full border border-foreground/10 bg-[radial-gradient(circle,rgba(255,255,255,0.98)_0%,rgba(245,241,233,0.96)_58%,rgba(234,229,220,0.84)_100%)] shadow-[0_30px_120px_rgba(15,23,42,0.12)] transition-all duration-[700ms] ease-[cubic-bezier(0.19,1,0.22,1)] sm:h-[28rem] sm:w-[28rem] ${
              isCover
                ? "scale-[6.5] opacity-100"
                : isReveal
                  ? "scale-[7.2] opacity-0"
                  : "scale-0 opacity-0"
            }`}
          />

          <div
            className={`absolute h-56 w-56 rounded-full border border-foreground/12 transition-all duration-[760ms] ease-[cubic-bezier(0.19,1,0.22,1)] sm:h-72 sm:w-72 ${
              isCover
                ? "scale-[4.8] opacity-100"
                : isReveal
                  ? "scale-[5.4] opacity-0"
                  : "scale-50 opacity-0"
            }`}
          />

          <div
            className={`absolute h-72 w-72 rounded-full border border-foreground/8 transition-all duration-[900ms] ease-out sm:h-[24rem] sm:w-[24rem] ${
              isCover
                ? "scale-[3.8] opacity-100"
                : isReveal
                  ? "scale-[4.4] opacity-0"
                  : "scale-75 opacity-0"
            }`}
          />

          <div
            className={`absolute h-px w-32 bg-foreground/20 transition-all duration-500 ease-out sm:w-40 ${
              isCover
                ? "scale-x-100 opacity-100"
                : isReveal
                  ? "scale-x-125 opacity-0"
                  : "scale-x-0 opacity-0"
            }`}
          />

          <div
            className={`relative text-center transition-all duration-[420ms] ease-out ${
              isCover
                ? "translate-y-0 scale-100 opacity-100"
                : isReveal
                  ? "translate-y-2 scale-95 opacity-0"
                  : "translate-y-6 scale-90 opacity-0"
            }`}
          >
            <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground sm:text-xs">
              Opening
            </p>
            <p className="mt-4 font-display text-3xl text-foreground sm:text-5xl">
              {destinationLabel}
            </p>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Preparing the next page
            </p>
          </div>
        </div>
      </div>
    </PageTransitionContext.Provider>
  )
}

export function usePageTransition() {
  const context = useContext(PageTransitionContext)

  if (!context) {
    throw new Error("usePageTransition must be used within a PageTransitionProvider.")
  }

  return context
}
