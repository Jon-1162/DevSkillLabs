import { type Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { QueryProvider } from './context/QueryContext'
import { Analytics } from '@vercel/analytics/next';
import Footer from './components/Footer'
import Script from 'next/script'   // ✅ Use this

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'DevSkillSets - Job Market Analytics',
  description: 'Data-driven insights for software engineering career decisions',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <QueryProvider>
            {children}
          </QueryProvider>

          {/* Boosttoad Widget */}
          <Script
            src="https://www.boosttoad.com/api/widget/bundle?projectId=0702def8-5da8-43aa-b682-9eb0a00f447f"
            strategy="afterInteractive"
          />

          {/* Google Analytics */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-HGHMF7LMXB"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-HGHMF7LMXB');
            `}
          </Script>

          <Analytics />
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}
