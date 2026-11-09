"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { portfolioPages } from "@/lib/portfolio-pages"

const primaryLinks = [
  { label: "Work", href: "/#projects", number: "01" },
  { label: "About", href: "/#about", number: "02" },
  { label: "Experience", href: "/#experience", number: "03" },
  { label: "Contact", href: "/#contact", number: "04" },
]

export function Navigation() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 18)
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  useEffect(() => {
    if (!open) return
    const oldOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = oldOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  return (
    <>
      <a className="atelier-skip" href="#hero">Skip to main content</a>
      <header className={`atelier-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="atelier-header-inner">
          <Link className="atelier-brand" href="/" onClick={() => setOpen(false)} aria-label="Sadra Ahadiyan — home">
            <span className="atelier-brand-symbol" aria-hidden="true">S<span>✳</span></span>
            <span className="atelier-brand-type">SADRA <span>AHADIYAN</span><small>DESIGN × ENGINEERING</small></span>
          </Link>
          <nav className="atelier-desktop-nav" aria-label="Primary navigation">
            {primaryLinks.map(link => (
              <Link key={link.href} href={link.href}>
                <span>{link.number}</span>{link.label}
              </Link>
            ))}
          </nav>
          <div className="atelier-header-actions">
            <a className="atelier-nav-contact" href="mailto:sadra.ahadiyan@bahcesehir.edu.tr">
              Let's talk <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
            </a>
            <button className="atelier-menu-button" type="button" onClick={() => setOpen(value => !value)}
              aria-controls="atelier-mobile-menu" aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}>
              {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
        <div className="atelier-reading-progress" aria-hidden="true" />
      </header>
      <div id="atelier-mobile-menu" className={`atelier-mobile-menu ${open ? "is-open" : ""}`}
        aria-hidden={!open} inert={!open}>
        <div className="atelier-mobile-menu-inner">
          <p className="atelier-micro">MENU / EXPLORE</p>
          <nav aria-label="Mobile navigation">
            {primaryLinks.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
                <span>{link.number}</span>{link.label}<ArrowUpRight aria-hidden="true" />
              </Link>
            ))}
          </nav>
          <div className="atelier-menu-more">
            <span className="atelier-micro">MORE OF MY WORK</span>
            <div>
              {portfolioPages.map(page => (
                <Link key={page.href} href={page.href} onClick={() => setOpen(false)}>{page.title}</Link>
              ))}
            </div>
          </div>
          <div className="atelier-menu-foot">
            <span>Istanbul, Türkiye · 2026</span>
            <a href="https://github.com/S4DRA" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          </div>
        </div>
      </div>
    </>
  )
}
