"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Button } from "@/components/ui/button";
import { HERO_SLIDES } from "@/lib/constants";
import Image from "next/image";

export function HeroSlider() {
  return (
    <section className="relative">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="hero-slider h-[480px] w-full sm:h-[560px] lg:h-[640px]"
      >
        {HERO_SLIDES.map((slide) => (
          <SwiperSlide key={slide.eyebrow}>
            <div className="relative h-full w-full">
              <Image
                src={slide.image}
                alt={slide.eyebrow}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/10" />
              <div className="absolute inset-0">
                <div className="container-w flex h-full flex-col items-start justify-center gap-5 pb-10">
                  <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase backdrop-blur">
                    {slide.eyebrow}
                  </span>
                  <h1 className="max-w-2xl text-4xl leading-tight font-extrabold tracking-tight text-white whitespace-pre-line sm:text-5xl lg:text-6xl">
                    {slide.headline}
                  </h1>
                  <p className="max-w-xl text-base text-white/85 sm:text-lg">
                    {slide.subtext}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      size="lg"
                      render={<Link href="/studios" />}
                      className="h-11 px-6 text-base"
                    >
                      Explore Studios
                    </Button>
                    
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
