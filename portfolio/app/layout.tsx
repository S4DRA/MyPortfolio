import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import type { Viewport } from 'next'
import { PageTransitionProvider } from '@/components/page-transition-provider'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export const metadata: Metadata = {
  title: 'Sadra Ahadiyan | Computer Engineering Student',
  description: 'Portfolio of Sadra Ahadiyan - Computer Engineering Student specializing in AI, Computer Vision, and Game Development',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.JPG',
        type: 'image/jpeg',
      },
    ],
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
        <Analytics />
      </body>
    </html>
  )
}
