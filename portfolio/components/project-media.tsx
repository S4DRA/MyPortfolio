"use client"

import { useState } from "react"
import type { PortfolioAsset } from "@/lib/portfolio/types"

export function ProjectMedia({ title, gallery, index }: { title: string; gallery?: PortfolioAsset[]; index: number }) {
  const [active, setActive] = useState(0)
  const [failed, setFailed] = useState<string[]>([])
  const asset = gallery?.[active]
  const hasImage = Boolean(asset && !failed.includes(asset.src))

  return (
    <div className="pack-piece-media">
      <div className="pack-piece-art" aria-label={asset?.label ?? `${title} project artwork`}>
        <div className="pack-piece-art-fallback" aria-hidden={hasImage}>
          <span>{title}</span>
          <small>PROJECT / {String(index + 1).padStart(2, "0")}</small>
        </div>
        {hasImage && asset && (
          /* Original project-owned art; external sources are the published product sites. */
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={asset.src}
            src={asset.src}
            alt={asset.alt}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            className="pack-piece-image pack-piece-image--live"
            onError={() => setFailed(current => current.includes(asset.src) ? current : [...current, asset.src])}
          />
        )}
        <div className="pack-piece-corner" aria-hidden="true">
          <span>SA / WORK</span>
          <span>{String(index + 1).padStart(2, "0")}</span>
        </div>
      </div>

      {gallery && gallery.length > 0 && (
        <div className="pack-media-footer">
          <span>{hasImage ? asset?.label ?? "Project visual" : "Project identity"}</span>
          {gallery.length > 1 && (
            <div className="pack-media-pagination" aria-label={`${title} image gallery`}>
              {gallery.map((item, itemIndex) => (
                <button
                  key={item.src}
                  type="button"
                  title={item.label ?? `Image ${itemIndex + 1}`}
                  aria-label={`Show ${item.label ?? `image ${itemIndex + 1}`}`}
                  aria-pressed={active === itemIndex}
                  onClick={() => setActive(itemIndex)}
                >
                  {String(itemIndex + 1).padStart(2, "0")}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}


export function PublishedImage({src, alt}:{src:string;alt:string}) {
  const [broken, setBroken] = useState(false)

  if (broken) {
    return <div className="pack-inner-image-fallback" role="img" aria-label={alt}>
      <span>Portfolio visual</span>
      <small>View the published project for the full experience.</small>
    </div>
  }

  return (
    // The media comes from its actual published project.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} loading="lazy" decoding="async" onError={() => setBroken(true)} />
  )
}
