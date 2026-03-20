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
      }, 320)
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
    }, 260)

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
        className={`pointer-events-none fixed inset-0 z-[100] transition-opacity duration-150 ${
          phase === "idle" ? "opacity-0" : "opacity-100"
        }`}
      >
        <div
          className={`absolute inset-0 bg-[rgba(249,247,242,0.96)] transition-transform duration-300 ease-out ${
            phase === "cover" ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="absolute left-0 right-0 top-1/2 mx-auto h-px w-32 -translate-y-1/2 bg-border" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground sm:text-sm">
                Opening
              </p>
              <p className="mt-4 font-display text-3xl text-foreground sm:text-5xl">
                {destinationLabel}
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
    throw new Error("usePageTransition must be used within a PageTransitionProvider.")
  }

  return context
}
