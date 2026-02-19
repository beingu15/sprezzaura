
type FAQ = {
  question: string;
  answer: string;
};

type ServiceContact = {
  whatsapp: string;
  email: string;
  facebook: string;
  instagram: string;
};

type Service = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  imageId: string;
  faqs: FAQ[];
  contact?: ServiceContact;
};

export const services: Service[] = [
  {
    slug: 'cleaning-services',
    title: 'Commercial & Residential Cleaning',
    description: 'Professional cleaning solutions for offices, retail stores, and homes across Melbourne, designed to maintain clean, hygienic, and well-presented environments.',
    longDescription: `
      <p>Sprezzaura is a trusted commercial and residential cleaning service company based in Melbourne, Australia. We provide professional cleaning solutions for office, retail store, commercial spaces, apartments and residential homes. Our services are designed to maintain clean, hygienic and well-presented environments for businesses and households across Melbourne.</p>
      
      <h4 class="font-bold text-xl mt-6 mb-3 font-headline">Commercial Cleaning Services</h4>
      <p>Our hourly commercial cleaning services are perfect for businesses that need flexible and efficient cleaning support. Office cleaning includes dusting, vacuuming, and surface sanitizing to maintain a hygienic and productive workplace. Retail store cleaning focuses on floors, shelves, counters, and restrooms to ensure a spotless shopping experience for customers. We also provide complete commercial cleaning for high-traffic areas and post-construction cleaning services to remove dust and debris after renovations.</p>
      
      <h4 class="font-bold text-xl mt-6 mb-3 font-headline">Office Cleaning by Size</h4>
      <p>We provide office cleaning services based on office size or area, ensuring cost-effective solutions for businesses of all scales. Small offices (up to 1,000 sq ft) receive basic cleaning and trash removal. Medium offices (1,000 - 3,000 sq ft) benefit from comprehensive cleaning of floors, desks, restrooms, and kitchen areas. Large offices (above 3,000 sq ft) receive full commercial cleaning customized to complex layouts.</p>
      
      <h4 class="font-bold text-xl mt-6 mb-3 font-headline">Specialized & Residential Services</h4>
      <p>Our specialized services include end-of-lease cleaning, steam carpet cleaning, hard floor scrubbing/polishing, and window cleaning. For residential clients, we provide regular regular cleaning, spring cleaning, and detailed room-based services for kitchens, bathrooms, bedrooms, and living areas. Our team is trained, insured, and committed to delivering dependable cleaning services that suit your space, needs, and budget.</p>
    `,
    features: [
      'Hourly Office & Retail Cleaning',
      'End-of-Lease Cleaning',
      'Post-Construction Cleaning',
      'Carpet Steam Cleaning',
      'Hard Floor Scrubbing & Polishing',
      'Residential Spring Cleaning',
      'Customized Cleaning Plans',
      'Eco-Friendly Products'
    ],
    imageId: 'cleaning-service',
    contact: {
      whatsapp: '+61 0485599796',
      email: 'sprezzauracleaningservice@gmail.com',
      facebook: 'https://www.facebook.com/share/1Ftr6RMXLR/',
      instagram: 'https://www.instagram.com/sprezzaura_cleaning_service?igsh=N3p1ZHh3bnVkNzdz'
    },
    faqs: [
      {
        question: "What areas do you service in Melbourne?",
        answer: "We provide professional cleaning solutions for offices, retail stores, commercial spaces, apartments, and residential homes across all of Melbourne and its surrounding suburbs."
      },
      {
        question: "Why choose Sprezzaura for cleaning?",
        answer: "Our team is fully trained and insured. We use professional equipment and safe, eco-friendly cleaning products to maintain hygienic and well-organized environments that support healthy living."
      },
      {
        question: "Do you offer flexible scheduling?",
        answer: "Yes, we offer flexible scheduling and customized cleaning plans tailored to suit your specific space, needs, and budget."
      }
    ]
  },
  {
    slug: 'home-decor',
    title: 'Property Staging & Home Decor',
    description: 'Full-service property staging, furniture rental, and interior styling solutions for homes, apartments, and luxury properties in Melbourne.',
    longDescription: `
      <p>SPREZZAURA is a full-service interior designing and home decor company in Melbourne, Australia, specializing in property staging, furniture rental and styling solutions for homes, apartments and luxury properties. Our aim is to highlight visual appeal, improve space functionality and help properties sell or rent faster through professional design and styling.</p>
      
      <h4 class="font-bold text-xl mt-6 mb-3 font-headline">Property Staging Services</h4>
      <p>Our property or home staging services are designed to transform empty or lived-in spaces into beautifully styled homes that attract buyers and tenants. From modern apartments to luxury villas, we create cozy interiors using organized furniture, decor and layouts that enhance the property’s best features.</p>
      
      <h4 class="font-bold text-xl mt-6 mb-3 font-headline">Terms & Flexibility</h4>
      <p>The minimum staging period is 1 month, with long-term discounts available for 3 months and above. Custom pricing is based on property size and design style. We focus on creating inviting spaces that help your property stand out in the Melbourne market.</p>
    `,
    features: [
      'Complete Furniture & Styling Solutions',
      'Monthly Home Staging Packages',
      'Luxury Home Staging',
      'Room-Based Staging Services',
      'On-Site or Virtual Design Consultation',
      'Furniture Rental & Logistics',
      'Outdoor and Balcony Staging',
      'Home Office Setup'
    ],
    imageId: 'decor-service',
    contact: {
      whatsapp: '+61 420 809 418',
      email: 'sprezzaurainteriorandhomedecor@gmail.com',
      facebook: 'https://www.facebook.com/share/1X5jw3WE4H/',
      instagram: 'https://www.instagram.com/sprezzaura_homedecor?igsh=MXhpdXppNWRsMjQwZg=='
    },
    faqs: [
      {
        question: "What is the minimum staging period?",
        answer: "The minimum staging period is 1 month. We offer significant discounts for longer-term rentals of 3 months or more."
      },
      {
        question: "Do you handle the furniture transport?",
        answer: "Yes, our service is full-service, including furniture rental, logistics, and professional styling on-site."
      }
    ]
  },
  {
    slug: 'event-management',
    title: 'Event Management',
    description: 'End-to-end event management service in Melbourne, specialising in complete event planning, coordination, décor styling, and flawless onsite execution.',
    longDescription: `
      <p>SPREZZAURA provides end to end event management service in Melbourne, specialising in complete event planning, coordination, décor styling, and flawless onsite execution. We handle every stage of the event journey from concept development and venue selection to vendor coordination, scheduling, and event day management.</p>
      
      <h4 class="font-bold text-xl mt-6 mb-3 font-headline">Comprehensive Event Planning</h4>
      <p>Our team manages events of all sizes and styles, including private events, weddings and corporate events, ensuring each event is carefully tailored to suit your vision, budget and timeline. With experienced event planners, trusted industry partners and a dedicated on-site team, we take care of all the details so you can enjoy a smooth stress-free and memorable event experience from start to finish.</p>
      
      <h4 class="font-bold text-xl mt-6 mb-3 font-headline">Service Packages</h4>
      <p>We offer fully customizable event management services designed to suit events of all sizes. We provide guest-based event packages including an Intimate Event Package (up to 21 guests), a Classic Event Package (up to 40 guests), and a Wedding or Engagement Package (up to 50 guests).</p>
      
      <h4 class="font-bold text-xl mt-6 mb-3 font-headline">Event Add-Ons</h4>
      <p>To enhance the event experience, we offer add-ons such as photo booths, cocktail or soft drink bar stations, kids play zones, themed candy carts, and chocolate fountain machines. Our décor and styling services range from basic theme upgrades to luxury décor setups and elegant floral arrangements.</p>
    `,
    features: [
      'Complete Event Planning & Coordination',
      'Guest-Based Event Packages',
      'Wedding & Engagement Packages',
      'Corporate Event Management',
      'Vendor & Venue Coordination',
      'Themed Décor & Styling Add-Ons',
      'On-Site Supervision & Execution',
      'Experience Stations (Photo Booths, Bars)'
    ],
    imageId: 'events-service',
    contact: {
      whatsapp: '+61 0494618956',
      email: 'sprezzauraeventmanagement@gmail.com',
      facebook: 'https://www.facebook.com/share/1BvbRdhp59/',
      instagram: 'https://www.instagram.com/sprezzauraeventmanagement?igsh=bnZsdGI4NDViampi'
    },
    faqs: [
      {
        question: "What types of events do you manage?",
        answer: "Sprezzaura manages events of all sizes and styles, including private events, weddings, and large-scale corporate events."
      },
      {
        question: "Can I customize the event package?",
        answer: "Absolutely. Every detail is thoughtfully tailored to match your vision, budget, and timeline. Our guest-based packages are just a starting point."
      }
    ]
  },
];

