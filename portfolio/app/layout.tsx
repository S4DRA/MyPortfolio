import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import type { Viewport } from 'next'
import { PageTransitionProvider } from '@/components/page-transition-provider'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export const metadata: Metadata = {
  title: 'Sadra Ahadiyan | AI Systems Builder and Software Engineer',
  description: 'Portfolio of Sadra Ahadiyan. I build AI systems, software products, and technical experiences designed to solve real problems and create measurable impact.',
  generator: 'v0.app',
  icons: {
    icon: '/rootonset.png',
    apple: '/apple-icon.png',
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
        <PageTransitionProvider>{children}</PageTransitionProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
