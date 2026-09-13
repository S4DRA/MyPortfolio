# Phase 0: cinematic portfolio foundation

This is infrastructure, not the final design. The existing section order, copy, crops,
background, route overlay, category routes, and navigation UI remain in use.
No cameras are animated and no meshes, lights, particles, textures, or shaders have
been added to the Three.js scene.

## Content

`lib/portfolio/projects.ts` is the project catalog; `types.ts` defines its contract.
`primaryProjects` orders Conduit, Merkat, Dampener, and VAL. Conduit and Merkat have
`contentState: "placeholder"` and explicit `missing` lists. Their absent copy, assets,
metrics, URLs, and colors must not be inferred. Existing repository-profile and category
links remain `links`; they are not mislabeled as direct repository or live-product URLs.

`archiveProjects` includes Axivoz, technical projects, game concepts, website concepts,
and the six logo pieces. `presentations` retains existing route-specific wording.
`getProjectShowcases(route)` supplies the category pages. Page introductions, personal
biography, experience text, and editorial section text remain with their pages.

`legacy.ts` is an adapter, not another content source. It keeps today's Dampener/Axivoz
featured layout and smaller project list independent of the future chapter order.
Replace that adapter only when the new presentation is approved. Existing visible
Lucide icons are presentation metadata; they are not supplied project logos.

## Shell and scenes

`CinematicShell` is mounted once in the root layout. It owns the per-app scene store,
desktop smooth-scroll controller, and lazy persistent visual layer. It does not render
new navigation or CTA UI. `CinematicPage` supplies the semantic main element and leaves
layout to the caller. `Scene` supplies a semantic section/article with a focus target.

Existing homepage sections register progress without pinning or transforms. Future
scenes may pass `pin`, `scrollDistance` in pixels (or a resize-aware function), and a
stable `buildTimeline` callback. That callback populates a paused GSAP timeline, whose
progress is set directly from ScrollTrigger's normalized 0–1 progress. No scrub lag is
added. Backward scrolling reverses the same timeline.

`onEnter` / `onLeave` are semantic activity callbacks in both scroll directions.
`onProgress` is for imperative motion work and runs only in full desktop motion mode.
Use `useCallback` for callbacks to avoid recreating the context on parent renders.
`gsap.context().revert()` restores styles, removes pins, and destroys owned triggers and
timelines on unmount or breakpoint/preference changes. No global `killAll()` is used.
Child image loads and font readiness request a safe refresh, deferred until active
scrolling finishes so asset loading cannot interrupt an anchor jump.

The scene store has two subscriptions: `subscribe` for DOM/WebGL progress consumers,
and `subscribeNavigation` for active chapter changes. Never put per-frame progress into
React component state. `useSceneNavigation` exposes active scene/project/index and
`jumpToScene`, which focuses the section and updates its hash without changing routes.

**Before introducing actual pinned layouts:** the current main has `overflow-hidden`
and featured text has existing sticky rules. The design phase must choose the scroll
container and remove conflicting overflow/transform ownership. Do not pin nested
scenes or have CSS transitions and GSAP own the same transform. Long scroll distances
are applied only on full-motion desktop; mobile/tablet/static modes keep natural flow.

## Scrolling

The root currently enables Lenis for desktop (1280px+) with a fine pointer and no
reduced-motion preference. `smoothScroll={false}` on the shell returns all devices to
native scrolling. Touch interpolation is disabled, and tablet/mobile use native scroll.
`data-lenis-prevent` keeps the existing menu's internal scroll native.

Lenis uses `autoRaf: false`. The shared GSAP ticker adapter supplies milliseconds, and
Lenis scroll events call `ScrollTrigger.update`. Lenis CSS prevents competing CSS smooth
scrolling while active. Anchors remain enabled. The programmatic scene-jump API uses
Lenis when available and native `scrollIntoView` otherwise.

