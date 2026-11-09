import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Plus } from "lucide-react"
import { Scene } from "@/components/cinematic/scene"
import { featuredProjects, otherProjects } from "@/lib/portfolio/legacy"

const details = [
  ["The problem", "problem"],
  ["My role", "role"],
  ["What I built", "built"],
  ["Design / technical decision", "decision"],
  ["What changed", "change"],
  ["Current status", "status"],
] as const

export function ProjectsSection() {
  return (
    <section id="projects" className="atelier-projects">
      <div className="atelier-section-container">
        <div className="atelier-project-intro" data-reveal>
          <div className="atelier-section-index"><span>01 / SELECTED WORK</span><span>PRODUCT THINKING IN PRACTICE</span></div>
          <div className="atelier-project-intro-grid">
            <h2>Ideas made <em>tangible.</em></h2>
            <div>
              <p>Not just how it looks. How it works, why it exists, and what I learned along the way.</p>
              <span className="atelier-intro-rule" aria-hidden="true" />
              <span className="atelier-intro-caption">SELECTED PROJECTS <span>↓</span></span>
            </div>
          </div>
        </div>
        <div className="atelier-featured-stack">
          {featuredProjects.map((project, index) => (
            <Scene
              key={project.id}
              id={`project-${project.id}`}
              projectId={project.id}
              projectIndex={project.index}
              order={project.order}
              as="article"
              className={`atelier-featured-project ${index % 2 ? "atelier-project-reverse" : ""}`}
            >
              <div className="atelier-project-image-panel" data-reveal>
                <div className="atelier-project-image-meta"><span>FEATURED / {String(index+1).padStart(2,"0")}</span><span>CASE STUDY ↗</span></div>
                {project.visuals[0] ? (
                  <Image
                    src={project.visuals[0].src}
                    alt={project.visuals[0].alt}
                    width={1500} height={1050}
                    sizes="(min-width: 1100px) 50vw, 100vw"
                    className="atelier-featured-image"
                  />
                ) : (
                  <div className="atelier-project-missing-art" aria-hidden="true">{project.title.substring(0,2)}</div>
                )}
                <span className="atelier-image-caption">{project.visuals[0]?.label ?? "Interface exploration"}</span>
              </div>
              <div className="atelier-project-info" data-reveal>
                <div className="atelier-project-info-top"><span>{project.eyebrow}</span><span>{String(index+1).padStart(2,"0")} / {String(featuredProjects.length).padStart(2,"0")}</span></div>
                <h3>{project.title}<span className="atelier-heading-dot">.</span></h3>
                <p className="atelier-project-tagline">{project.oneLine}</p>
                <div className="atelier-project-data"><span>ROLE</span><p>{project.role}</p></div>
                <div className="atelier-project-links">
                  {project.links.map(link => link.internal ? (
                    <Link key={link.label} href={link.href} className="atelier-project-link-primary">
                      {link.label}<ArrowUpRight size={17} aria-hidden="true" />
                    </Link>
                  ) : (
                    <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="atelier-project-link-plain">
                      {link.label}<ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  ))}
                </div>
                <details className="atelier-case-details">
                  <summary>Read the thinking behind it <Plus size={17} aria-hidden="true" /></summary>
                  <dl>
                    {details.map(([label,key]) => {
                      const value = project[key]
                      return value ? <div key={label}><dt>{label}</dt><dd>{value}</dd></div> : null
                    })}
                  </dl>
                </details>
              </div>
            </Scene>
          ))}
        </div>
        <div className="atelier-more-work" data-reveal>
          <div className="atelier-section-index"><span>02 / MORE WORK</span><span>EXPERIMENTS, SOFTWARE & IDEAS</span></div>
          <div className="atelier-more-heading">
            <h2>Always <em>building.</em></h2>
            <p>Smaller explorations and earlier projects that shaped the way I work.</p>
          </div>
          <div className="atelier-more-list">
            {otherProjects.map((project,index) => {
              const Icon = project.icon
              return (
                <Scene key={project.id} as="article" id={`project-${project.id}`}
                  order={project.order} projectId={project.id} projectIndex={project.index} className="atelier-more-row">
                  <span className="atelier-more-index">{String(index+1).padStart(2,"0")}</span>
                  <div className="atelier-more-name"><Icon size={20} strokeWidth={1.3} aria-hidden="true" /><h3>{project.title}</h3></div>
                  <div className="atelier-more-summary"><p>{project.description}</p><span>{project.type}</span></div>
                  <span className="atelier-more-arrow" aria-hidden="true">↗</span>
                  <details className="atelier-more-detail">
                    <summary>Project notes <Plus size={14} aria-hidden="true" /></summary>
                    <p>{project.evidence}</p>
                    <div>{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                  </details>
                </Scene>
              )
            })}
          </div>
          <a href="https://github.com/S4DRA" target="_blank" rel="noopener noreferrer" className="atelier-github-link">Explore more on GitHub <ArrowUpRight size={20} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  )
}
