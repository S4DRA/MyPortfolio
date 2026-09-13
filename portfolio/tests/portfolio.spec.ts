import { expect, test } from "@playwright/test"
import { existsSync } from "node:fs"
import { resolve } from "node:path"
import { projects, primaryProjects, archiveProjects, getProjectShowcases } from "../lib/portfolio/projects"
import { clampProgress, createSceneStore } from "../lib/animation/scene-store"

test("catalog preserves content and explicit missing primary entries", () => {
  expect(primaryProjects.map(project => project.title)).toEqual(["Conduit", "Merkat", "Dampener", "VAL"])
  expect(new Set(projects.map(project => project.id)).size).toBe(projects.length)
  for (const project of primaryProjects.slice(0, 2)) {
    expect(project.contentState).toBe("placeholder")
    expect(project.summary).toBeUndefined()
    expect(project.gallery).toBeUndefined()
    expect(project.missing).toContain("assets")
  }
  expect(archiveProjects.some(project => project.title === "Axivoz")).toBe(true)
  expect(getProjectShowcases("logo")).toHaveLength(6)
  expect(getProjectShowcases("programming-projects")).toHaveLength(3)
  for (const project of projects) {
    for (const asset of project.gallery ?? []) {
      expect(existsSync(resolve("public", asset.src.slice(1))), asset.src).toBe(true)
    }
  }
})

test("scene progress reverses and clamps without rerendering the project index each frame", () => {
  const store = createSceneStore()
  const remove = store.register({ id: "conduit", order: 1, projectId: "conduit", projectIndex: "01" })
  let navigationUpdates = 0
  const unsubscribe = store.subscribeNavigation(() => navigationUpdates++)
  store.update("conduit", 0.2, true)
  store.update("conduit", 0.8, true)
  store.update("conduit", 0.1, true)
  expect(store.getScene("conduit")?.progress).toBe(0.1)
  expect(navigationUpdates).toBe(1)
  expect(() => store.register({ id: "conduit", order: 1 })).toThrow("Duplicate")
  expect(clampProgress(-1)).toBe(0)
  expect(clampProgress(4)).toBe(1)
  expect(clampProgress(NaN)).toBe(0)
  remove()
  expect(store.getActive()).toBeNull()
  expect(store.getScenes()).toHaveLength(0)
  unsubscribe()
  store.register({ id: "conduit", order: 1 })() // Strict Mode remount after cleanup.
})

test("desktop homepage, optimized images, anchors and persistent canvas", async ({ page }) => {
  const errors: string[] = []
  page.on("pageerror", error => errors.push(error.message))
  await page.goto("/")
  await expect(page.getByRole("heading", { level: 1 })).toContainText("I design and build")
  await expect(page.locator("html")).toHaveClass(/lenis/)
  await expect(page.locator("[data-scene]")).toHaveCount(13)
  await expect(page.locator("[data-webgl=ready]")).toHaveCount(1)
  const portrait = page.getByAltText("Portrait of Sadra Ahadiyan")
  await expect(portrait).toHaveAttribute("src", /\/_next\/image/)
  await expect.poll(() => portrait.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true)
  await page.getByRole("link", { name: "View Selected Work" }).click()
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(500)
  await expect(page.getByRole("heading", { name: "The work carries the story." })).toBeInViewport()
  const canvas = await page.locator("[data-webgl=ready]").elementHandle()
  await page.getByRole("link", { name: "More Work", exact: true }).click()
  await expect(page).toHaveURL(/\/programming-projects$/)
  await expect(page.locator("[data-page-transition]")).toHaveAttribute("data-page-transition", "idle")
  expect(await canvas?.evaluate(node => node.isConnected)).toBe(true)
  await expect(page.locator("[data-scene]")).toHaveCount(0)
  await page.getByRole("link", { name: "Back to Home", exact: true }).click()
  await expect(page).toHaveURL(/\/$/)
  await expect(page.locator("[data-scene]")).toHaveCount(13)
  expect(errors).toEqual([])
})

