"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { StudioCard } from "@/components/studios/StudioCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StudioGridSkeleton } from "@/components/shared/Skeletons";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { PackageOpenIcon } from "lucide-react";

let cache = null; // simple client cache so revisits don't refetch

export function FeaturedStudios() {
  const [studios, setStudios] = useState(cache?.data || null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cache) {
      setStudios(cache.data);
      return;
    }
    let cancelled = false;
    api
      .get("/studios/featured", { silent: true })
      .then((data) => {
        if (cancelled) return;
        // Backend returns full collections; newest 6 client-side fallback
        const list = (data?.data || data || []).slice(0, 6);
        cache = { data: list };
        setStudios(list);
      })
      .catch(() => {
        if (!cancelled) setError("load");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="section-y">
      <div className="container-w">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            align="left"
            eyebrow="Featured Spaces"
            title="Studios Creators Are Booking Right Now"
            subtitle="Top-rated and newest listings, pulled live from the StudioSpace database."
          />
          <Button variant="outline" render={<Link href="/studios" />}>
            View All Studios
          </Button>
        </div>

        <div className="mt-10">
          {error ? (
            <EmptyState
              icon={PackageOpenIcon}
              title="Couldn't load featured studios"
              description="The backend may be offline or starting up. The rest of the site still works."
              actionLabel="Retry in Explore Studios"
              actionHref="/studios"
            />
          ) : studios && studios.length === 0 ? (
            <EmptyState
              icon={PackageOpenIcon}
              title="No studios listed yet"
              description="Be the first host on StudioSpace — list your creative space and get booked."
              actionLabel="Host Your Space"
              actionHref="/add-studio"
            />
          ) : studios ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {studios.map((studio) => (
                <StudioCard key={studio._id || studio.id} studio={studio} />
              ))}
            </div>
          ) : (
            <StudioGridSkeleton />
          )}
        </div>
      </div>
    </section>
  );
}
