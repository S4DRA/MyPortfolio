"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatedPageLink } from "@/components/animated-page-link"
import { cn } from "@/lib/utils"
import { portfolioPages } from "@/lib/portfolio-pages"

type NavItem = {
  label: string
  href: string
  section?: string
}

const navItems: NavItem[] = [
  { label: "Home", href: "/", section: "hero" },
  ...portfolioPages.map((page) => ({
    label: page.title,
    href: page.href,
  })),
  { label: "Projects", href: "/#projects", section: "projects" },
  { label: "Contact", href: "/#contact", section: "contact" },
]

const desktopNavItems: NavItem[] = [
  { label: "Home", href: "/", section: "hero" },
  { label: "About", href: "/#about", section: "about" },
  { label: "Projects", href: "/#projects", section: "projects" },
  { label: "Contact", href: "/#contact", section: "contact" },
  { label: "Work Experience", href: "/work-experience" },
  { label: "About Me", href: "/about-me" },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24)

      if (!isHomePage) return

      const sections = desktopNavItems
        .map((item) => item.section)
        .filter((section): section is string => Boolean(section))

      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (!element) return false

        const rect = element.getBoundingClientRect()
        return rect.top <= 120 && rect.bottom >= 120
      })

      if (currentSection) setActiveSection(currentSection)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isHomePage])

  const isActive = (item: NavItem) => {
    if (item.href === pathname) return true
    if (isHomePage && item.section) return activeSection === item.section
    return false
  }

  return (
    <nav
      className={cn(
        "fixed left-0 right-0 top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-border bg-background/95 shadow-sm backdrop-blur"
          : "border-transparent bg-background/72 backdrop-blur"
      )}
    >
      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          <Link
            href="/"
            className="max-w-[11.5rem] text-pretty font-display text-[1.15rem] font-semibold leading-tight tracking-tight text-foreground sm:max-w-none sm:text-2xl"
          >
            Sadra Ahadiyan
          </Link>

          <ul className="hidden xl:flex items-center gap-5 2xl:gap-6">
            {desktopNavItems.map((item) => (
              <li key={item.href}>
                {item.section ? (
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm transition-colors duration-200",
                      isActive(item) ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <AnimatedPageLink
                    href={item.href}
                    className={cn(
                      "text-sm transition-colors duration-200",
                      isActive(item) ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </AnimatedPageLink>
                )}
              </li>
            ))}
          </ul>

          <div className="hidden xl:flex items-center gap-3">
            <AnimatedPageLink
              href="/programming-projects"
              className="rounded-full border border-border bg-card/80 px-4 py-2 text-sm text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/25 hover:bg-secondary"
            >
              More Work
            </AnimatedPageLink>
          </div>

          <MobileMenu activeSection={activeSection} pathname={pathname} />
        </div>
      </div>
    </nav>
  )
}

function MobileMenu({
  activeSection,
  pathname,
}: {
  activeSection: string
  pathname: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="xl:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card/85 text-foreground shadow-sm backdrop-blur transition-all hover:border-primary/25 hover:bg-secondary"
        aria-label="Toggle menu"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      {isOpen ? (
        <div className="absolute left-3 right-3 top-[calc(100%+0.5rem)] overflow-hidden rounded-[1.4rem] border border-border bg-background/95 shadow-[0_18px_45px_rgba(18,25,38,0.12)] backdrop-blur">
          <div className="border-b border-border/70 px-5 py-4">
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
              Navigate the portfolio
            </p>
          </div>
          <ul className="flex max-h-[70vh] flex-col gap-2 overflow-y-auto p-3">
            {navItems.map((item) => (
              <li key={item.href}>
                {item.section ? (
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-4 py-3 text-base transition-all",
                      pathname === item.href || (pathname === "/" && item.section === activeSection)
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:bg-secondary/55 hover:text-foreground"
                    )}
                  >
                    {item.label}
                    <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Open</span>
                  </Link>
                ) : (
                  <AnimatedPageLink
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-4 py-3 text-base transition-all",
                      pathname === item.href || (pathname === "/" && item.section === activeSection)
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:bg-secondary/55 hover:text-foreground"
                    )}
                  >
                    {item.label}
                    <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Open</span>
                  </AnimatedPageLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
