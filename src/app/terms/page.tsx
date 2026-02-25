
'use client';

import { PageHeader } from '@/components/shared/PageHeader';
import { GsapAnimator } from '@/components/shared/GsapAnimator';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function TermsPage() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using the services provided by Sprezzaura (including Cleaning, Event Management, and Home Decor), you agree to be bound by these Terms and Conditions. These terms apply to all visitors, users, and clients of our services in Melbourne, Victoria, Australia."
    },
    {
      title: "2. Cleaning Services",
      content: "Sprezzaura provides both commercial and residential cleaning. Clients are responsible for providing access to the premises at the scheduled time. While we take every precaution, Sprezzaura is not liable for pre-existing damage. We require 24-48 hours' notice for urgent bookings to ensure quality standards."
    },
    {
      title: "3. Event Management",
      content: "All event packages are fully customizable. A deposit is required to secure your date. Vendor and venue sourcing are provided as part of our service, but final contracts with third-party vendors are the responsibility of the client unless otherwise specified in your custom package."
    },
    {
      title: "4. Property Staging & Home Decor",
      content: "The minimum staging period is one (1) month. Monthly rental fees apply thereafter. Sprezzaura remains the owner of all rented furniture and decor. Clients are responsible for any damage or loss of staging items while on their property, which will be charged separately."
    },
    {
      title: "5. Pricing and Payments",
      content: "Prices vary based on property size, service type, and specific client requirements. Quotations provided are estimates and may be subject to change upon physical inspection. Payments can be made via EFT, bank transfer, or credit card. Late payments may incur administrative fees."
    },
    {
      title: "6. Cancellations and Rescheduling",
      content: "We understand plans change. For standard cleaning, please provide 24 hours' notice for cancellations. For Events and Staging, cancellation policies vary by project scale and are detailed in your specific service agreement. Deposits for major events may be non-refundable."
    },
    {
      title: "7. Liability and Insurance",
      content: "Sprezzaura is fully insured for public liability and professional indemnity. However, our liability is limited to the total value of the service provided. We operate in accordance with Australian Consumer Law."
    },
    {
      title: "8. Governing Law",
      content: "These terms are governed by the laws of Victoria, Australia. Any disputes arising from these terms will be subject to the exclusive jurisdiction of the courts in Melbourne."
    }
  ];

  return (
    <div className="bg-background/95 min-h-screen pb-24">
      <PageHeader 
        title="Terms & Conditions" 
        subtitle="The legal framework for our commitment to excellence." 
      />
      
      <div className="container mx-auto px-4 md:px-6 mt-12">
        <GsapAnimator className="max-w-4xl mx-auto">
          <Card className="border-none shadow-2xl bg-card overflow-hidden rounded-[2rem]">
            <CardContent className="p-8 md:p-12">
              <div className="prose prose-slate max-w-none">
                <p className="text-muted-foreground mb-10 text-lg italic border-l-4 border-primary/30 pl-6">
                  Last Updated: {new Date().toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })}
                </p>
                
                <div className="space-y-12">
                  {sections.map((section, index) => (
                    <div key={index} className="space-y-4">
                      <h2 className="text-2xl font-headline font-bold text-primary">{section.title}</h2>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {section.content}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-16 p-8 bg-secondary/30 rounded-2xl border border-border">
                  <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                  <p className="text-muted-foreground">
                    If you have any questions regarding these terms, please contact us at:<br />
                    <strong>Email:</strong> info@sprezzaura.au<br />
                    <strong>Phone:</strong> 1300 208 199<br />
                    <strong>Address:</strong> 8 Westgarth avenue, Mickleham VIC 3064, Australia
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </GsapAnimator>
      </div>
    </div>
  );
}
