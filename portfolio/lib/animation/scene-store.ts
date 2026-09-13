export type SceneState = {
  id: string
  projectId?: string
  projectIndex?: string
  order: number
  progress: number
  active: boolean
}

type ActiveScene = Pick<SceneState, "id" | "projectId" | "projectIndex" | "order">

export const clampProgress = (value: number) => Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 0

export function createSceneStore() {
  const scenes = new Map<string, SceneState>()
  const progressListeners = new Set<() => void>()
  const navigationListeners = new Set<() => void>()
  let active: ActiveScene | null = null
  let scrollTo: ((element: HTMLElement) => void) | undefined

  function publish() {
    const next = [...scenes.values()].filter(scene => scene.active).sort((a, b) => b.order - a.order)[0] ?? null
    // Navigation subscribers only rerender at chapter changes, never every scroll frame.
    if (active?.id !== next?.id || active?.projectIndex !== next?.projectIndex) {
      active = next ? { id: next.id, projectId: next.projectId, projectIndex: next.projectIndex, order: next.order } : null
      navigationListeners.forEach(notify => notify())
    }
    progressListeners.forEach(notify => notify())
  }

  return {
    register(scene: Omit<SceneState, "progress" | "active">) {
      if (scenes.has(scene.id)) throw new Error(`Duplicate cinematic scene: ${scene.id}`)
      scenes.set(scene.id, { ...scene, progress: 0, active: false })
      publish()
      return () => { scenes.delete(scene.id); publish() }
    },
    update(id: string, progress: number, isActive: boolean) {
      const scene = scenes.get(id)
      if (!scene) return
      const next = clampProgress(progress)
      if (scene.progress === next && scene.active === isActive) return
      scenes.set(id, { ...scene, progress: next, active: isActive })
      publish()
    },
    getScene: (id: string) => scenes.get(id),
    getScenes: () => [...scenes.values()].sort((a, b) => a.order - b.order),
    getActive: () => active,
    setScrollTo(navigate: (element: HTMLElement) => void) {
      scrollTo = navigate
      return () => { if (scrollTo === navigate) scrollTo = undefined }
    },
    scrollTo(element: HTMLElement, reducedMotion: boolean) {
      if (scrollTo && !reducedMotion) scrollTo(element)
      else element.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth", block: "start" })
    },
    subscribe(notify: () => void) { progressListeners.add(notify); return () => { progressListeners.delete(notify) } },
    subscribeNavigation(notify: () => void) { navigationListeners.add(notify); return () => { navigationListeners.delete(notify) } },
  }
}

export type SceneStore = ReturnType<typeof createSceneStore>
