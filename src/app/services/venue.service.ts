import { Injectable } from "@angular/core";

export interface Hall {
  id: string;
  name: string;
  capacity: number;
  dining: number;
  pricePerDay: number;
  description: string;
  features: string[];
  tone: string; // CSS gradient used as the card's visual
}

export interface Amenity {
  icon: string;
  title: string;
  text: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  event: string;
}

export interface EventType {
  id: string;
  label: string;
}

/**
 * All business content lives here. Edit this file to change the halls,
 * prices, contact details and copy shown across the site — every page
 * reads from it, so nothing else needs touching.
 */
@Injectable({ providedIn: "root" })
export class VenueService {
  readonly business = {
    name: "V Convention",
    tagline: "Where every muhurtham feels like home",
    phone: "+91 9951211100",
    whatsapp: "9951211100",
    email: "bookings@vconvention.in",
    address: "Plot 12, Main Road, Ayyalur,Nandyal 500001",
    hours: "Every day, 9:00 AM – 9:00 PM",
    mapQuery: "V Convention",
    since: 2012,
  };

  readonly halls: Hall[] = [
    {
      id: "grand",
      name: "Sri Lakshmi Grand Hall",
      capacity: 1200,
      dining: 500,
      pricePerDay: 250000,
      description:
        "Our signature air-conditioned hall with a raised mandapam stage, crystal chandeliers and a separate bride & groom suite.",
      features: [
        "Fully air-conditioned",
        "Mandapam stage",
        "2 green rooms",
        "Valet parking",
      ],
      tone: "linear-gradient(135deg,#6b1d2a 0%,#9a3b3b 55%,#c9a24b 100%)",
    },
    // {
    //   id: "lotus",
    //   name: "Lotus Banquet",
    //   capacity: 450,
    //   dining: 200,
    //   pricePerDay: 120000,
    //   description:
    //     "An intimate banquet for engagements, receptions and sangeet nights, with warm lighting and a built-in dance floor.",
    //   features: [
    //     "Air-conditioned",
    //     "Dance floor",
    //     "Stage & LED wall",
    //     "In-house sound",
    //   ],
    //   tone: "linear-gradient(135deg,#3f4a3c 0%,#6f7d5c 55%,#d8c08a 100%)",
    // },
    // {
    //   id: "garden",
    //   name: "Mallige Garden Lawn",
    //   capacity: 800,
    //   dining: 350,
    //   pricePerDay: 90000,
    //   description:
    //     "An open-air lawn ringed with jasmine and string lights — perfect for haldi, mehendi and evening receptions.",
    //   features: [
    //     "Open-air lawn",
    //     "Decor-ready",
    //     "Power backup",
    //     "Adjoining dining",
    //   ],
    //   tone: "linear-gradient(135deg,#1f3b3a 0%,#3e6b5e 55%,#e2c98f 100%)",
    // },
  ];

  readonly eventTypes: EventType[] = [
    { id: "wedding", label: "Wedding" },
    { id: "reception", label: "Reception" },
    { id: "engagement", label: "Engagement" },
    { id: "haldi-mehendi", label: "Haldi / Mehendi" },
    { id: "birthday", label: "Birthday / Anniversary" },
    { id: "corporate", label: "Corporate Event" },
  ];

  readonly addOns = [
    { id: "decor", label: "Floral & stage decoration", price: 45000 },
    {
      id: "catering",
      label: "Vegetarian catering (per 100 plates)",
      price: 35000,
    },
    { id: "photo", label: "Photography & videography", price: 40000 },
    { id: "nadaswaram", label: "Nadaswaram & mangala vadyam", price: 15000 },
    { id: "rooms", label: "Guest rooms (10 rooms, 1 night)", price: 25000 },
  ];

  readonly amenities: Amenity[] = [
    {
      icon: "❖",
      title: "Mandapam Stage",
      text: "A traditional stage designed for muhurtham rituals, with clear sightlines from every seat.",
    },
    {
      icon: "✦",
      title: "Pure-Veg Kitchen",
      text: "A spacious in-house kitchen with trusted caterers, or bring your own family cooks.",
    },
    {
      icon: "◈",
      title: "Guest Rooms",
      text: "Comfortable AC rooms on site so elders and out-of-town guests can rest between ceremonies.",
    },
    {
      icon: "✧",
      title: "Ample Parking",
      text: "Parking for 200+ cars with valet service, so arrivals stay calm and on time.",
    },
    {
      icon: "❋",
      title: "Power Backup",
      text: "Full generator backup — the lights, music and AC stay on through every ritual.",
    },
    {
      icon: "✺",
      title: "Event Coordinator",
      text: "A dedicated coordinator from first visit to vidaai, handling vendors and timings.",
    },
  ];

  readonly testimonials: Testimonial[] = [
    {
      quote:
        "The staff treated our family like their own. The mandapam looked stunning and every ritual ran on time.",
      name: "Ananya & Karthik",
      event: "Wedding, Grand Hall",
    },
    {
      quote:
        "Our reception on the garden lawn was magical. Guests are still talking about the lights and the food.",
      name: "Priya Reddy",
      event: "Reception, Mallige Garden",
    },
    {
      quote:
        "Clean, spacious and very well managed. Booking was simple and the coordinator answered every call.",
      name: "Srinivas Rao",
      event: "Engagement, Lotus Banquet",
    },
  ];

  readonly stats = [
    { value: "1,500+", label: "Celebrations hosted" },
    { value: "3", label: "Elegant venues" },
    { value: "1,200", label: "Guests in the Grand Hall" },
    { value: `${new Date().getFullYear() - 2012}+`, label: "Years of trust" },
  ];

  getHall(id: string): Hall | undefined {
    return this.halls.find((h) => h.id === id);
  }
}