test("all preserved content routes load and expose their existing content", async ({ page }) => {
  for (const [route, heading] of [
    ["/about-me", "About Me"], ["/work-experience", "Work Experience"],
    ["/programming-projects", "Programming Projects"], ["/website-design", "Website Design"],
    ["/logo", "Logo Design"], ["/game-projects", "Game Projects"],
  ]) {
    const response = await page.goto(route)
    expect(response?.status()).toBe(200)
    await expect(page.getByRole("heading", { name: heading, exact: true, level: 1 })).toBeVisible()
    await expect(page.getByRole("link", { name: "Back to Home", exact: true })).toHaveCount(1)
  }
})

test("mobile stays native and can open the menu and reach contact", async ({ browser }) => {
  const context = await browser.newContext({ baseURL: test.info().project.use.baseURL, viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })
  const page = await context.newPage()
  await page.goto("/")
  await expect(page.locator("[data-background-motion=animated]")).toHaveCount(1)
  await expect(page.locator("html")).not.toHaveClass(/lenis/)
  await expect(page.locator(".cinematic-visual-layer")).toHaveCount(0)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  await page.getByRole("button", { name: "Toggle menu" }).click()
  await expect(page.getByText("Portfolio Menu", { exact: true })).toBeVisible()
  await page.getByRole("button", { name: "Close menu" }).click()
  await page.locator(".portfolio-bottom-nav").getByRole("link", { name: "Contact" }).click()
  await expect(page.getByRole("heading", { name: "I am looking for the next place to contribute." })).toBeInViewport()
  await page.screenshot({ path: "test-results/mobile-contact.png" })
  await context.close()
})

test("reduced motion changes live, stopping canvas and WebGL without hiding content", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto("/")
  await expect(page.locator("[data-background-motion=static]")).toHaveCount(1)
  await expect(page.locator("html")).not.toHaveClass(/lenis/)
  await expect(page.locator(".cinematic-visual-layer")).toHaveCount(0)
  const before = await page.locator("[data-background-motion]").evaluate((canvas: HTMLCanvasElement) => canvas.toDataURL())
  await page.waitForTimeout(200)
  expect(await page.locator("[data-background-motion]").evaluate((canvas: HTMLCanvasElement) => canvas.toDataURL())).toBe(before)
  await page.getByRole("link", { name: "More Work", exact: true }).click()
  await expect(page).toHaveURL(/\/programming-projects$/)
  await expect(page.locator("[data-page-transition]")).toHaveAttribute("data-page-transition", "idle")
  await page.emulateMedia({ reducedMotion: "no-preference" })
  await expect(page.locator("[data-background-motion=animated]")).toHaveCount(1)
  await expect(page.locator("[data-webgl=ready]")).toHaveCount(1)
  await expect(page.locator("html")).toHaveClass(/lenis/)
  await page.emulateMedia({ reducedMotion: "reduce" })
  await expect(page.locator(".cinematic-visual-layer")).toHaveCount(0)
})

test("WebGL creation failure leaves the DOM and navigation usable", async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext
    HTMLCanvasElement.prototype.getContext = function(this: HTMLCanvasElement, type: string, ...args: unknown[]) {
      if (type === "webgl" || type === "webgl2" || type === "experimental-webgl") return null
      return original.call(this, type, ...args)
    } as typeof original
  })
  await page.goto("/")
  await expect(page.locator("[data-webgl=unavailable]")).toHaveCount(1)
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
  await page.getByRole("link", { name: "View Selected Work" }).click()
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(500)
})

