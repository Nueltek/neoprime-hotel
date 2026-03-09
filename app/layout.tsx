import type { Metadata } from 'next';
import { Newsreader } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/components/providers/AuthProvider';

// Body font - Newsreader
const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
  style: ['normal', 'italic'],
  weight: ['300', '400', '500'],
});

export const metadata: Metadata = {
  title: 'Neoprime Hotels | Luxury Accommodation in Newcastle',
  description: 'Experience bold design, warm hospitality, and unmistakably Neoprime luxury. Book your stay at Neoprime Newcastle for exceptional accommodation, dining, and service.',
  keywords: ['luxury hotel', 'Newcastle', 'boutique hotel', 'fine dining', 'Neoprime Hotels'],
  authors: [{ name: 'Neoprime Hotels' }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.svg', type: 'image/svg+xml' },
    ],
  },
  openGraph: {
    title: 'Neoprime Hotels | Luxury Accommodation in Newcastle',
    description: 'Experience bold design, warm hospitality, and unmistakably Neoprime luxury.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Neoprime Hotels',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neoprime Hotels | Luxury Accommodation in Newcastle',
    description: 'Experience bold design, warm hospitality, and unmistakably Neoprime luxury.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={newsreader.variable} data-scroll-behavior="smooth">
      <body className="font-serif antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
