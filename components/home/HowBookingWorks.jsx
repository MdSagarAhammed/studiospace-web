import { SectionHeading } from "@/components/shared/SectionHeading";

export function HowBookingWorks() {
  return (
    <section id="how-it-works" className="section-y">
      <div className="container-w">
        <SectionHeading
          eyebrow="Simple Process"
          title="How Booking Works"
          subtitle="From first search to final take — four steps and you are rolling."
        />
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Discover Spaces",
            "Select Shoot Hours",
            "Book Instantly",
            "Create & Produce",
          ].map((title, i) => (
            <li
              key={title}
              className="relative rounded-2xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-lg font-extrabold text-primary">
                {i + 1}
              </span>
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {STEP_TEXT[i]}
              </p>
              {i < 3 ? (
                <span
                  aria-hidden
                  className="absolute top-7 -right-3 hidden text-2xl text-muted-foreground/40 lg:block"
                >
                  →
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const STEP_TEXT = [
  "Browse vetted studios by category, location and budget — every listing shows real photos and full specs.",
  "Pick a date and hours with transparent hourly rates. No phone calls, no quotes, no hidden fees.",
  "Reserve instantly with the booking flow. Your slot goes from Pending to Confirmed in minutes.",
  "Arrive, set up and produce. Amenities are ready on site and support is one message away.",
];
