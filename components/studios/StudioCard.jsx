"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPinIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RatingBadge } from "@/components/shared/RatingBadge";
import { CategoryBadge } from "@/components/shared/StatusBadge";

export function StudioCard({ studio }) {
  const cover = studio.images?.[0] || studio.image;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
      <Link
        href={`/studios/${studio._id}`}
        className="relative block aspect-[4/3] overflow-hidden"
      >
        <Image
          src={cover || undefined}
          alt={studio.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3">
          <span className="rounded-full bg-background/90 px-2.5 py-0.5 text-xs font-medium shadow-sm backdrop-blur">
            <CategoryBadge category={studio.category} className="bg-transparent p-0 text-foreground" />
          </span>
        </span>
        <span className="absolute top-3 right-3 rounded-full bg-background/90 px-2 py-0.5 shadow-sm backdrop-blur">
          <RatingBadge rating={studio.rating ?? 0} count={studio.reviewsCount} />
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link
          href={`/studios/${studio._id}`}
          className="line-clamp-1 font-semibold transition-colors group-hover:text-primary"
        >
          {studio.title}
        </Link>
        <p className="line-clamp-1 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPinIcon className="size-3.5 shrink-0" />
          <span className="truncate">{studio.location}</span>
        </p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <p className="text-base font-bold text-primary">
            ${Number(studio.hourlyRate).toFixed(0)}{" "}
            <span className="text-xs font-normal text-muted-foreground">/ hr</span>
          </p>
          <Button size="sm" variant="outline" render={<Link href={`/studios/${studio._id}`} />}>
            View Details
          </Button>
        </div>
      </div>
    </article>
  );
}
