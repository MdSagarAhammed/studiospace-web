"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPinIcon,
  UsersIcon,
  ShieldIcon,
  ClockIcon,
  CircleCheckIcon,
  StarIcon,
  PackageOpenIcon,
} from "lucide-react";
import { api } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PageLoader } from "@/components/shared/PageLoader";
import { EmptyState } from "@/components/shared/EmptyState";
import { RatingBadge } from "@/components/shared/RatingBadge";
import { CategoryBadge } from "@/components/shared/StatusBadge";
import { BookingModal } from "@/components/booking/BookingModal";
import { cn } from "cn";

export function StudioDetails({ id }) {
  const { data: session } = useSession();
  const [studio, setStudio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api
      .get(`/studios/${id}`, { silent: true })
      .then((data) => {
        if (cancelled) return;
        setStudio(data?.data || data);
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message || "Studio not found");
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <PageLoader label="Loading studio…" />;

  if (!studio || error) {
    return (
      <div className="container-w py-16">
        <EmptyState
          icon={PackageOpenIcon}
          title="Studio not found"
          description={error || "This listing may have been removed by its host."}
          actionLabel="Back to Explore Studios"
          actionHref="/studios"
        />
      </div>
    );
  }

  const images = studio.images?.length ? studio.images : [studio.image].filter(Boolean);
  const cover = images[Math.min(galleryIndex, images.length - 1)] || images[0];
  const amenities = studio.amenities || [];
  const reviews = studio.reviews || [];

  return (
    <div className="container-w py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/studios" className="hover:text-primary">
          Explore Studios
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-foreground">{studio.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Left: gallery + info */}
        <div className="space-y-8">
          {/* Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border bg-muted">
              <Image
                src={cover || undefined}
                alt={studio.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
              />
              <span className="absolute top-3 left-3 rounded-full bg-background/90 px-3 py-1 text-xs font-medium shadow-sm backdrop-blur">
                <CategoryBadge category={studio.category} className="bg-transparent p-0 text-foreground" />
              </span>
            </div>
            {images.length > 1 ? (
              <div className="grid grid-cols-5 gap-2 sm:grid-cols-6">
                {images.slice(0, 6).map((img, i) => (
                  <button
                    key={img + i}
                    onClick={() => setGalleryIndex(i)}
                    aria-label={`Show photo ${i + 1}`}
                    className={cn(
                      "relative aspect-[4/3] overflow-hidden rounded-lg border-2 transition-all",
                      i === galleryIndex
                        ? "border-primary"
                        : "border-transparent opacity-70 hover:opacity-100"
                    )}
                  >
                    <Image src={img} alt="" fill sizes="120px" className="object-cover" />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {/* Title block */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                {studio.title}
              </h1>
              <RatingBadge rating={studio.rating ?? 0} count={studio.reviewsCount} />
            </div>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPinIcon className="size-4 text-primary" />
              {studio.location}
            </p>
          </div>

          {/* Specifications */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { icon: ClockIcon, label: "Hourly Rate", value: `$${Number(studio.hourlyRate).toFixed(0)} / hr` },
              { icon: ShieldIcon, label: "Security Deposit", value: `$${Number(studio.securityDeposit || 0).toFixed(0)}` },
              { icon: UsersIcon, label: "Max Capacity", value: `${studio.maxCapacity} people` },
            ].map((spec) => (
              <div key={spec.label} className="rounded-xl border bg-muted/40 p-4">
                <spec.icon className="size-5 text-primary" />
                <p className="mt-2 text-xs text-muted-foreground">{spec.label}</p>
                <p className="text-sm font-bold">{spec.value}</p>
              </div>
            ))}
          </div>

          {/* Overview */}
          <section>
            <h2 className="text-lg font-bold">Detailed Overview</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground whitespace-pre-line">
              {studio.overview}
            </p>
          </section>

          {/* Amenities */}
          <section>
            <h2 className="text-lg font-bold">Amenities</h2>
            {amenities.length ? (
              <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {amenities.map((a) => (
                  <li
                    key={a}
                    className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm"
                  >
                    <CircleCheckIcon className="size-4 text-primary" />
                    {a}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">
                The host hasn&apos;t listed any amenities for this space yet.
              </p>
            )}
          </section>

          {/* Reviews */}
          <section>
            <h2 className="text-lg font-bold">
              Reviews{studio.reviewsCount ? ` (${studio.reviewsCount})` : ""}
            </h2>
            {reviews.length ? (
              <ul className="mt-3 space-y-4">
                {reviews.map((r, i) => (
                  <li key={r._id || r.id || i} className="rounded-xl border bg-card p-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold">{r.userName || r.user || "Creator"}</p>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600">
                        <StarIcon className="size-3.5 fill-current" />
                        {r.rating}/5
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm text-muted-foreground">{r.comment}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-3 rounded-xl border border-dashed px-4 py-8 text-center text-sm text-muted-foreground">
                No reviews yet — book this space and be the first to share how
                your shoot went.
              </div>
            )}
          </section>
        </div>

        {/* Right: sticky booking card */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card className="shadow-md">
            <CardContent className="space-y-4 p-6">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-primary">
                  ${Number(studio.hourlyRate).toFixed(0)}
                </span>
                <span className="text-sm text-muted-foreground">/ hour</span>
              </div>
              <Separator />
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <ShieldIcon className="size-4 text-primary" />
                  Security deposit: ${Number(studio.securityDeposit || 0).toFixed(0)}
                </li>
                <li className="flex items-center gap-2">
                  <UsersIcon className="size-4 text-primary" />
                  Up to {studio.maxCapacity} people
                </li>
                <li className="flex items-center gap-2">
                  <CircleCheckIcon className="size-4 text-primary" />
                  Liability protection included
                </li>
              </ul>

              {session ? (
                <Button
                  size="lg"
                  className="h-11 w-full text-base"
                  onClick={() => setBookingOpen(true)}
                >
                  Book Workspace Now
                </Button>
              ) : (
                <Button
                  size="lg"
                  className="h-11 w-full text-base"
                  render={<Link href={`/login?redirect=/studios/${studio._id}`} />}
                >
                  Log In To Book
                </Button>
              )}
              <p className="text-center text-xs text-muted-foreground">
                Instant reservation · Free cancellation on pending slots
              </p>
            </CardContent>
          </Card>

          {/* Host details */}
          <Card className="mt-4">
            <CardContent className="p-6">
              <h3 className="text-sm font-bold">Hosted By</h3>
              <div className="mt-3 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-primary/10 font-bold text-primary">
                  {(studio.ownerName || "H").charAt(0).toUpperCase()}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{studio.ownerName || "Verified Host"}</p>
                  <p className="truncate text-xs text-muted-foreground">{studio.ownerEmail}</p>
                </div>
              </div>
              <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                <CircleCheckIcon className="size-3.5 text-primary" />
                Identity verified host · responds within a few hours
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>

      <BookingModal
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        studio={studio}
      />
    </div>
  );
}
