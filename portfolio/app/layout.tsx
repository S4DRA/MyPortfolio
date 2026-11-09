import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import type { Viewport } from 'next'
import { PageTransitionProvider } from '@/components/page-transition-provider'
import { Toaster } from '@/components/ui/toaster'
import { CinematicShell } from '@/components/cinematic/cinematic-shell'
import 'lenis/dist/lenis.css'
import './globals.css'
import './pack-portfolio.css'
import './pack-inner.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export const metadata: Metadata = {
  title: 'Sadra Ahadiyan | Product-Focused Software and UI',
  description: 'Portfolio of Sadra Ahadiyan, a Computer Engineering student in Istanbul building product-focused software, interfaces, and AI-assisted workflows.',
  icons: {
    icon: '/rootonset.png',
    apple: '/icons/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <CinematicShell smoothScroll>
          <PageTransitionProvider>{children}</PageTransitionProvider>
        </CinematicShell>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
