import type { ImageKey } from "./images";

export type Service = {
  slug: string;
  number: string;
  title: string;
  name: string;
  tag: string;
  image: ImageKey;
  alt: string;
  intro: string;
  description: string;
  topics: string[];
  body: string;
  question: string;
  answer: string;
};

export type Faq = [question: string, answer: string];

export const services: Service[] = [
  {
    slug: "customs",
    number: "01",
    title: "Make it yours.",
    name: "Custom automotive",
    tag: "YOUR VISION. YOUR VEHICLE.",
    image: "wheel",
    alt: "Illustrative graphite coupe with a machined alloy wheel and red brake caliper",
    intro: "A sharper stance. A considered detail. A vehicle that feels more like you.",
    description:
      "Start with the look, feel, and purpose you have in mind. Bring the vehicle details and your ideas together before choosing a direction.",
    topics: [
      "Style & finish direction",
      "Wheel & fitment conversations",
      "Project scope & priorities",
    ],
    body: "A good custom project starts with a clear brief. Think about how you use the vehicle, the changes you want to see, and the details you want to preserve. Compatibility, availability, and the final scope need to be confirmed before work begins.",
    question: "What should I prepare for a custom project?",
    answer:
      "Collect the vehicle year, make, model, existing modifications, reference images, and your priorities. A budget range helps frame the conversation. Final recommendations require a review of the vehicle.",
  },
  {
    slug: "automotive",
    number: "02",
    title: "Keep the story going.",
    name: "Automotive care",
    tag: "UNDER THE HOOD. INTO THE DETAILS.",
    image: "workshop",
    alt: "Illustrative mechanic inspecting the engine bay of a graphite coupe in a workshop",
    intro:
      "Every vehicle has a story. Start the next chapter with a better understanding of what it needs.",
    description:
      "A new sound, a change in how it drives, or a project you have been putting off. Put the details in one place and start with a clear conversation.",
    topics: [
      "Vehicle concerns & symptoms",
      "Inspection conversations",
      "Repair & project planning",
    ],
    body: "Describe what you noticed, when it happens, and whether anything recently changed. Service history and previous work can help explain the bigger picture. The team will talk you through the assessment and timing before any work starts.",
    question: "What information helps explain a vehicle concern?",
    answer:
      "Include the year, make, model, approximate mileage, warning messages, and a description of the symptoms. Note whether the issue occurs when starting, braking, turning, or at particular speeds.",
  },
  {
    slug: "towing",
    number: "03",
    title: "A clear next move.",
    name: "Towing",
    tag: "FROM WHERE YOU ARE. TO WHAT’S NEXT.",
    image: "tow",
    alt: "Illustrative black flatbed truck transporting a graphite coupe on a quiet roadside turnout",
    intro: "When the next step is getting your vehicle somewhere else, the details matter.",
    description:
      "Prepare your vehicle information, pickup location, and destination so the right transport conversation can happen.",
    topics: [
      "Vehicle & condition details",
      "Pickup & destination planning",
      "Access & loading considerations",
    ],
    body: "A towing request starts with the vehicle, its condition, and where it needs to go. Ground clearance, modifications, access, and whether it rolls or steers can affect the transport arrangement. Coverage, equipment, availability, and price are confirmed directly with Wayne’s.",
    question: "Does this website dispatch a tow truck?",
    answer:
      "No. This website does not dispatch vehicles or take live requests. Use the planner to get your vehicle, pickup, and destination details together so the towing conversation is quick and clear.",
  },
];
export const faqs: Faq[] = [
  [
    "What is Wayne’s Customs Automotive and Towing?",
    "Wayne’s Customs Automotive and Towing is an automotive business covering custom work, vehicle care, and towing. This site brings those services together and helps you prepare for your first conversation.",
  ],
  [
    "How do I start a custom automotive project?",
    "Begin with your vehicle’s year, make, model, current modifications, and what you want to change. Reference images and a budget range help describe the direction. Final scope and compatibility must be confirmed before work starts.",
  ],
  [
    "What details should I prepare for towing?",
    "Record the vehicle type, condition, pickup location, and intended destination. Include any access limitations or modifications that may affect loading. Availability, equipment, pricing, and service area are confirmed directly with Wayne’s.",
  ],
  [
    "Can I book an appointment online?",
    "Not yet. The request planner creates a summary you can copy or download. It does not send a request, reserve an appointment, or dispatch a truck.",
  ],
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export const steps = [
  {
    number: "01",
    title: "Tell the story.",
    text: "What are you driving? What do you want to change? Start with the vehicle and the reason you’re reaching out.",
  },
  {
    number: "02",
    title: "Get the details together.",
    text: "Bring your reference images, symptoms, or pickup and destination details. A clear brief makes the conversation easier.",
  },
  {
    number: "03",
    title: "Confirm the next move.",
    text: "Discuss the scope, price, availability, and timing directly with the business before making arrangements.",
  },
];
