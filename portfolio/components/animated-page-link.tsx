"use client"

import Link, { type LinkProps } from "next/link"
import type { MouseEvent, ReactNode } from "react"
import { usePageTransition } from "@/components/page-transition-provider"

type AnimatedPageLinkProps = LinkProps & {
  children: ReactNode
  className?: string
}

export function AnimatedPageLink({
  href,
  children,
  className,
  ...props
}: AnimatedPageLinkProps) {
  const { navigateWithTransition } = usePageTransition()
  const hrefString = typeof href === "string" ? href : href.toString()

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }

    event.preventDefault()
    navigateWithTransition(hrefString)
  }

  return (
    <Link {...props} href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  )
}
