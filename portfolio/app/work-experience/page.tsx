import type { Metadata } from "next"
import { PortfolioPage } from "@/components/portfolio-page"

export const metadata: Metadata = {
  title: "Work Experience | Sadra Ahadiyan",
  description: "Professional experience across software development, student support, and healthcare assistance.",
}

export default function WorkExperiencePage() {
  return (
    <PortfolioPage
      eyebrow="Career"
      title="Work Experience"
      intro="My work experience combines technical problem-solving with people-focused support. I have worked in software development, university administration, and healthcare assistance, building both practical systems and direct human trust along the way."
      metrics={[
        { label: "Roles", value: "3 Positions" },
        { label: "Core Strength", value: "Problem Solving" },
        { label: "Technical Focus", value: "Full-Stack Development" },
        { label: "People Focus", value: "Support + Guidance" },
      ]}
      sections={[
        {
          title: "What I Bring To A Team",
          description:
            "Across each role, I worked best where responsibility, clarity, and follow-through mattered most.",
          items: [
            "I solve problems directly, whether the issue is technical, operational, or communication-based.",
            "I stay patient with users and teammates while working through systems that can feel confusing or stressful.",
            "I take ownership of the details, from debugging errors to making sure solutions are actually delivered and working.",
          ],
        },
        {
          title: "How These Roles Connect",
          description:
            "Even though these jobs were in different environments, they strengthened the same core abilities.",
          items: [
            "Technical work at Exairon improved my debugging, deployment, and product thinking skills.",
            "Administrative support at BAU strengthened my communication, organization, and problem-handling under pressure.",
            "Patient guidance at BAU Dental Hospital deepened my empathy, responsibility, and ability to explain difficult situations clearly.",
          ],
        },
      ]}
      showcases={[
        {
          title: "Exairon Company",
          description:
            "At Exairon, I worked as a Full-Stack Developer on an AI-based client interaction platform built for other companies. My responsibilities included fixing bugs, improving system reliability, and developing a documentation website that helped users understand how to use the platform. During this role, I strengthened my React.js and Next.js skills, handled issues across multiple areas of the product, and took ownership of several important fixes including email flows, phone-related system behavior, client information storage, and broader error handling. I also redeployed corrected versions of the system and continued refining the platform as I found additional glitches and edge cases.",
          tags: ["Full-Stack", "React.js", "Next.js"],
        },
        {
          title: "BAU International Office",
          description:
            "As a Student Assistant at the BAU International Office, I supported students through registration and helped them navigate their academic experience. I organized office tasks, responded to student concerns, and guided students step by step when they faced issues related to registration, academic systems, or course processes. This role strengthened my ability to manage a high volume of work while staying clear, patient, and solution-oriented.",
          tags: ["Student Support", "Administration", "Communication"],
        },
        {
          title: "BAU Dental Hospital",
          description:
            "At BAU Dental Hospital, I worked as a Student Assistant helping patients understand their treatment options and next steps. I supported patients by explaining different treatment paths, helping them understand affordable options, and guiding them after appointments when they had concerns or discomfort. When needed, I coordinated with doctors so patients could get the right support quickly. This role taught me how important empathy, clear communication, and calm problem-solving are in sensitive real-world situations.",
          tags: ["Patient Care", "Coordination", "Empathy"],
        },
      ]}
    />
  )
}