export const portfolioItems = [
  { id: 1, title: 'Minimalist Kitchen Deep Clean', category: 'Cleaning', imageId: 'portfolio-1' },
  { id: 2, title: 'Cozy Living Room Refresh', category: 'Decor', imageId: 'portfolio-2' },
  { id: 3, title: 'Lakeside Wedding Reception', category: 'Events', imageId: 'portfolio-3' },
  { id: 4, title: 'Modern Bathroom Sanitization', category: 'Cleaning', imageId: 'portfolio-4' },
  { id: 5, title: 'Bohemian Reading Nook', category: 'Decor', imageId: 'portfolio-5' },
  { id: 6, title: 'Annual Corporate Gala', category: 'Events', imageId: 'portfolio-6' },
];

export const testimonials = [
  {
    quote: "Sprezzaura transformed our chaotic house into a sanctuary. Their attention to detail in cleaning is unmatched!",
    name: 'Alex Johnson',
    title: 'Homeowner'
  },
  {
    quote: "The home decor team has an incredible eye for style. They listened to my ideas and brought them to life beautifully.",
    name: 'Samantha Lee',
    title: 'Client'
  },
  {
    quote: "Our company's annual event was a massive success, all thanks to Sprezzaura's meticulous planning and execution.",
    name: 'David Chen',
    title: 'Corporate Manager'
  }
];

