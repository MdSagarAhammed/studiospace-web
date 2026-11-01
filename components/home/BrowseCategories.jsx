"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CATEGORY_CARDS } from "@/lib/constants";

export function BrowseCategories() {
  return (
    <section className="section-y bg-muted/40">
      <div className="container-w">
        <SectionHeading
          eyebrow="Browse Categories"
          title="Find The Right Room For The Job"
          subtitle="Every craft has its own kind of room. Pick your discipline and see what hosts have ready near you."
        />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {CATEGORY_CARDS.map((cat) => (
            <Link
              key={cat.value}
              href={`/studios?category=${encodeURIComponent(cat.value)}`}
              className="group relative overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="font-semibold text-white">{cat.label}</h3>
                  <p className="mt-1 line-clamp-2 hidden text-xs text-white/80 sm:block">
                    {cat.description}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary-foreground text-white">
                    Browse <ArrowRightIcon className="size-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