No wheel handler, scroller proxy, manual history-restoration mode, or unconditional
scroll-to-top is added. Route changes destroy/recreate the Lenis instance. Browser
history and pageshow resynchronize with the native scroll position.
The hero anchor uses Next Link so its history entry retains App Router state; the
scene-jump API also preserves existing history state when adding a hash.

Reference: https://github.com/darkroomengineering/lenis#gsap-scrolltrigger
Lifecycle reference: https://gsap.com/docs/v3/GSAP/gsap.context()/

## WebGL

Plain Three.js keeps camera, renderer, and scene progress directly controlled without
adding a second declarative scene graph. React Three Fiber is not installed.

`VisualLayer` is lazy-loaded on tablet/desktop only when motion is allowed. Its canvas
persists across route changes and is transparent, fixed, pointer-inert, and behind the
DOM. The current opaque page/background still supplies the visible presentation.

The empty scene renders only on initialization, resize, scene-state changes, and tab
reactivation. There is no perpetual WebGL animation loop. Camera aspect and renderer
size update on resize; DPR is capped at 1.5. `scene.userData.scenes` receives the scene
store snapshots as the initial integration point for future visual modules. It is not
a shader framework or a finished visual model.

Creation failure leaves all content in the DOM and reports a warning. Context loss
pauses rendering; restoration resizes/renders again. Cleanup removes subscriptions and
listeners, disposes the renderer, and releases the context. When actual visual resources
are added, their owner must dispose geometries, materials, textures, and render targets.

Reference: https://threejs.org/docs/pages/WebGLRenderer.html

## Motion, responsiveness, and performance

`useReducedMotion` observes OS changes live, with a conservative server snapshot.
Reduced motion means no Lenis interpolation, no WebGL allocation, no scene pinning,
no cinematic timeline/progress transforms, a static Canvas 2D background, and direct
navigation instead of the expanding-circle transition for new navigations.

Experience classes: mobile below 768px; tablet 768–1279px; desktop 1280px and above.
These classify capabilities, not final layouts. `--scene-viewport` uses `100svh`;
the visual canvas uses `100dvh`; safe-area variables and bottom-nav positioning are
available. Existing responsive content composition is preserved.

`subscribeFrame` is a small GSAP ticker adapter shared by Lenis and the existing Canvas
2D effects. It adds one ticker callback for all subscribers, detaches it while hidden,
and removes it when unused. Call the returned unsubscribe function from every effect.
The background also clears its delayed lightning callbacks on cleanup. The route
overlay's single reveal RAF is a state transition, not another animation loop.
Detached canvases also guard against the interval before React passive cleanup runs.

## Image pipeline

The original uploaded Next config disabled optimization; no static-export setting or
documented hosting restriction was found. Next optimization is restored with AVIF/WebP
format negotiation. Raster images now supply responsive `sizes`; existing CSS crops
remain unchanged. Only portrait images remain prioritized. SVGs keep vector delivery.

The original three 4096×4096 icon assets are retained. `public/icons/` contains exact
resampled derivatives: 180×180 Apple icon and two 32×32 variants. The Apple metadata
uses the 180px derivative. The normal favicon remains the existing ROOTONSET asset.
No logo was redrawn, cropped, recolored, or replaced with invented art.

Production hosting must support Next's image endpoint (or a compatible loader), and
any proxy must forward the Accept header for format negotiation.
Reference: https://nextjs.org/docs/app/api-reference/components/image

## Validation commands

Run from `portfolio/`:

```sh
npm run lint
npm run typecheck
npm run build
npm test
```

The committed lockfile is pnpm's. Install with `corepack pnpm install --frozen-lockfile`.
Playwright uses an isolated dev server on port 3100 by default, or an existing server
specified by `PLAYWRIGHT_BASE_URL`. Test output is ignored by git.

## Waiting for visual direction

Chapter composition, exact pin distances, typography changes, camera paths, mobile
editorial layouts, project palettes, photography/screenshots, project-index UI,
persistent CTA design, textures/shaders, and replacement of the old background/route
overlay all remain undecided. Conduit/Merkat need supplied portfolio content and assets.
