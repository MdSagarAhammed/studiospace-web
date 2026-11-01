export const STUDIO_CATEGORIES = [
  { value: "Photo Studio", label: "Photo Studios" },
  { value: "Film Stage", label: "Sound Stages" },
  { value: "Podcast Lounge", label: "Podcast Rooms" },
  { value: "Music Suite", label: "Music Suites" },
  { value: "Workshop", label: "Art Workshops" },
];

export const AMENITIES = [
  "Cyc Wall",
  "Lighting Kit",
  "Green Screen",
  "Soundproofing",
  "Cameras",
  "Props & Backdrops",
  "Mixing Console",
  "Microphones",
  "Instruments",
  "Acoustic Panels",
  "Changing Room",
  "Free Parking",
  "Wi-Fi",
  "Air Conditioning",
  "Kitchen Access",
  "Elevator Access",
  "24/7 Access",
];

export const BOOKING_STATUSES = {
  Pending: "bg-[#f4cbab] text-[#6f3f33] border-[#e0b28a]",
  Confirmed: "bg-[#59171b] text-[#fed7b8] border-[#59171b]",
  Completed: "bg-[#a4554a] text-[#fed7b8] border-[#a4554a]",
  Cancelled: "bg-[#3d191c] text-[#cfa389] border-[#3d191c]",
};

/** Hero slides: eyebrow, headline, subtext, CTA, background image */
export const HERO_SLIDES = [
  {
    eyebrow: "Photo Studios",
    headline: "Light, Lens, Action —\nBook The Room First",
    subtext:
      "Cyc walls, strobe kits and daylight bays reserved by the hour. Your next frame deserves better than a hotel room.",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1920&q=80",
  },
  {
    eyebrow: "Sound Stages",
    headline: "Roll Camera\nOn A Stage That Means It",
    subtext:
      "Blackout stages with rigging grids, three-phase power and crew-ready floors — no phone calls, no middlemen.",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1920&q=80",
  },
  {
    eyebrow: "Podcast & Music",
    headline: "Hit Record\nIn Rooms That Sound Right",
    subtext:
      "Acoustically-treated podcast lounges and tracking suites with mics, desks and backline on site. Reserve, arrive, create.",
    image:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1920&q=80",
  },
];

/** Category cards → /studios?category=… */
export const CATEGORY_CARDS = [
  {
    value: "Photo Studio",
    label: "Photo Studios",
    description: "Cyc walls, strobes, seamless backdrops & daylight bays.",
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80",
  },
  {
    value: "Film Stage",
    label: "Sound Stages",
    description: "Full-scale stages for film, video and commercial shoots.",
    image:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80",
  },
  {
    value: "Podcast Lounge",
    label: "Podcast Rooms",
    description: "Treated rooms, boom mics and turnkey recording desks.",
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80",
  },
  {
    value: "Music Suite",
    label: "Music Suites",
    description: "Rehearsal, tracking & mixing suites with gear included.",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
  },
  {
    value: "Workshop",
    label: "Art Workshops",
    description: "Studios for ceramics, painting, set-building & crafts.",
    image:
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=800&q=80",
  },
];

export const BOOKING_STEPS = [
  {
    title: "Discover Spaces",
    text: "Browse vetted studios by craft and city — specs, gear lists and real photos up front.",
  },
  {
    title: "Select Shoot Hours",
    text: "Pick your date and block the hours you need. Transparent rates, no hidden fees.",
  },
  {
    title: "Book Instantly",
    text: "One secure checkout locks the room. Pending → Confirmed in minutes, not days.",
  },
  {
    title: "Create & Produce",
    text: "Arrive to a prepped room — lights hot, desks live, backdrops swept. Make the work.",
  },
];

export const GUARANTEE_ITEMS = [
  {
    title: "Liability Protection",
    text: "Every reservation is covered by platform liability protection for spaces, gear and guests.",
  },
  {
    title: "Verified Profiles",
    text: "Hosts and creators are identity-checked before a single listing or booking goes live.",
  },
  {
    title: "Equipment Safety",
    text: "Listings declare their gear and safety standards, with damage deposits handled transparently.",
  },
  {
    title: "24/7 Host Support",
    text: "Day rate or overnight shoot — support and the host network are one message away.",
  },
];
