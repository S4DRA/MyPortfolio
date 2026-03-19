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
      setScrolled(window.scrollY > 50)

      if (!isHomePage) return

      const sections = navItems
        .map((item) => item.section)
        .filter((section): section is string => Boolean(section))

      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold text-foreground tracking-tight hover:text-primary transition-colors"
          >
            SA
          </Link>
          <ul className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                {item.section ? (
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-all duration-200 hover:text-primary",
                      isActive(item) ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <AnimatedPageLink
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-all duration-200 hover:text-primary",
                      isActive(item) ? "text-primary" : "text-muted-foreground"
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
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-foreground p-2"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border">
          <ul className="flex flex-col p-6 gap-4">
            {navItems.map((item) => (
              <li key={item.href}>
                {item.section ? (
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-lg font-medium transition-colors",
                      pathname === item.href ||
                        (pathname === "/" && item.section === activeSection)
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                    )}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <AnimatedPageLink
                    href={item.href}
                    className={cn(
                      "text-lg font-medium transition-colors",
                      pathname === item.href ||
                        (pathname === "/" && item.section === activeSection)
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                    )}
                  >
                    {item.label}
                  </AnimatedPageLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
