import { Scene } from "@/components/cinematic/scene"
const principles = [
  {
    title: "I think about the product before the interface.",
    description:
      "Before styling a screen, I try to understand the problem, the user path, and what the product needs to make obvious.",
  },
  {
    title: "I can move between design and implementation.",
    description:
      "I am comfortable shaping the experience, building the React interface, debugging the details, and refining the result until it feels usable.",
  },
  {
    title: "I use AI to accelerate work, not replace judgment.",
    description:
      "AI helps me explore faster, but I still make the product decisions, inspect the output, and keep the work grounded.",
  },
]

export function AboutSection() {
  return (
    <Scene order={1} id="about" className="relative z-10 px-4 py-20 sm:px-6 sm:py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div
          className="grid gap-12 transition-all duration-700 lg:grid-cols-[0.72fr_1.28fr] lg:gap-18 translate-y-0 opacity-100"
        >
          <div>
            <p className="text-sm text-primary">Short introduction</p>
            <h2 className="mt-4 max-w-sm text-3xl text-foreground sm:text-5xl">
              I work across product design and implementation.
            </h2>
          </div>

          <div className="max-w-3xl">
            <p className="text-xl leading-relaxed text-foreground/88 sm:text-2xl">
              I am a Computer Engineering student in Istanbul, building products that sit between
              interface design, AI-assisted workflows, and practical software development.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              My best work starts as a messy idea and becomes something people can actually try:
              a financial product, a desktop assistant, a communication app, a research prototype,
              or a small interaction study. I care about the details that make a product feel
              understandable, not just impressive.
            </p>

            <div className="mt-14">
              <h3 className="text-2xl text-foreground sm:text-3xl">How I work</h3>
              <div className="mt-7 grid gap-7">
                {principles.map((principle) => (
                  <div key={principle.title} className="border-t border-border/70 pt-6">
                    <p className="text-lg font-medium leading-snug text-foreground">
                      {principle.title}
                    </p>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {principle.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Scene>
  )
}
