import { expect, test } from "@playwright/test"

const samples = [
  { path: "/", selector: "#pack-cover-title", name: "home cover title" },
  { path: "/", selector: "#pack-work-title", name: "work title" },
  { path: "/", selector: ".pack-piece-title-group h3", name: "project title" },
  { path: "/", selector: "#pack-about-title", name: "mint about title" },
  { path: "/", selector: "#pack-contact-title", name: "dark contact title" },
  { path: "/", selector: ".pack-cover-intro .pack-intro-main", name: "dark introduction" },
  { path: "/about-me", selector: ".pack-inner-cover h1", name: "inner page title" },
  { path: "/programming-projects", selector: ".pack-inner-item-body h2", name: "project archive title" },
  { path: "/work-experience", selector: "#pack-notes-heading", name: "mint inner notes title" },
] as const

function luminance(rgb: number[]) {
  const [r,g,b] = rgb.map(value => {
    const channel = value / 255
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  })
  return r * 0.2126 + g * 0.7152 + b * 0.0722
}

function contrast(a: number[], b: number[]) {
  const x = luminance(a), y = luminance(b)
  return (Math.max(x,y) + 0.05) / (Math.min(x,y) + 0.05)
}

test("packaging homepage and inner-page headings stay readable against their actual surfaces", async ({ page }) => {
  let route = ""
  for (const sample of samples) {
    if (sample.path !== route) {
      route = sample.path
      await page.goto(route)
    }

    const heading = page.locator(sample.selector).first()
    await expect(heading, sample.name).toBeVisible()

    const appearance = await heading.evaluate(element => {
      const parse = (value: string) =>
        Array.from(value.matchAll(/[\d.]+/g)).slice(0,3).map(match => Number(match[0]))
      const color = parse(getComputedStyle(element).color)

      let ancestor: HTMLElement | null = element.parentElement
      let background = ""
      while (ancestor) {
        const candidate = getComputedStyle(ancestor).backgroundColor
        if (candidate !== "rgba(0, 0, 0, 0)" && candidate !== "transparent") {
          background = candidate
          break
        }
        ancestor = ancestor.parentElement
      }

      return {
        foreground: color,
        background: parse(background),
        opacity: getComputedStyle(element).opacity,
      }
    })

    expect(appearance.foreground.length, sample.name).toBe(3)
    expect(appearance.background.length, sample.name).toBe(3)
    expect(contrast(appearance.foreground, appearance.background), sample.name).toBeGreaterThanOrEqual(4.5)
    expect(Number(appearance.opacity), sample.name).toBeGreaterThanOrEqual(0.95)
  }
})

test("all mobile content remains legible while menu opens and project sections scroll", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/")
  await expect(page.locator("#pack-cover-title")).toBeVisible()
  await expect(page.locator(".pack-cover-intro .pack-intro-main")).toBeVisible()

  await page.locator(".pack-mobile-menu summary").click()
  const nav = page.locator(".pack-mobile-menu nav")
  await expect(nav).toBeVisible()
  await expect(nav.getByRole("link", {name: /Work/})).toBeVisible()

  await nav.getByRole("link", { name: /Work/ }).click()
  await expect(page).toHaveURL(/#work$/)
  await expect(page.locator("#pack-work-title")).toBeInViewport()

  await page.locator("#contact").scrollIntoViewIfNeeded()
  const contactTitle = page.locator("#pack-contact-title")
  await expect(contactTitle).toBeVisible()
  expect(Number(await contactTitle.evaluate(el => getComputedStyle(el).opacity))).toBeGreaterThanOrEqual(0.95)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
})