export const faqs: FAQ[] = [
  {
    question: "What areas do you service in Melbourne?",
    answer: "We service the entire Melbourne metro area and surrounding suburbs, providing reliable cleaning, event, and decor services wherever you are."
  },
  {
    question: "Are your cleaning products eco-friendly and safe?",
    answer: "Yes, we prioritize your health and the environment. We use high-quality, eco-friendly, and non-toxic cleaning products that are safe for children, pets, and allergy sufferers."
  },
  {
    question: "How do I get a customized quote for a service?",
    answer: "You can get a quote by filling out the contact form on our website or giving us a call. For cleaning, you can also use our online cost estimator. For events and home staging, we provide a custom quote after a brief consultation."
  },
  {
    question: "Can I customize my service package?",
    answer: "Absolutely! All our services are fully customizable. We work with you to create a plan that fits your specific needs, budget, and schedule."
  }
];

export type VideoSlide = {
  id: number;
  title: string;
  subtitle: string;
  posterImageId: string;
  videoUrl: string;
};

export const videoSlides: VideoSlide[] = [
  {
    id: 1,
    title: 'Impeccable Cleaning',
    subtitle: 'Bringing a new level of clean to your spaces.',
    posterImageId: 'video-poster-1',
    videoUrl: '/videos/cleaning.mp4',
  },
  {
    id: 2,
    title: 'Elegant Decor',
    subtitle: 'Styling that speaks to your personality.',
    posterImageId: 'video-poster-2',
    videoUrl: '/videos/cleaning.mp4',  },
  {
    id: 3,
    title: 'Memorable Events',
    subtitle: 'Crafting experiences that last a lifetime.',
    posterImageId: 'video-poster-3',
    videoUrl: '/videos/cleaning.mp4',  },
];
