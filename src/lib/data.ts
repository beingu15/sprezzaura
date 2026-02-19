
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
      <p>SPREZZAURA is a professional commercial and residential cleaning service company based in Melbourne, Victoria, Australia. We provide reliable, high quality cleaning solutions for businesses, property managers, tenants and home owners across Melbourne and surroundings.</p>
      
      <h4 class="font-bold text-xl mt-4 mb-2 font-headline">Commercial and Residential Cleaning Service- Complete Solutions For
Every Space</h4>
      <p>Maintaining a clean environment is essential for health, productivity and comfort.
SPREZZAURA’s professional commercial and residential cleaning services are
designed to meet the diverse needs of offices, retail spaces and homes. Whether
you need regular upkeep, spotless cleaning or specialized services, we offer
flexible and reliable cleaning solutions designed to your space and schedule.</p>
      <h4 class="font-bold text-xl mt-4 mb-2 font-headline">Commercial Cleaning Services (Hourly Services)</h4>
      <p>Our hourly commercial cleaning services are perfect for businesses that need
flexible and efficient cleaning support. Office cleaning includes dusting,
vacuuming and surface sanitizing to maintain a hygienic and productive
workplace. Retail store cleaning focuses on floors, shelves, counters and
restrooms to ensure a spotless shopping experience for customers. We also
provide complete commercial cleaning for crowded areas that requires intensive
attention. Post-construction cleaning services are available to remote dust, debris
and residue after renovations or fit-out projects. Making your commercial space
move-in ready.</p>
      <h4 class="font-bold text-xl mt-4 mb-2 font-headline">Office Cleaning Services (BY Size or Area)</h4>
      <p>SPREZZAURA provides office cleaning services based on office size or area,
ensuring cost-effective solutions for businesses of all scales. Small offices up to
1,000 sq ft receive basic cleaning and trash removal to maintain daily cleanliness.
Medium offices between 1,000 and 3,000 sq ft benefit from wide cleaning of
floors, desks, restrooms and kitchen areas. Large offices above 3,000 sq ft receive
full commercial cleaning services customized to complex layouts. For ongoing
maintenance, we also offer per-square-foot pricing for regular office cleaning
needs.</p>
      <h4 class="font-bold text-xl mt-4 mb-2 font-headline">Specialized Commercial Cleaning Services</h4>
      <p>Our specialized commercial services address specific and high impact cleaning
requirements. End-of-lease cleaning ensures businesses leave behind a spotless
space when vacating premises. Carpet cleaning uses steam cleaning methods
suitable for office environments. Hard floor cleaning includes scrubbing and
polishing to restore shine and durability. Window cleaning services cover both
interior and exterior windows for a crystal-clear finish. We also provide restroom
sanitization with deep disinfecting to ensure hygiene and safety for employees
and visitors.</p>
      <h4 class="font-bold text-xl mt-4 mb-2 font-headline">Add-On and Detail Cleaning Services</h4>
      <p>To improve your cleaning package, we offer add-on and detailed services for
commercial spaces. These include oven and kitchen equipment cleaning for
commercial appliances, fridge cleaning for both interior and exterior surfaces and
wall cleaning for spot removal. Blind cleaning is available through wet wiping or
dust removal methods. Trash and recycling management services include waste
disposal and bin sanitization to maintain a clean and odor-free environment.</p>
      <h4 class="font-bold text-xl mt-4 mb-2 font-headline">Residential Cleaning Services- Keeping Homes Fresh and Comfortable</h4>
      <p>Our residential cleaning services are designed to make your home a healthier and
more comfortable place to live. We offer flexible cleaning options, from hourly
services to full home cleaning solutions, customized to your lifestyle and
household needs.</p>
      <h4 class="font-bold text-xl mt-4 mb-2 font-headline">Room and Feature - Based Residential Services</h4>
      <p>Room and feature-based services allow homeowners to focus on specific areas.
Carpet cleaning is available through steam or dry cleaning methods. Window
cleaning services cover interior windows as well as full interior and exterior
cleaning. Balcony cleaning includes sweeping and washing. Baseboard cleaning
targets corners and edges, while wall cleaning provides spot cleaning on a per-
wall basis..</p>
      <h4 class="font-bold text-xl mt-4 mb-2 font-headline">Kitchen Cleaning Services</h4>
      <p>Our kitchen cleaning services ensure one of the most important areas of your
home stays hygienic and organized. Standard kitchen cleaning includes counters,
appliances and floors. Oven cleaning covers both interior and exterior surfaces.
Fridge cleaning focuses on thorough interior cleaning. Drawer and cabinet
cleaning removes dirt and buildup inside storage spaces. We also offer
dishwashing services with careful hand washing for dishes.</p>
      <h4 class="font-bold text-xl mt-4 mb-2 font-headline">Professional Cleaning You Can Trust</h4>
      <p>With a diverse range of commercial and residential cleaning services, affordable
