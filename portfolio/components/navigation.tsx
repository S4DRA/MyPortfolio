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
  { label: "Projects", href: "/#projects", section: "projects" },
  { label: "Contact", href: "/#contact", section: "contact" },
  ...portfolioPages.map((page) => ({
    label: page.title,
    href: page.href,
  })),
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

      const sections = navItems
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
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-6">
          <Link
            href="/"
            className="font-display text-2xl font-semibold tracking-tight text-foreground"
          >
            Sadra Ahadiyan
          </Link>

          <ul className="hidden xl:flex items-center gap-5 2xl:gap-6">
            {navItems.map((item) => (
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
        className="rounded-md border border-border p-2 text-foreground"
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
        <div className="absolute left-0 right-0 top-full border-b border-border bg-background shadow-sm">
          <ul className="flex flex-col gap-4 p-6">
            {navItems.map((item) => (
              <li key={item.href}>
                {item.section ? (
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-base transition-colors",
                      pathname === item.href || (pathname === "/" && item.section === activeSection)
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <AnimatedPageLink
                    href={item.href}
                    className={cn(
                      "text-base transition-colors",
                      pathname === item.href || (pathname === "/" && item.section === activeSection)
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.label}
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