test("background draws once per frame, pauses while hidden, and releases old pages", async ({ page }) => {
  await page.addInitScript(() => {
    type Probe = { enabled: boolean; frame: number; duplicate: number; orphan: number; draws: number }
    const probe: Probe = { enabled: false, frame: 0, duplicate: 0, orphan: 0, draws: 0 }
    ;(window as typeof window & { frameProbe: Probe }).frameProbe = probe
    const frames = new WeakMap<HTMLCanvasElement, number>()
    const raf = window.requestAnimationFrame
    window.requestAnimationFrame = callback => raf.call(window, time => { probe.frame = time; callback(time) })
    const clear = CanvasRenderingContext2D.prototype.clearRect
    CanvasRenderingContext2D.prototype.clearRect = function(...args) {
      if (probe.enabled && this.canvas.hasAttribute("data-background-motion")) {
        probe.draws++
        if (!this.canvas.isConnected) probe.orphan++
        if (frames.get(this.canvas) === probe.frame) probe.duplicate++
        frames.set(this.canvas, probe.frame)
      }
      return clear.apply(this, args)
    }
  })
  await page.goto("/")
  await expect(page.locator("[data-webgl=ready]")).toHaveCount(1)
  await page.waitForTimeout(500)
  await page.evaluate(() => { (window as unknown as { frameProbe: { enabled: boolean } }).frameProbe.enabled = true })
  await page.waitForTimeout(250)
  const read = () => page.evaluate(() => (window as unknown as { frameProbe: { duplicate: number; orphan: number; draws: number } }).frameProbe)
  expect((await read()).draws).toBeGreaterThan(0)
  expect((await read()).duplicate).toBe(0)
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", { configurable: true, get: () => true })
    document.dispatchEvent(new Event("visibilitychange"))
  })
  const paused = (await read()).draws
  await page.waitForTimeout(250)
  expect((await read()).draws).toBe(paused)
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", { configurable: true, get: () => false })
    document.dispatchEvent(new Event("visibilitychange"))
  })
  await expect.poll(async () => (await read()).draws).toBeGreaterThan(paused)
  // Navigation mounts a new background; no detached background may keep drawing.
  await page.getByRole("link", { name: "More Work", exact: true }).click()
  await expect(page).toHaveURL(/\/programming-projects$/)
  await page.getByRole("link", { name: "Back to Home", exact: true }).click()
  await expect(page).toHaveURL(/\/$/)
  await page.waitForTimeout(250)
  expect((await read()).orphan).toBe(0)
})

test("renderer resize caps DPR and recovers from context loss", async ({ browser }) => {
  const context = await browser.newContext({ baseURL: test.info().project.use.baseURL, viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 3 })
  const page = await context.newPage()
  await page.goto("/")
  const canvas = page.locator("[data-webgl=ready]")
  await expect(canvas).toHaveCount(1)
  expect(await canvas.evaluate((node: HTMLCanvasElement) => node.width)).toBe(2160)
  await page.setViewportSize({ width: 1366, height: 900 })
  await expect.poll(() => canvas.evaluate((node: HTMLCanvasElement) => node.width)).toBe(2049)
  const canLose = await canvas.evaluate((node: HTMLCanvasElement) => {
    const extension = node.getContext("webgl2")?.getExtension("WEBGL_lose_context")
    if (!extension) return false
    ;(window as unknown as { contextExtension: WEBGL_lose_context }).contextExtension = extension
    extension.loseContext()
    return true
  })
  expect(canLose).toBe(true)
  await expect(page.locator("[data-webgl=lost]")).toHaveCount(1)
  await page.evaluate(() => (window as unknown as { contextExtension: WEBGL_lose_context }).contextExtension.restoreContext())
  await expect(page.locator("[data-webgl=ready]")).toHaveCount(1)
  await context.close()
})

test("native history restores anchors and route navigation", async ({ page }) => {
  await page.goto("/")
  await expect(page.locator("html")).toHaveClass(/lenis/)
  await page.getByRole("link", { name: "View Selected Work" }).click()
  await expect(page.getByRole("heading", { name: "The work carries the story." })).toBeInViewport()
  await page.getByRole("link", { name: "More Work", exact: true }).click()
  await expect(page).toHaveURL(/\/programming-projects$/)
  await expect(page.locator("[data-page-transition]")).toHaveAttribute("data-page-transition", "idle")
  await page.goBack()
  await expect(page).toHaveURL(/\/#projects$/)
  await expect(page.getByRole("heading", { name: "The work carries the story." })).toBeInViewport()
  await page.goForward()
  await expect(page).toHaveURL(/\/programming-projects$/)
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Programming Projects")
})
