
import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { FloatingCta } from '@/components/layout/FloatingCta';

export const metadata: Metadata = {
  title: {
    default: 'Sprezzaura | Cleaning, Decor, and Event Management',
    template: '%s | Sprezzaura',
  },
  description: 'Expert services in cleaning, home accessories & decor, and event management. Sprezzaura brings sophistication and ease to your space.',
  keywords: ['cleaning services', 'home decor', 'event management', 'interior styling', 'professional organizing'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <FloatingCta />
        <Toaster />
      </body>
    </html>
  );
}
