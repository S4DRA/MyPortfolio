"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BriefcaseBusiness, Home, Mail, UserRound } from "lucide-react"
import { AnimatedPageLink } from "@/components/animated-page-link"
import { cn } from "@/lib/utils"
import { portfolioPages } from "@/lib/portfolio-pages"

type NavItem = {
  label: string
  href: string
  section?: string
}

const navItems: NavItem[] = [
  { label: "Work", href: "/#projects", section: "projects" },
  { label: "Experience", href: "/#experience", section: "experience" },
  { label: "About", href: "/#about", section: "about" },
  { label: "Contact", href: "/#contact", section: "contact" },
  ...portfolioPages.map((page) => ({
    label: page.title,
    href: page.href,
  })),
]

const desktopNavItems: NavItem[] = [
  { label: "Work", href: "/#projects", section: "projects" },
  { label: "Experience", href: "/#experience", section: "experience" },
  { label: "About", href: "/#about", section: "about" },
  { label: "Contact", href: "/#contact", section: "contact" },
]

const mobileBottomItems = [
  { label: "Home", href: "/#hero", section: "hero", icon: Home },
  { label: "Work", href: "/#projects", section: "projects", icon: BriefcaseBusiness },
  { label: "About", href: "/#about", section: "about", icon: UserRound },
  { label: "Contact", href: "/#contact", section: "contact", icon: Mail },
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
    <>
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
              className="max-w-[11.5rem] text-pretty font-display text-[1.05rem] font-semibold leading-tight tracking-tight text-foreground sm:max-w-none sm:text-xl"
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

      <div className="portfolio-bottom-nav fixed inset-x-3 bottom-3 z-50 xl:hidden">
        <div className="mx-auto grid max-w-md grid-cols-4 gap-1 rounded-[1.35rem] border border-border/80 bg-background/92 p-1.5 shadow-[0_18px_50px_rgba(0,0,0,0.42)] backdrop-blur-xl">
          {mobileBottomItems.map((item) => {
            const Icon = item.icon
            const active = pathname === "/" && activeSection === item.section

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex min-h-14 flex-col items-center justify-center gap-1 rounded-[1rem] text-[0.68rem] font-medium transition-colors",
                  active
                    ? "bg-primary/14 text-foreground"
                    : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            )
          })}
      </div>
      </div>
    </>
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
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/85 text-foreground shadow-sm backdrop-blur transition-all hover:border-primary/25 hover:bg-secondary"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
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
        <div className="fixed inset-x-3 top-[4.75rem] z-50 overflow-hidden rounded-[1.45rem] border border-border/90 bg-background/96 shadow-[0_24px_70px_rgba(0,0,0,0.42)] backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-border/70 px-5 py-4">
            <div>
                <p className="text-[0.66rem] uppercase tracking-[0.24em] text-muted-foreground">
                  Portfolio Menu
                </p>
              <p className="mt-1 text-sm text-foreground/85">Jump to the main sections.</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/80 text-foreground"
              aria-label="Close menu"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <ul data-lenis-prevent className="no-scrollbar flex max-h-[calc(100vh-8.5rem)] flex-col gap-2 overflow-y-auto p-3 pb-5">
            {navItems.map((item, index) => {
              const active = pathname === item.href || (pathname === "/" && item.section === activeSection)
              const itemClassName = cn(
                "flex min-h-14 items-center justify-between rounded-2xl border px-4 py-3 text-base transition-all",
                active
                  ? "border-primary/30 bg-primary/12 text-foreground"
                  : "border-border/70 bg-card/60 text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
              )

              return (
                <li key={item.href}>
                  {item.section ? (
                    <Link href={item.href} onClick={() => setIsOpen(false)} className={itemClassName}>
                      <span>{item.label}</span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  ) : (
                    <Link href={item.href} onClick={() => setIsOpen(false)} className={itemClassName}>
                      <span>{item.label}</span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
