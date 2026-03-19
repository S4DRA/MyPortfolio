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

const PageTransitionContext = createContext<PageTransitionContextValue | null>(
  null
)

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
      }, 780)
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
      setPhase("idle")
      setIsTransitioning(false)
      pendingPathRef.current = null
      setDestinationHref(null)
    }, 520)

    return () => window.cancelAnimationFrame(frame)
  }, [isTransitioning, pathname])

  useEffect(() => clearTimers, [clearTimers])

  const value = useMemo(
    () => ({ navigateWithTransition, isTransitioning }),
    [isTransitioning, navigateWithTransition]
  )

  const destinationLabel =
    portfolioPages.find((page) => page.href === destinationHref)?.title ??
    (destinationHref === "/" ? "Home" : "Portfolio")

  return (
    <PageTransitionContext.Provider value={value}>
      {children}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 z-[100] overflow-hidden transition-opacity duration-150 ${
          phase === "idle" ? "opacity-0" : "opacity-100"
        }`}
      >
        <div
          className={`absolute inset-0 bg-background/30 backdrop-blur-2xl transition-all duration-[620ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
            phase === "cover"
              ? "translate-y-0 scale-100"
              : "-translate-y-full scale-[1.02]"
          }`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(100,200,220,0.32),transparent_40%),radial-gradient(circle_at_bottom,rgba(125,160,255,0.12),transparent_35%),linear-gradient(180deg,rgba(6,12,25,0.98),rgba(6,12,25,0.92))]" />
          <div
            className={`absolute inset-x-0 top-1/2 mx-auto h-px bg-primary shadow-[0_0_25px_rgba(100,200,220,0.75)] transition-[width,opacity] duration-700 ease-out ${
              phase === "cover" ? "w-full opacity-100" : "w-0 opacity-0"
            }`}
          />
          <div
            className={`absolute inset-x-0 top-1/2 mx-auto h-48 w-48 -translate-y-1/2 rounded-full bg-primary/12 blur-3xl transition-all duration-[620ms] ${
              phase === "cover" ? "scale-125 opacity-100" : "scale-90 opacity-0"
            }`}
          />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,rgba(255,255,255,0.03)_35%,transparent_70%)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`text-center transition-all duration-[620ms] ${
                phase === "cover"
                  ? "translate-y-0 scale-100 opacity-100"
                  : "-translate-y-8 scale-96 opacity-0"
              }`}
            >
              <p className="text-xs uppercase tracking-[0.6em] text-primary/80 sm:text-sm">
                Entering
              </p>
              <p className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
                {destinationLabel}
              </p>
              <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                Preparing the next scene...
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageTransitionContext.Provider>
  )
}

export function usePageTransition() {
  const context = useContext(PageTransitionContext)

  if (!context) {
    throw new Error(
      "usePageTransition must be used within a PageTransitionProvider."
    )
  }

  return context
}
