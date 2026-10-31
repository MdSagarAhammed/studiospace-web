import {
  ShieldCheckIcon,
  BadgeCheckIcon,
  WrenchIcon,
  HeadphonesIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GUARANTEE_ITEMS } from "@/lib/constants";

const ICONS = [ShieldCheckIcon, BadgeCheckIcon, WrenchIcon, HeadphonesIcon];

export function HostGuarantee() {
  return (
    <section className="section-y">
      <div className="container-w">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Host Guarantee & Creator Support"
              title="Booked With Confidence, Hosted With Peace Of Mind"
              subtitle="StudioSpace protects both sides of every reservation so hosts can focus on hospitality and creators can focus on the work."
            />
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {GUARANTEE_ITEMS.map((item, i) => {
                const Icon = ICONS[i];
                return (
                  <div key={item.title} className="flex gap-3">
                    <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold">{item.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Visual panel */}
          <div className="relative hidden overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/15 via-accent to-muted p-8 lg:block">
            <div className="space-y-4">
              {[
                { label: "Verified hosts", value: "100%" },
                { label: "Bookings confirmed within minutes", value: "< 5 min" },
                { label: "Support coverage", value: "24/7" },
                { label: "Liability protection on every booking", value: "Included" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between rounded-xl border bg-background/80 px-5 py-4 shadow-sm"
                >
                  <span className="text-sm font-medium">{row.label}</span>
                  <span className="text-sm font-extrabold text-primary">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 -right-20 size-64 rounded-full bg-primary/20 blur-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
