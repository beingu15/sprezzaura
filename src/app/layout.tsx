
import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { FloatingCta } from '@/components/layout/FloatingCta';
import { Chatbot } from '@/components/chatbot/Chatbot';
import { FirebaseClientProvider } from '@/firebase';
import { GoogleAnalytics, NoscriptGTM } from '@/components/layout/GoogleAnalytics';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';

export const metadata: Metadata = {
  title: {
    default: 'Sprezzaura | Cleaning, Event Management, & Home Staging in Melbourne',
    template: '%s | Sprezzaura',
  },
  description: 'Sprezzaura provides professional cleaning, event management, and property staging services in Melbourne, Australia. Reliable solutions for commercial and residential clients.',
  keywords: ['commercial cleaning melbourne', 'residential cleaning melbourne', 'event management melbourne', 'property staging melbourne', 'home decor', 'office cleaning'],
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
        <GoogleAnalytics />
      </head>
      <body className="font-body antialiased overflow-x-hidden">
        <NoscriptGTM />
        <FirebaseClientProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <FloatingCta />
          <Chatbot />
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
