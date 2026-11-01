"use client";

import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { STUDIO_CATEGORIES } from "@/lib/constants";
import { CopyrightYear } from "@/components/shared/CopyrightYear";
import { NewsletterForm } from "./NewsletterForm";

/* Brand icons (lucide no longer ships brand glyphs) */
function FacebookGlyph({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8V11H8v3h2.5v7h3Z" />
    </svg>
  );
}
function InstagramGlyph({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function XGlyph({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.6 3h3l-6.7 7.7L21.8 21h-6.2l-4.8-6.3L5.2 21h-3l7.2-8.2L2.5 3h6.3l4.4 5.8L17.6 3Zm-1.1 16.2h1.7L7.9 4.7H6L16.5 19.2Z" />
    </svg>
  );
}
function YoutubeGlyph({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M21.6 7.2a2.6 2.6 0 0 0-1.8-1.9C18.2 5 12 5 12 5s-6.2 0-7.8.3A2.6 2.6 0 0 0 2.4 7.2 27 27 0 0 0 2 12a27 27 0 0 0 .4 4.8 2.6 2.6 0 0 0 1.8 1.9C5.8 19 12 19 12 19s6.2 0 7.8-.3a2.6 2.6 0 0 0 1.8-1.9A27 27 0 0 0 22 12a27 27 0 0 0-.4-4.8ZM10 15.2V8.8l5.2 3.2L10 15.2Z" />
    </svg>
  );
}

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/studios", label: "Explore Studios" },
  { href: "/add-studio", label: "List Your Studio" },
  { href: "/my-bookings", label: "My Bookings" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#about", label: "About Us" },
];

const SOCIALS = [
  { icon: FacebookGlyph, label: "Facebook", href: "https://facebook.com" },
  { icon: InstagramGlyph, label: "Instagram", href: "https://instagram.com" },
  { icon: XGlyph, label: "Twitter / X", href: "https://x.com" },
  { icon: YoutubeGlyph, label: "YouTube", href: "https://youtube.com" },
];

export function Footer() {
  const handleSubscribe = (e) => {
    e.preventDefault();
    // Wire to a newsletter endpoint on the backend when available.
    e.currentTarget.reset();
  };

  return (
    <footer className="border-t bg-muted/40" id="about">
      <div className="container-w py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + mission */}
          <div className="space-y-3">
            <Logo />
            <p className="max-w-xs text-sm text-muted-foreground">
              Every great piece of work starts in a room with the right light
              and the right sound. StudioSpace connects creators — shooters,
              hosts, engineers and makers — to inspiring spaces by the hour,
              with transparent pricing and zero hassle.
            </p>
            <div className="flex gap-2">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid size-8 place-items-center rounded-lg border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Quick links" className="space-y-3">
            <h4 className="text-sm font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Categories */}
          <nav aria-label="Popular categories" className="space-y-3">
            <h4 className="text-sm font-semibold">Popular Categories</h4>
            <ul className="space-y-2 text-sm">
              {STUDIO_CATEGORIES.map((cat) => (
                <li key={cat.value}>
                  <Link
                    href={`/studios?category=${encodeURIComponent(cat.value)}`}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Newsletter</h4>
            <p className="text-sm text-muted-foreground">
              New spaces and booking tips, straight to your inbox.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="my-8 border-t" />

        <div className="flex flex-col items-center justify-between gap-3 text-center text-xs text-muted-foreground sm:flex-row sm:text-left">
          <p><CopyrightYear /></p>
          <p>
            By using StudioSpace you agree to our Terms of Service and Privacy
            Policy.
          </p>
        </div>
      </div>
    </footer>
  );
}
