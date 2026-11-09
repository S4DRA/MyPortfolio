import { expect, test } from "@playwright/test"
import { existsSync } from "node:fs"
import { resolve } from "node:path"
import { projects, primaryProjects, archiveProjects, getProjectShowcases } from "../lib/portfolio/projects"

test("published catalog contains source-backed projects and does not promise unverified functionality", () => {
  expect(primaryProjects.map(project => project.title)).toEqual([
    "Conduit", "Merkat", "Dampener", "VAL", "FxCK IT!",
  ])
  expect(new Set(projects.map(project => project.id)).size).toBe(projects.length)
  expect(archiveProjects.some(project => project.title === "Axivoz")).toBe(true)
  expect(getProjectShowcases("logo")).toHaveLength(6)
  expect(getProjectShowcases("programming-projects").length).toBeGreaterThanOrEqual(9)
  expect(getProjectShowcases("game-projects").some(project => project.title === "FxCK IT!")).toBe(true)

  for (const project of primaryProjects) {
    expect(project.contentState, project.title).toBe("existing")
    expect(project.summary?.length, project.title).toBeGreaterThan(30)
    expect(project.status?.length, project.title).toBeGreaterThan(6)
    expect(project.gallery?.length, project.title).toBeGreaterThan(0)
    expect(project.links?.some(link => link.href.startsWith("https://")), project.title).toBe(true)
  }
  for (const project of projects) {
    for (const asset of project.gallery ?? []) {
      expect(asset.alt.trim(), project.title).not.toBe("")
      if (asset.src.startsWith("/")) {
        expect(existsSync(resolve("public", asset.src.slice(1))), asset.src).toBe(true)
      } else {
        expect(asset.src, project.title).toMatch(/^https:\/\//)
      }
    }
  }
  expect(projects.find(project => project.id === "merkat")?.status).toContain("verification")
  expect(projects.find(project => project.id === "fxck-it")?.projectUrl).toBe("https://fxck-it.vercel.app")
})

test("desktop homepage exposes cover, six projects, accessible galleries and working links", async ({page}) => {
  const errors: string[] = []
  page.on("pageerror", error => errors.push(error.message))
  await page.goto("/")
  await expect(page.getByRole("heading", {level:1})).toContainText("SADRA")
  await expect(page.locator(".pack-piece")).toHaveCount(6)
  await expect(page.getByRole("heading", {name:"VAL"})).toBeVisible()
  await expect(page.getByRole("heading", {name:"FxCK IT!"})).toBeVisible()
  await expect(page.getByRole("link", {name:"Play the published game"})).toHaveAttribute("href","https://fxck-it.vercel.app")
  await expect(page.getByRole("link", {name:"Windows download"})).toHaveAttribute("href","https://doshab.vercel.app/download")

  const valGallery = page.locator(".pack-piece--val .pack-media-pagination")
  await expect(valGallery.getByRole("button")).toHaveCount(2)
  await valGallery.getByRole("button", {name:/Brand icon/}).click()
  await expect(valGallery.getByRole("button", {name:/Brand icon/})).toHaveAttribute("aria-pressed", "true")

  await page.getByRole("link", {name:"Software"}).click()
  await expect(page).toHaveURL(/\/programming-projects/)
  await expect(page.getByRole("heading", {name:"Programming Projects",level:1})).toBeVisible()
  expect(errors).toEqual([])
})

test("mobile has no horizontal overflow, and navigation and portfolio sections remain reachable", async ({page}) => {
  await page.setViewportSize({width:390,height:844})
  await page.goto("/")
  await expect(page.locator(".pack-header")).toBeVisible()
  await expect(page.getByRole("heading", {level:1})).toBeVisible()
  await expect(page.locator(".pack-portrait-image")).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true)
  await page.locator(".pack-mobile-menu > summary").click()
  await expect(page.locator(".pack-mobile-menu nav")).toBeVisible()
  await page.locator(".pack-mobile-menu nav").getByRole("link", {name:/Contact/}).click()
  await expect(page).toHaveURL(/#contact/)
  await expect(page.locator("#pack-contact-title")).toBeInViewport()

  await page.goto("/logo")
  await page.locator(".pack-mobile-menu > summary").click()
  await page.locator(".pack-mobile-menu nav").getByRole("link", {name:/Work/}).click()
  await expect(page).toHaveURL(/\/#work/)
})

test("all existing inner pages render new layouts without losing published and legacy content", async ({page}) => {
  for (const [url, title] of [
    ["/about-me", "About Me"],
    ["/work-experience", "Work Experience"],
    ["/programming-projects", "Programming Projects"],
    ["/website-design", "Website Design"],
    ["/logo", "Logo Design"],
    ["/game-projects", "Game Projects"],
  ]) {
    const response = await page.goto(url)
    expect(response?.status(), url).toBe(200)
    await expect(page.getByRole("heading", {name:title,level:1})).toBeVisible()
    await expect(page.getByRole("link", {name:/Back to portfolio/})).toBeVisible()
  }
  await page.goto("/game-projects")
  await expect(page.getByRole("heading", {name:"FxCK IT!"})).toBeVisible()
  await expect(page.getByRole("heading", {name:"DasaPhase"})).toBeVisible()
})

test("reduced motion leaves actual content available without a WebGL overlay", async ({page}) => {
  await page.emulateMedia({reducedMotion:"reduce"})
  await page.goto("/")
  await expect(page.locator("#pack-cover-title")).toBeVisible()
  await expect(page.locator("#pack-work-title")).toBeVisible()
  await expect(page.locator("#pack-about-title")).toBeVisible()
  await expect(page.locator("#pack-contact-title")).toBeVisible()
  await expect(page.locator(".cinematic-visual-layer")).toHaveCount(0)
  await expect(page.locator(".portfolio-bottom-nav")).toHaveCount(0)
})
