import { type Metadata } from 'next'

import { ClerkProvider } from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import { QueryProvider } from './context/QueryContext'
import { Analytics } from '@vercel/analytics/next';
import Footer from './components/Footer'


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
          <Header />
          <QueryProvider>
            {children}
          </QueryProvider>
          {/* Feedback Widget */}
          <script
            src="https://www.boosttoad.com/api/widget/bundle?projectId=0702def8-5da8-43aa-b682-9eb0a00f447f"
            async
          />
          {/* Vercel Analytics */}
          <Analytics />
          {/* Footer */}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}