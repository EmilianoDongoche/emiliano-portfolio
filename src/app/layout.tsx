import type { Metadata } from 'next';
import './globals.css';
import { siteConfig } from '@/data/site';
import { LanguageProvider } from '@/i18n/context';
import { ScrollRestoration } from '@/components/scroll-restoration';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: {
    canonical: `${siteConfig.url}/`,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${siteConfig.url}/`,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased">
        <LanguageProvider>
          <ScrollRestoration />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
