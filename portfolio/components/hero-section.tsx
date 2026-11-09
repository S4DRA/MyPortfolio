import Image from "next/image"
import Link from "next/link"
import { ArrowDownRight, ArrowUpRight, Download } from "lucide-react"
import { Scene } from "@/components/cinematic/scene"

export function HeroSection() {
  return (
    <Scene id="hero" order={0} className="atelier-hero">
      <div className="atelier-hero-top atelier-enter">
        <span className="atelier-status"><span className="atelier-status-dot" />AVAILABLE FOR OPPORTUNITIES</span>
        <span>ISTANBUL, TR <span className="atelier-divider">/</span> EST. 2001</span>
      </div>
      <div className="atelier-hero-grid">
        <div className="atelier-hero-copy">
          <p className="atelier-kicker atelier-enter" style={{animationDelay:"100ms"}}><span>✳</span> CREATIVE DEVELOPER & PRODUCT DESIGNER</p>
          <h1 className="atelier-hero-title atelier-enter" style={{animationDelay:"160ms"}}>
            Thinking in <em>systems.</em><br />
            Designing for <span>people<span className="atelier-period">.</span></span>
          </h1>
          <div className="atelier-hero-detail atelier-enter" style={{animationDelay:"260ms"}}>
            <span className="atelier-detail-index">01 / THE IDEA</span>
            <p>I'm Sadra — a computer engineering student and product-minded builder. I turn complex ideas into digital experiences that feel clear, useful, and alive.</p>
          </div>
          <div className="atelier-hero-buttons atelier-enter" style={{animationDelay:"330ms"}}>
            <Link href="/#projects" className="atelier-button-main">Explore my work <ArrowDownRight size={18} aria-hidden="true" /></Link>
            <a href="/sadra-ahadiyan-cv.pdf" download className="atelier-button-subtle">Download CV <Download size={16} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="atelier-hero-visual atelier-enter" style={{animationDelay:"280ms"}}>
          <div className="atelier-portrait-frame" data-pointer-tilt>
            <div className="atelier-photo-backdrop" aria-hidden="true" />
            <div className="atelier-photo-arc" aria-hidden="true" />
            <Image src="/myPhoto.jpg" alt="Sadra Ahadiyan" width={900} height={1100} sizes="(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 85vw" priority className="atelier-portrait-image" />
            <div className="atelier-photo-top"><span>FIG. 01</span><span>PERSON / PROCESS</span></div>
            <div className="atelier-photo-bottom"><span>DESIGN ↔ BUILD</span><span>↗</span></div>
          </div>
          <div className="atelier-portrait-caption"><span className="atelier-asterisk">✳</span><span>Curious by nature.<br />Intentional by design.</span><span>SA / 26</span></div>
        </div>
      </div>
      <div className="atelier-hero-bottom atelier-enter" style={{animationDelay:"470ms"}}>
        <span>SCROLL TO DISCOVER <span className="atelier-scroll-arrow">↓</span></span>
        <div className="atelier-hero-social">
          <a href="https://github.com/S4DRA" target="_blank" rel="noopener noreferrer">GITHUB <ArrowUpRight size={13} aria-hidden="true" /></a>
          <a href="https://www.linkedin.com/in/sadra-ahadiyan" target="_blank" rel="noopener noreferrer">LINKEDIN <ArrowUpRight size={13} aria-hidden="true" /></a>
        </div>
        <span className="atelier-hero-edition">INDEPENDENT PORTFOLIO / VOL. 01</span>
      </div>
    </Scene>
  )
}
