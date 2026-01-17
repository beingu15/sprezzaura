
type FAQ = {
  question: string;
  answer: string;
};

type Service = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  imageId: string;
  faqs: FAQ[];
};

export const services: Service[] = [
  {
    slug: 'cleaning-services',
    title: 'Commercial & Residential Cleaning',
    description: 'Professional cleaning solutions for offices, retail stores, and homes across Melbourne, designed to maintain clean, hygienic, and well-presented environments.',
    longDescription: `
      <p>SPREZZAURA offers complete commercial and residential cleaning services in Melbourne, Australia. Our services are designed to make your home a healthier and more comfortable place to live or to ensure your business is spotless and professional.</p>
      <h4 class="font-bold text-xl mt-4 mb-2 font-headline">Commercial Cleaning</h4>
      <p>Our hourly commercial cleaning services are perfect for businesses that need flexible and efficient cleaning support. This includes office cleaning (dusting, vacuuming, surface sanitizing), retail store cleaning (floors, shelves, counters, restrooms), deep commercial cleaning for high-traffic areas, and post-construction cleaning.</p>
      <h4 class="font-bold text-xl mt-4 mb-2 font-headline">Residential Cleaning</h4>
      <p>We offer flexible residential cleaning options, from hourly services to full-home solutions, customized to your lifestyle. Services include room and feature-based cleaning (carpet, window, balcony), detailed kitchen cleaning (appliances, ovens, cabinets), and thorough bathroom and bedroom services.</p>
    `,
    features: [
      'Hourly Office & Retail Cleaning',
      'End-of-Lease Cleaning',
      'Post-Construction Cleaning',
      'Carpet Steam Cleaning',
      'Hard Floor Scrubbing & Polishing',
      'Residential Spring Cleaning',
      'Room-Based Detail Services',
      'Kitchen & Bathroom Deep Cleans'
    ],
    imageId: 'cleaning-service',
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
        answer: "No, you are not required to stay. For commercial spaces, our team can clean after hours to avoid disrupting operations. For residential cleaning, you may remain or leave, whatever is most convenient for you."
      },
      {
        question: "What time will our cleaning professionals arrive?",
        answer: "With Sprezzaura, you choose the start time, and we’ll be there promptly to take care of your space."
      },
      {
        question: "Can I book same-day cleaning?",
        answer: "We typically ask for 24 to 48 hours’ notice for urgent bookings to coordinate our team and ensure quality service."
      }
    ]
  },
  {
    slug: 'home-decor',
    title: 'Property Staging & Home Decor',
    description: 'Full-service property staging, furniture rental, and interior styling solutions for homes, apartments, and luxury properties in Melbourne.',
    longDescription: `
      <p>SPREZZAURA is a full-service interior designing and home decor company in Melbourne, Australia. Our aim is to highlight visual appeal, improve space functionality, and help properties sell or rent faster through professional design and styling.</p>
      <h4 class="font-bold text-xl mt-4 mb-2 font-headline">Property Staging Services</h4>
      <p>Our home staging services are designed to transform empty or lived-in spaces into beautifully styled homes that attract buyers and tenants. From modern apartments to luxury villas, we create cozy interiors using organized furniture, decor, and layouts that enhance the property’s best features.</p>
      <h4 class="font-bold text-xl mt-4 mb-2 font-headline">Styling and Interior Design</h4>
      <p>We provide professional interior styling and design services suited to your lifestyle and property needs. This includes on-site or virtual design consultation, mood boards, theme-based styling plans, and accessory styling.</p>
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
    faqs: [
      {
        question: "What is property staging?",
        answer: "Property staging is the process of furnishing and styling a property to make it visually attractive and market-ready for buyers or tenants."
      },
      {
        question: "How long is the minimum staging period?",
        answer: "The minimum staging period is one month. Discounts are available for a longer duration."
      },
      {
        question: "Do you offer furniture rental without full staging?",
        answer: "Yes, we offer room-based furniture rental and styling services."
      },
      {
        question: "Is luxury home staging available?",
        answer: "Yes, we are experts in luxury home staging using designer furniture and top-most decor."
      },
      {
        question: "Do you provide virtual consultation?",
        answer: "Of course, we offer both on-site and virtual interior design consultation."
      }
    ]
  },
  {
    slug: 'event-management',
    title: 'Event Management',
    description: 'End-to-end event management service in Melbourne, specialising in complete event planning, coordination, décor styling, and flawless onsite execution.',
    longDescription: `
      <p>SPREZZAURA provides end-to-end event management service in Melbourne, handling every stage of the event journey from concept development and venue selection to vendor coordination, scheduling, and event day management.</p>
      <h4 class="font-bold text-xl mt-4 mb-2 font-headline">Fully Customisable Event Packages</h4>
      <p>We understand that no two events are similar. Our packages are designed to be fully customisable, enabling you to choose the services, themes, and add-ons that best suit your event size, style, and budget. We manage private events, weddings, and corporate events of all sizes.</p>
      <h4 class="font-bold text-xl mt-4 mb-2 font-headline">Decor and Experience Add-Ons</h4>
      <p>To enhance guest engagement, we offer a range of add-ons, including photo booths, cocktail bars, kids' play zones, candy carts, and chocolate fountains. Our decor and styling add-ons can boost the visual attraction of your event, from basic theme upgrades to luxury decor setups.</p>
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
    faqs: [
      {
        question: "What types of events does Sprezzaura manage?",
        answer: "We manage a wide range of events, including weddings, private parties, corporate events, expos, trade shows, school functions, festivals, and concerts."
      },
      {
        question: "Do you customise your event services?",
        answer: "Yes! Sprezzaura tailors every event to your specific needs, preferences, and budget. Every detail is planned to make your event unique and memorable."
      },
      {
        question: "Why choose a certified event management company?",
        answer: "Choosing a certified company like us ensures professional planning, reliable execution, and peace of mind. Our certified team brings experience and industry knowledge to make your event seamless."
      },
      {
        question: "Can you find me a venue and what does it cost?",
        answer: "Absolutely. We can source and recommend venues that match your event style and budget. Venue sourcing is included as part of our event management service."
      },
      {
        question: "Do you provide staff, decorations, and equipment?",
        answer: "Yes. We supply trained professionals for setup, on-site management, and cleanup. We can also supply tables, chairs, linens, lighting, décor, and other event essentials."
      },
      {
        question: "How far in advance should I book for my event?",
        answer: "For standard events, we recommend booking at least 1-2 months in advance. Larger or more complex events may require earlier planning."
      },
      {
        question: "Do you offer eco-friendly or sustainable event options?",
        answer: "Yes! We prioritize green practices, including eco-friendly décor, cleaning products, and waste management solutions to minimize the environmental impact of your event."
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

export const blogPosts = [
  {
    slug: 'spotless-spaces-made-easy',
    title: 'Spotless Spaces Made Easy: Expert Cleaning Services',
    date: '2024-07-15',
    author: 'Sprezzaura Team',
    imageId: 'blog-3',
    excerpt: 'A clean space is more than just visually appealing—it plays a crucial role in health, comfort, and productivity. Learn how professional cleaning can help.',
    content: `
      <p>A clean space is more than just visually appealing—it plays a crucial role in health, comfort and productivity. Whether it’s a busy office, a retail store welcoming customers or a home where families relax, maintaining cleanliness requires time, expertise and the correct approach.</p>
      <p>Our commercial and residential cleaning services are designed to take that responsibility off your shoulders. With flexible cleaning plans, trained professionals and attention to every detail, we deliver reliable cleaning solutions that keep your space fresh, hygienic and inviting. From routine maintenance to deep and specialized cleaning, we are committed to creating spotless environments you can trust.</p>
    `
  },
  {
    slug: 'your-perfect-event-starts-here',
    title: 'Your Perfect Event Starts Here: Custom Event Planning & Decor',
    date: '2024-07-10',
    author: 'Sprezzaura Team',
    imageId: 'blog-2',
    excerpt: 'Every successful event begins with a vision and the right team to bring it to life. We transform your ideas into beautifully executed events.',
    content: `
      <p>Every successful event begins with a vision—and the right team to bring it to life. From intimate celebrations to elegant weddings and milestone events, thoughtful planning and seamless execution make all the difference. SPREZZAURA’s event management services are designed to handle every detail with creativity, precision and care.</p>
      <p>With fully tailored packages, curated decor and engaging guest experiences, we transform your ideas into beautifully executed events. Whether you’re hosting a small gathering or a grand celebration, we ensure a stress-free planning process and moments your guests will remember long after the event ends.</p>
    `
  },
  {
    slug: 'why-property-staging-helps-homes-sell-faster',
    title: 'Why Property Staging Helps Homes Sell Faster',
    date: '2024-07-05',
    author: 'Sprezzaura Team',
    imageId: 'blog-1',
    excerpt: 'Professional staging enhances buyer perception and can soar property value. Learn the difference between staging and interior design.',
    content: `
      <p>Property staging is the process of furnishing and styling a property to make it visually attractive and market-ready for buyers or tenants. But how does it differ from interior design?</p>
      <p>While interior design is about personalizing a space for the homeowner, <strong>property staging is about depersonalizing it to appeal to the widest possible audience</strong>. It creates a blank canvas where potential buyers can envision themselves living. This enhances buyer perception, helps properties sell faster, and can even increase the final sale price.</p>
      <p>From luxury home staging to practical ideas for small apartments, professional staging is a powerful tool in the real estate market.</p>
    `
  }
];

export const faqs: FAQ[] = [
  {
    question: "What areas do you service?",
    answer: "We are based in Melbourne, Australia, and we service the entire Melbourne metro area and surrounding suburbs."
  },
  {
    question: "Are your cleaning products safe?",
    answer: "Yes, we prioritize your health and the environment. We use high-quality, eco-friendly, and non-toxic cleaning products that are safe for children, pets, and allergy sufferers."
  },
  {
    question: "How do I get a quote for a service?",
    answer: "You can get a quote by filling out the contact form on our website, giving us a call, or using the cleaning cost estimator for our cleaning services. For events and home staging, we provide a custom quote after a brief consultation."
  },
  {
    question: "Can I customize my service package?",
    answer: "Absolutely! All our services are fully customizable. We work with you to create a plan that fits your specific needs, budget, and schedule."
  }
];