packages,and attention to detail, SPREZZAURA are committed to providing
spotless results every time. Whether it’s a busy office, retail space or family
home, our professional cleaning team ensures cleanliness, hygiene and peace of
mind.</p>
    `,
    features: [
      'Hourly Office & Retail Cleaning',
      'End-of-Lease Cleaning',
      'Post-Construction Cleaning',
      'Carpet Steam Cleaning',
      'Hard Floor Scrubbing & Polishing',
      'Residential Spring Cleaning',
      'Detailed Kitchen & Appliance Cleaning',
      'Eco-Friendly Sanitization'
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
      <h4 class="font-bold text-xl mt-4 mb-2 font-headline">Monthly Home Staging Packages</h4>
      <p>We offer flexible monthly home staging packages that include furniture, decor, and professional styling for properties of all sizes, from studio apartments to 5-bedroom and double-storey houses. We also specialize in luxury home staging with high-end designer furniture.</p>
      <h4 class="font-bold text-xl mt-4 mb-2 font-headline">Room-Based & Add-On Staging Services</h4>
      <p>Our room-by-room staging solutions allow you to style only the spaces you need, including living rooms, bedrooms, and home offices. You can also enhance your package with our optional add-ons like premium furniture upgrades, outdoor/balcony staging, and kid's bedroom styling.</p>
      <h4 class="font-bold text-xl mt-4 mb-2 font-headline">Styling and Interior Design Services</h4>
      <p>We provide professional interior styling and design services suited to your lifestyle. This includes on-site or virtual design consultation, mood boards, theme-based styling plans, and accessory styling (cushions, rugs, wall art).</p>
    `,
    features: [
      'Complete Furniture & Styling Solutions',
      'Monthly Home Staging Packages (1-5 Bedrooms)',
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
      <p>Our guest-based event packages are thoughtfully designed to suit different event sizes while maintaining quality, elegance and smooth coordination. We offer packages for intimate events (up to 21 guests), classic events (up to 40 guests), and a wedding/engagement package (up to 50 guests), all fully customizable.</p>
      <h4 class="font-bold text-xl mt-4 mb-2 font-headline">Decor and Experience Add-Ons</h4>
      <p>To enhance guest engagement, we offer a range of add-ons, including photo booths, cocktail bars, kids' play zones, candy carts, and chocolate fountains. Our decor and styling add-ons can boost the visual attraction of your event, from basic theme upgrades to luxury decor setups, stage design, and elegant floral arrangements.</p>
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
        question: "What services do you provide for events?",
        answer: `
    • Event planning, design and coordination
    • Venue setup and teardown (Bump-In/Bump-Out)
    • Equipment and furniture rental (tables, chairs, décor, etc.)
    • On-site management and staff supervision
    • Catering coordination and vendor management
    • Cleaning and post-event services
        `
      },
        { question: "What types of events does Sprezzaura manage?", answer: "We manage a wide range of events, including weddings, private parties, corporate events, expos, trade shows, school functions, festivals, and concerts." },
        { question: "What size events do you manage?", answer: "We handle events of all sizes, from intimate gatherings and private parties to large-scale corporate functions, expos, festivals, and concerts. Our team adjusts staffing, equipment, and planning accordingly to ensure a smooth event every time." },
        { question: "Do you customise your event services?", answer: "Yes! Sprezzaura tailors every event to your specific needs, preferences, and budget. We don’t offer one-size-fits-all packages; every detail is planned to make your event unique and memorable." },
        { question: "Why choose a certified event management company?", answer: "Choosing a certified company like us ensures professional planning, reliable execution, and peace of mind. Our certified team brings experience, attention to detail, and industry knowledge to make your event seamless and successful." },
        { question: "Can you assist with events Australia-wide?", answer: "Yes! We can manage events across Australia, coordinating vendors, venues, and staff wherever your event takes place." },
        { question: "Can you find me a venue? What does this cost?", answer: "Absolutely. We can source and recommend venues that match your event style and budget. Venue sourcing is included as part of our event management service; pricing depends on the venue and your specific requirements." },
        
        { question: "Do you provide staff for the event?", answer: "Absolutely. We supply trained professionals for setup, on-site management, catering support, and cleanup, ensuring your event runs smoothly." },
        { question: "Do you provide decorations and equipment?", answer: "Yes, we can supply tables, chairs, linens, lighting, décor, and other event essentials. We also coordinate with vendors for specialty items as needed." },
        { question: "Can you cope with last-minute changes?", answer: "Yes! Our experienced team is flexible and adaptable, able to handle last-minute changes to schedules, setup, or event requirements efficiently." },
        { question: "Can I request last-minute event management?", answer: "We try our best to accommodate urgent requests, but we recommend at least 14 days notice to ensure our team is properly scheduled." },
        { question: "How far in advance should I book for my event?", answer: "For standard events, we recommend booking at least 1-2 months in advance. Larger or more complex events may require earlier planning to secure all logistics." },
        { question: "Can I make changes after booking?", answer: "Yes. We are flexible and can accommodate changes to timing, setup, or services, provided we are given sufficient notice." },
        { question: "Do you offer eco-friendly or sustainable event options?", answer: "Yes! We prioritize green practices, including eco-friendly décor, cleaning products, and waste management solutions to minimize the environmental impact of your event." },
        { question: "How are your event management rates calculated?", answer: "Rates vary depending on the size, type, and complexity of your event. You can request a quick quote via our website or speak directly with our Event Managers for a tailored estimate." },
        { question: "Is it budget-friendly?", answer: "Costs depend on the size, complexity, and type of event. Sprezzaura offers customized packages to suit different budgets, ensuring high-quality service without overspending." },
        { question: "How can I pay for event services?", answer: "Payments can be made via EFT, bank transfer, credit card over the phone, or cheque, based on your preference." }
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
