import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://projectforge-ai.vercel.app'),
  title: 'ProjectForge AI — Ready-to-Deploy IEEE Final Year Projects',
  description:
    'Live-demo-verified IEEE final year projects for B.Tech CSE/IT students. Source code + IEEE report + PPT + demo video + support, delivered as a full kit.',
  keywords: [
    'IEEE final year projects',
    'B.Tech CSE projects',
    'B.Tech IT projects',
    'final year project with source code',
    'IEEE base paper project',
  ],
  openGraph: {
    title: 'ProjectForge AI — Ready-to-Deploy IEEE Final Year Projects',
    description:
      'Live demos + full kits: source code, IEEE report, PPT, video, and support till submission.',
    type: 'website',
    siteName: 'ProjectForge AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ProjectForge AI — Ready-to-Deploy IEEE Final Year Projects',
    description:
      'Live demos + full kits: source code, IEEE report, PPT, video, and support till submission.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
