import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowUpRight, Download } from "lucide-react"
import { projects } from "@/lib/portfolio/projects"
import type { PortfolioProject } from "@/lib/portfolio/types"
import { PackMotion } from "@/components/pack-motion"
import { ProjectMedia } from "@/components/project-media"

const selectedIds = ["val", "fxck-it", "conduit", "merkat", "dampener", "axivoz"]
const selected = selectedIds
  .map(id => projects.find(project => project.id === id))
  .filter((project): project is PortfolioProject => Boolean(project))

const moreAreas = [
  { title: "Software", href: "/programming-projects", number: "01" },
  { title: "Interfaces", href: "/website-design", number: "02" },
  { title: "Games", href: "/game-projects", number: "03" },
  { title: "Identity", href: "/logo", number: "04" },
]

export function FolioHeader() {
  return (
    <header className="pack-header">
      <Link className="pack-brand" href="/#top" aria-label="Sadra Ahadiyan homepage">sa<span>.</span></Link>
      <nav className="pack-desktop-links" aria-label="Primary">
        <a href="/#work">Work</a>
        <a href="/#about">About</a>
        <a href="/#contact">Contact</a>
      </nav>
      <span className="pack-header-edition">PORTFOLIO / 2026</span>
      <details className="pack-mobile-menu">
        <summary aria-label="Open navigation">Menu<span aria-hidden="true">+</span></summary>
        <nav aria-label="Mobile navigation">
          <a href="/#work">Work <span>01</span></a>
          <a href="/#about">About <span>02</span></a>
          <a href="/#contact">Contact <span>03</span></a>
          <a href="/programming-projects">Other work <span>↗</span></a>
        </nav>
      </details>
    </header>
  )
}

function Cover() {
  return (
    <section className="pack-cover" id="top" aria-labelledby="pack-cover-title">
      <div className="pack-cover-head">
        <p>DESIGN & DEVELOPMENT<br/>ISTANBUL, TÜRKİYE</p>
        <span>INDEPENDENT WORK<br/>2024 — 2026</span>
      </div>
      <h1 id="pack-cover-title" className="pack-cover-title">
        <span>SADRA</span>
        <span>AHADIYAN<span className="pack-title-stop">.</span></span>
      </h1>
      <div className="pack-cover-bottom">
        <div className="pack-portrait">
          <Image src="/myPhoto.jpg" alt="Portrait of Sadra Ahadiyan" width={1000} height={1200}
            priority sizes="(min-width: 900px) 44vw, 100vw" className="pack-portrait-image" />
          <div className="pack-portrait-sticker" aria-hidden="true"><span>SA</span><i>✳</i></div>
          <span className="pack-photo-edge" aria-hidden="true">FIG. / SELF-PORTRAIT</span>
        </div>
        <div className="pack-cover-intro">
          <p className="pack-intro-main">I care about how a thing <i>works</i> and how it <i>feels.</i></p>
          <p className="pack-intro-secondary">I’m a computer engineering student building digital products, interfaces and practical software.</p>
          <a href="#work" className="pack-scroll-link">Explore the work <ArrowDown size={23} strokeWidth={1.6} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  )
}

function WorkPiece({ project, index }: { project: PortfolioProject; index: number }) {
  const intro = project.tagline ?? project.summary
  const details = [
    project.problem ? { label:"THE PROBLEM", text: project.problem } : null,
    project.solution ? { label:"THE BUILD", text: project.solution } : null,
    project.decision ? { label:"THE DECISION", text: project.decision } : null,
    project.outcomes?.length ? { label:"SHIPPED & VERIFIED", text: project.outcomes.join(" ") } : null,
  ].filter((item): item is {label:string;text:string} => Boolean(item))
  return (
    <article className={`pack-piece pack-piece--${project.id}`} data-pack-reveal>
      <div className="pack-piece-meta">
        <span>{String(index+1).padStart(2,"0")}</span><span>{project.category}</span>
      </div>
      <ProjectMedia title={project.title} gallery={project.gallery ?? (project.heroAsset ? [project.heroAsset] : undefined)} index={index} />
      <div className="pack-piece-caption">
        <div className="pack-piece-title-group"><h3>{project.title}</h3><span aria-hidden="true">↗</span></div>
        <p>{intro ?? "A project in development. More information and visuals are on the way."}</p>
        {project.status && <p className="pack-piece-published"><span aria-hidden="true">●</span> {project.status}</p>}
        {project.technologies && <p className="pack-piece-tools">{project.technologies.slice(0, 5).join(" · ")}</p>}
        <div className="pack-piece-actions">
          {project.links?.filter(link => link.href !== "/programming-projects").slice(0, 3).map(link => (
            link.internal ? (
              <Link key={link.href} href={link.href}>
                {link.label} <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            ) : (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label} <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            )
          ))}
          {details.length > 0 && (
            <details className="pack-piece-details">
              <summary>Behind the work <span aria-hidden="true">+</span></summary>
              <div className="pack-piece-detail-body">
                {details.map(detail => (
                  <div key={detail.label}><b>{detail.label}</b><p>{detail.text}</p></div>
                ))}
              </div>
            </details>
          )}
          {(!project.links?.length && details.length === 0) && <span className="pack-piece-quiet">Work in progress</span>}
        </div>
      </div>
    </article>
  )
}

