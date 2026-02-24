
import type { Metadata } from 'next';
import { PT_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { FloatingCta } from '@/components/layout/FloatingCta';
import { Chatbot } from '@/components/chatbot/Chatbot';
import { FirebaseClientProvider } from '@/firebase';
import { GoogleAnalytics, NoscriptGTM } from '@/components/layout/GoogleAnalytics';
import { SmoothScroll } from '@/components/shared/SmoothScroll';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair',
  display: 'swap',
});

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
    <html lang="en" suppressHydrationWarning className={`${ptSans.variable} ${playfair.variable} scroll-smooth`}>
      <head>
        <GoogleAnalytics />
      </head>
      <body className="font-body antialiased overflow-x-hidden bg-floral-pattern">
        <NoscriptGTM />
        <FirebaseClientProvider>
          <SmoothScroll>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
            <FloatingCta />
            <Chatbot />
            <Toaster />
          </SmoothScroll>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
