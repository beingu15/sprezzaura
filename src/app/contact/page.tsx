
import { PageHeader } from '@/components/shared/PageHeader';
import { ContactForm } from '@/components/shared/ContactForm';
import { Mail, Phone, MapPin } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Sprezzaura for questions, quotes, or to discuss your next project in Melbourne.',
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Get in Touch"
        subtitle="We're here to help. Reach out to us with any questions or to get a quote for our services."
      />
      <div className="container mx-auto px-4 py-16 md:py-24 md:px-6 bg-background/95">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h2 className="text-3xl font-headline font-bold">Contact Information</h2>
            <p className="text-muted-foreground">
              Have a question or want to discuss a project? Fill out the form or use our contact details below. We look forward to hearing from you.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <MapPin className="h-6 w-6 text-accent" />
                <span className="text-muted-foreground">Melbourne, VIC, Australia</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-6 w-6 text-accent" />
                <span className="text-muted-foreground">(123) 456-7890</span>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="h-6 w-6 text-accent" />
                <span className="text-muted-foreground">contact@sprezzaura.com</span>
              </div>
            </div>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
}