function Work() {
  return (
    <section className="pack-work" id="work" aria-labelledby="pack-work-title">
      <div className="pack-section-top" data-pack-reveal>
        <h2 id="pack-work-title">Work<span className="pack-heading-mark">/</span></h2>
        <p>A selection of things I’ve designed, developed, or explored.</p>
      </div>
      <div className="pack-piece-grid">
        {selected.map((project,index) => <WorkPiece project={project} index={index} key={project.id} />)}
      </div>
      <div className="pack-archive" data-pack-reveal>
        <div className="pack-archive-heading">
          <h3>More in the archive.</h3>
          <p>Smaller experiments, older work, and everything in between.</p>
        </div>
        <div className="pack-archive-links">
          {moreAreas.map(area => (
            <Link key={area.href} href={area.href}>
              <span className="pack-archive-number">{area.number}</span>
              <span>{area.title}</span>
              <ArrowUpRight size={25} strokeWidth={1.5} aria-hidden="true"/>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function Background() {
  return (
    <section className="pack-about" id="about" aria-labelledby="pack-about-title">
      <div className="pack-about-side" data-pack-reveal><span>ABOUT</span><span className="pack-about-glyph" aria-hidden="true">S/A</span></div>
      <div className="pack-about-body" data-pack-reveal>
        <h2 id="pack-about-title">From sketch<br/>to <em>working product.</em></h2>
        <div className="pack-about-columns">
          <p>My background is in computer engineering, but I’ve always moved between code and design. I like the practical side of making something: the problems, the trade-offs, the tiny details.</p>
          <div>
            <p>I’m based in Istanbul. I’ve worked on product interfaces, full-stack applications, and projects of my own.</p>
            <div className="pack-about-links">
              <Link href="/work-experience">Experience <ArrowUpRight size={17} aria-hidden="true" /></Link>
              <Link href="/about-me">More about me <ArrowUpRight size={17} aria-hidden="true" /></Link>
              <a href="/sadra-ahadiyan-cv.pdf" download>Resume <Download size={17} aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="pack-contact" id="contact" aria-labelledby="pack-contact-title">
      <div className="pack-contact-top"><span>HAVE A PROJECT IN MIND?</span><span>ISTANBUL / REMOTE</span></div>
      <h2 id="pack-contact-title" data-pack-reveal>Let’s make<br/><em>something.</em></h2>
      <a className="pack-email" href="mailto:sadra.ahadiyan@bahcesehir.edu.tr">
        <span>sadra.ahadiyan@bahcesehir.edu.tr</span><ArrowUpRight size={27} strokeWidth={1.5} aria-hidden="true"/>
      </a>
      <footer className="pack-footer">
        <a className="pack-footer-brand" href="#top">sa<span>.</span></a>
        <span>Designed and built by Sadra Ahadiyan · 2026</span>
        <nav aria-label="Social links">
          <a href="https://github.com/S4DRA" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a href="https://www.linkedin.com/in/sadra-ahadiyan" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        </nav>
      </footer>
    </section>
  )
}

export function PackagedPortfolio() {
  return (
    <main className="pack-root">
      <PackMotion/>
      <a href="#work" className="pack-skip">Skip to work</a>
      <FolioHeader/>
      <Cover/>
      <Work/>
      <Background/>
      <Contact/>
    </main>
  )
}
