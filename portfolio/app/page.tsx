import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { PagesSection } from "@/components/pages-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { CinematicPage } from "@/components/cinematic/cinematic-page"
import { AtelierEffects } from "@/components/atelier-effects"

export default function HomePage() {
  return (
    <CinematicPage className="atelier-home relative min-h-screen overflow-hidden bg-background text-foreground">
      <AtelierEffects />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <PagesSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </CinematicPage>
  )
}
