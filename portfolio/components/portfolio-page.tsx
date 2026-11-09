import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { FolioHeader } from "@/components/packaged-portfolio"
import { PackMotion } from "@/components/pack-motion"
import { PublishedImage } from "@/components/project-media"

type Metric = {label:string;value:string}
type ContentSection = {title:string;description:string;items:string[]}
type ShowcaseCard = {title:string;description:string;tags:string[];imageSrc?:string;imageAlt?:string;href?:string}
type PortfolioPageProps = {
  eyebrow:string
  title:string
  intro:string
  metrics:Metric[]
  sections:ContentSection[]
  showcases:ShowcaseCard[]
  heroVisual?:ReactNode
}

export function PortfolioPage({eyebrow,title,intro,metrics,sections,showcases,heroVisual}:PortfolioPageProps) {
  return (
    <main className="pack-root pack-inner">
      <PackMotion/>
      <a href="#collection" className="pack-skip">Skip to collection</a>
      <FolioHeader/>
      <section className="pack-inner-cover">
        <div className="pack-inner-overline">
          <span>{eyebrow.toUpperCase()}</span>
          <Link href="/">← Back to portfolio</Link>
        </div>
        <h1>{title}<span className="pack-title-stop">.</span></h1>
        <div className={`pack-inner-lead ${heroVisual ? "has-visual" : ""}`}>
          <div>
            <p>{intro}</p>
            <dl className="pack-inner-ledger">
              {metrics.map(metric => (
                <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>
              ))}
            </dl>
          </div>
          {heroVisual && <div className="pack-inner-visual">{heroVisual}</div>}
        </div>
      </section>

      {showcases.length > 0 && <section className="pack-inner-collection" id="collection">
        <div className="pack-inner-collection-top"><span>SELECTED ITEMS</span><span>{String(showcases.length).padStart(2,"0")} / PIECES</span></div>
        <div className="pack-inner-collection-list">
          {showcases.map((item,index) => (
            <article className="pack-inner-item" key={`${item.title}-${index}`} data-pack-reveal>
              <span className="pack-inner-item-number">{String(index+1).padStart(2,"0")}</span>
              <div className="pack-inner-item-body">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                {item.tags.length > 0 && (
                  <p className="pack-inner-item-tags">{item.tags.join(" / ")}</p>
                )}
                {item.href && <a className="pack-inner-item-live" href={item.href} target="_blank" rel="noopener noreferrer">
                  Open published project <ArrowUpRight size={17} aria-hidden="true" />
                </a>}
              </div>
              {item.imageSrc ?
                <div className="pack-inner-item-image">
                  <PublishedImage src={item.imageSrc} alt={item.imageAlt ?? item.title} />
                </div> :
                <div className="pack-inner-item-type" aria-hidden="true"><span>{String(index+1).padStart(2,"0")}</span><ArrowUpRight size={25}/></div>
              }
            </article>
          ))}
        </div>
      </section>}

      <section className="pack-inner-notes" aria-labelledby="pack-notes-heading">
        <div className="pack-inner-notes-title">
          <span>IN THE MARGINS</span>
          <h2 id="pack-notes-heading">A few notes.</h2>
        </div>
        <div className="pack-inner-notes-list">
          {sections.map(section => (
            <article key={section.title} data-pack-reveal>
              <h3>{section.title}</h3>
              <p>{section.description}</p>
              <ul>{section.items.map(item => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <footer className="pack-inner-footer">
        <Link href="/">← Back to all work</Link>
        <a href="mailto:sadra.ahadiyan@bahcesehir.edu.tr">Start a conversation <ArrowUpRight size={17} aria-hidden="true"/></a>
      </footer>
    </main>
  )
}
