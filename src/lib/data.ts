
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
    description: 'Sprezzaura is a trusted commercial and residential cleaning service company based in Melbourne Australia, providing professional solutions for offices, retail stores, and homes.',
    longDescription: `
      <p>Sprezzaura is a professional commercial and residential cleaning service company based in Melbourne, Victoria, Australia. We provide reliable, high-quality cleaning solutions for businesses, property managers, tenants and home owners across Melbourne and surroundings.</p>
      
      <h4 class="font-bold text-xl mt-6 mb-2 font-headline">Commercial Cleaning Solutions</h4>
      <p>Our commercial cleaning services include hourly office cleaning with dusting, vacuuming, and surface sanitising, retail store cleaning covering floors, shelves, counters, and restrooms, deep commercial cleaning for high-traffic areas, and post-construction cleaning after renovations or fit-outs.</p>
      
      <h4 class="font-bold text-xl mt-4 mb-2 font-headline">Office Cleaning by Size</h4>
      <p>We provide office cleaning based on size, including small offices up to 1,000 sq. ft. with basic cleaning and trash removal, medium offices from 1,000 to 3,000 sq. ft. covering floors, desks, restrooms, and kitchens, and large offices above 3,000 sq. ft. with full commercial cleaning.</p>
      
      <h4 class="font-bold text-xl mt-4 mb-2 font-headline">Residential Cleaning Services</h4>
      <p>Our residential cleaning service include regular cleaning, spring cleaning and detailed room based services for kitchen, bathroom, bedrooms and living areas. For residential clients, we provide hourly regular, deep, spring, and post-construction cleaning, standard apartment and house cleaning for one, two, and three-bedroom homes.</p>
    `,
    features: [
      'Hourly Office & Retail Cleaning',
      'Small to Large Office Maintenance',
      'End-of-Lease Cleaning',
      'Post-Construction Cleaning',
      'Carpet Steam Cleaning',
      'Hard Floor Scrubbing & Polishing',
      'Residential Spring Cleaning',
      'Kitchen Appliance Deep Cleaning',
      'Bathroom & Bedroom Services',
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
        question: "What does Sprezzaura Pty Ltd do for cleaning?",
        answer: "Our residential services include pre- and post-lease cleaning as well as pre- and post-construction cleaning. We are also experienced in cleaning offices, schools, childcare centres, churches, gyms, medical clinics, and other commercial facilities."
      },
      {
        question: "Why choose Sprezzaura Group?",
        answer: "Our fully trained professional cleaners take pride in delivering consistently high standards. We tailor our services to each client’s needs—whether it be residential, commercial, or specialised cleaning—creating healthier, fresher, and more welcoming environments every time."
      },
      {
        question: "Do I need to stay during the cleaning appointment?",
        answer: "No, you are not required to stay. For commercial spaces, our team can clean after hours to avoid disrupting operations."
      }
    ]
  },
  {
    slug: 'home-decor',
    title: 'Property Staging & Home Decor',
    description: 'Sprezzaura is a full-service interior designing and home decor company in Melbourne, Australia, specializing in property staging and furniture rental.',
    longDescription: `
      <p>SPREZZAURA is a full-service interior designing and home decor company in Melbourne, Australia, specializing in property staging, furniture rental and styling solutions for homes, apartments and luxury properties. Our aim is to highlight visual appeal, improve space functionality and help properties sell or rent faster through professional design and styling.</p>
      
      <h4 class="font-bold text-xl mt-6 mb-2 font-headline">Property Staging Services</h4>
      <p>SPREZZAURA’s property or home staging services are designed to transform empty or lived-in spaces into beautifully styled homes that attract buyers and tenants. From modern apartments to luxury villas, we create cozy interiors using organized furniture, decor and layouts that enhance the property’s best features.</p>
      
      <h4 class="font-bold text-xl mt-4 mb-2 font-headline">Flexible Staging Packages</h4>
      <p>Minimum staging period is 1 month, long-term discounts are available for 3 months and above. Custom pricing is based on property size and design style. We offer monthly home staging packages that include furniture, decor, and professional styling for properties of all sizes.</p>
    `,
    features: [
      'Complete Property Staging',
      'Monthly Staging Packages',
      'Luxury Home Styling',
      'Furniture Rental Services',
      'Room-Based Staging Solutions',
      'On-Site Design Consultation',
      'Outdoor & Balcony Staging',
      'Apartment & Villa Transformation'
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
        question: "What is property staging?",
        answer: "Property staging is the process of furnishing and styling a property to make it visually attractive and market-ready for buyers or tenants."
      },
      {
        question: "How long is the minimum staging period?",
        answer: "The minimum staging period is one month. Discounts are available for a longer duration of 3 months and above."
      }
    ]
  },
  {
    slug: 'event-management',
    title: 'Event Management',
    description: 'Sprezzaura provides end to end event management service in Melbourne, specialising in planning, coordination, and décor styling.',
    longDescription: `
      <p>SPREZZAURA provides end to end event management service in Melbourne, specialising in complete event planning, coordination, décor styling, and flawless onsite execution. We handle every stage of event journey from concept development and venue selection to vendor coordination, scheduling, and event day management.</p>
      
      <h4 class="font-bold text-xl mt-6 mb-2 font-headline">Event Management Company Profile</h4>
      <p>Our team manages events of all sizes and styles, including private events, weddings and corporate events, ensuring each event is carefully tailored to suit your vision, budget and timeline. From intimate gatherings to weddings and large scale corporate events Sprezzaura manages events of all sizes and all styles.</p>
      
      <h4 class="font-bold text-xl mt-4 mb-2 font-headline">Comprehensive Event Services</h4>
      <p>SPREZZAURA offers fully customisable event management services in Melbourne. We provide guest based event packages including an Intimate Event Package for up to 21 guests, a Classic Event Package for up to 40 guests, and a Wedding or Engagement Package for up to 50 guests.</p>
    `,
    features: [
      'End-to-End Event Planning',
      'Intimate Event Package (21 Guests)',
      'Classic Event Package (40 Guests)',
      'Wedding Package (50 Guests)',
      'Themed Décor Styling',
      'Vendor & Venue Coordination',
      'Photo Booth Add-ons',
      'Cocktail & Bar Stations',
      'Kids Play Zone Management',
      'On-site Event Supervision'
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
        question: "What types of events does Sprezzaura manage?",
        answer: "We manage a wide range of events, including weddings, private parties, corporate events, expos, trade shows, school functions, festivals, and concerts."
      },
      {
        question: "Do you customise your event services?",
        answer: "Yes! Sprezzaura tailors every event to your specific needs, preferences, and budget. Every detail is planned to make your event unique and memorable."
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
    answer: "You can get a quote by filling out the contact form on our website or giving us a call. For cleaning, you can also use our online cost estimator."
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
