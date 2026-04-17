import { ParticleBackground } from "@/components/particle-background"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { PagesSection } from "@/components/pages-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <ParticleBackground />
      <Navigation />
      <HeroSection />
      <ProjectsSection />
      <AboutSection />
      <SkillsSection />
      <PagesSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
