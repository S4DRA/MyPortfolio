import { Scene } from "@/components/cinematic/scene"
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react"

const contactLinks = [
  {
    label: "Email",
    value: "sadra.ahadiyan@bahcesehir.edu.tr",
    href: "mailto:sadra.ahadiyan@bahcesehir.edu.tr",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/sadra-ahadiyan",
    href: "https://www.linkedin.com/in/sadra-ahadiyan",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    value: "github.com/S4DRA",
    href: "https://github.com/S4DRA",
    icon: Github,
  },
  {
    label: "CV",
    value: "Download resume",
    href: "/sadra-ahadiyan-cv.pdf",
    icon: Download,
  },
]

export function ContactSection() {
  return (
    <Scene order={12} id="contact" className="relative z-10 px-4 py-24 sm:px-6 sm:py-32 md:py-40">
      <div className="mx-auto max-w-5xl">
        <div
          className="transition-all duration-700 translate-y-0 opacity-100"
        >
          <div className="max-w-3xl">
            <p className="text-sm text-primary">Contact</p>
            <h2 className="mt-4 text-4xl text-foreground sm:text-6xl">
              I am looking for the next place to contribute.
            </h2>
            <p className="mt-7 text-base leading-relaxed text-muted-foreground sm:text-lg">
              I am currently looking for opportunities where I can contribute across product,
              design, software, or technical support. If my work feels relevant to your team, feel
              free to reach out.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {contactLinks.map((link) => {
              const Icon = link.icon
              const isDownload = link.href.endsWith(".pdf")

              return (
                <a
                  key={link.label}
                  href={link.href}
                  download={isDownload ? true : undefined}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex min-h-24 items-center justify-between gap-5 border border-border/70 bg-card/45 p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:bg-card/72 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <span>
                    <span className="block text-sm text-muted-foreground">{link.label}</span>
                    <span className="mt-2 block break-all text-base font-medium text-foreground">
                      {link.value}
                    </span>
                  </span>
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-border/70 text-primary transition-colors group-hover:border-primary/40">
                    <Icon className="h-5 w-5" />
                  </span>
                </a>
              )
            })}
          </div>

          <a
            href="mailto:sadra.ahadiyan@bahcesehir.edu.tr?subject=Portfolio%20Opportunity"
            className="mt-10 inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-foreground bg-foreground px-6 py-3 text-sm font-medium text-background transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Send an email
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </Scene>
  )
}
