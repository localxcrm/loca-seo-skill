// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import config from '../../site.config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(config.business.url),
  title: {
    default: `${config.business.name} | ${config.gbpCategories.primary} ${config.address.city}`,
    template: `%s | ${config.business.name}`,
  },
  description: config.business.description,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: config.business.url,
    siteName: config.business.name,
    images: [
      {
        url: config.business.image,
        width: 1200,
        height: 630,
        alt: config.business.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: config.business.name,
    description: config.business.description,
    images: [config.business.image],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
