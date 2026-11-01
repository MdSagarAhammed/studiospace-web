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
  Pending: "bg-amber-100 text-amber-800 border-amber-200",
  Confirmed: "bg-blue-100 text-blue-800 border-blue-200",
  Completed: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Cancelled: "bg-red-100 text-red-800 border-red-200",
};

/** Hero slides: eyebrow, headline, subtext, CTA, background image */
export const HERO_SLIDES = [
  {
    eyebrow: "Photo Studios",
    headline: "Shoot In Spaces\nBuilt For Creators",
    subtext:
      "Cyc walls, natural-light bays and darkrooms — booked by the hour, ready when inspiration strikes.",
    image:
      "https://images.unsplash.com/photo-1526080652727-5fbf88f9cd53?auto=format&fit=crop&w=1920&q=80",
  },
  {
    eyebrow: "Sound Stages",
    headline: "Your Production\nDeserves A Real Stage",
    subtext:
      "Cinema-grade sound stages with rigging, power and blackout — reserve slots without the phone calls.",
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1920&q=80",
  },
  {
    eyebrow: "Podcast & Music",
    headline: "Press Record\nIn A Room That Sounds Right",
    subtext:
      "Acoustically-treated podcast lounges and music suites with gear on site. Reserve, arrive, create.",
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1920&q=80",
  },
];

/** Category cards → /studios?category=… */
export const CATEGORY_CARDS = [
  {
    value: "Photo Studio",
    label: "Photo Studios",
    description: "Cyc walls, strobes, seamless backdrops & daylight bays.",
    image:
      "https://images.unsplash.com/photo-1471341974448-f15a79f0e074?auto=format&fit=crop&w=800&q=80",
  },
  {
    value: "Film Stage",
    label: "Sound Stages",
    description: "Full-scale stages for film, video and commercial shoots.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
  },
  {
    value: "Podcast Lounge",
    label: "Podcast Rooms",
    description: "Treated rooms, board mics and turnkey recording desks.",
    image:
      "https://images.unsplash.com/photo-1598751339349-1e73afa0c3a9?auto=format&fit=crop&w=800&q=80",
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
    text: "Browse vetted studios by category, location and budget — full specs and real photos up front.",
  },
  {
    title: "Select Shoot Hours",
    text: "Choose your date and hours. Transparent hourly rates, no hidden fees.",
  },
  {
    title: "Book Instantly",
    text: "Confirm your reservation in one click with a secure booking flow. Pending → Confirmed in minutes.",
  },
  {
    title: "Create & Produce",
    text: "Arrive, unpack your kit and get to work — amenities and support are already in place.",
  },
];

export const GUARANTEE_ITEMS = [
  {
    title: "Liability Protection",
    text: "Every reservation is covered by platform liability protection for gear, spaces and guests.",
  },
  {
    title: "Verified Profiles",
    text: "Hosts and creators are identity-verified before a single listing or booking goes live.",
  },
  {
    title: "Equipment Safety",
    text: "Studios list their gear and safety standards, with damage deposits handled transparently.",
  },
  {
    title: "24/7 Host Support",
    text: "Day or overnight shoot — our support team and host network are one message away.",
  },
];
