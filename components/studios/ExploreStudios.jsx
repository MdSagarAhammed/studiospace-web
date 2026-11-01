"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchIcon, SlidersHorizontalIcon, PackageSearchIcon } from "lucide-react";
import { api } from "@/lib/api";
import { STUDIO_CATEGORIES } from "@/lib/constants";
import { StudioCard } from "@/components/studios/StudioCard";
import { StudioGridSkeleton } from "@/components/shared/Skeletons";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export function ExploreStudios() {
  const router = useRouter();
  const params = useSearchParams();

  const search = params.get("search") || "";
  const category = params.get("category") || "all";
  const [sort, setSort] = useState("newest");
  const [studios, setStudios] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateFilters = useCallback((updates) => {
    const next = new URLSearchParams(params.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (!value || value === "all") next.delete(key);
      else next.set(key, value);
    }
    const query = next.toString();
    router.replace(query ? `/studios?${query}` : "/studios", {
      scroll: false,
    });
  }, [params, router]);

  const load = useCallback(async (signal) => {
    setLoading(true);
    setError(null);
    try {
      const qs = new URLSearchParams();
      if (search.trim()) qs.set("search", search.trim());
      if (category !== "all") qs.set("category", category);
      qs.set("sort", sort);
      const data = await api.get(`/studios?${qs.toString()}`, { signal });
      if (!signal.aborted) setStudios(data?.data ?? data ?? []);
    } catch (err) {
      if (signal.aborted || err.name === "AbortError") return;
      setStudios(null);
      setError(err.message || "Couldn't load studios. Please try again.");
    } finally {
      if (!signal.aborted) setLoading(false);
    }
  }, [search, category, sort]);

  useEffect(() => {
    const controller = new AbortController();
    const t = setTimeout(() => {
      load(controller.signal);
    }, 350);
    return () => {
      clearTimeout(t);
      controller.abort();
    };
  }, [load]);

  const hasFilters = search.trim() || category !== "all";

  return (
    <div>
      {/* Header + filters */}
      <div className="border-b bg-muted/40">
        <div className="container-w py-10">
          <h1 className="text-3xl font-extrabold tracking-tight">Explore Studios</h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
            Photo studios, sound stages, podcast lounges, music suites and
            workshops — all bookable by the hour.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => updateFilters({ search: e.target.value })}
                placeholder="Search by title or location…"
                className="pl-9"
                aria-label="Search studios"
              />
            </div>
            <Select
              value={category}
              onValueChange={(value) => updateFilters({ category: value })}
            >
              <SelectTrigger className="w-full sm:w-52" aria-label="Category">
                <span className="flex items-center gap-2">
                  <SlidersHorizontalIcon className="size-4 text-muted-foreground" />
                  <SelectValue placeholder="All Categories" />
                </span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {STUDIO_CATEGORIES.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-full sm:w-44" aria-label="Sort">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
                <SelectItem value="price-asc">Price: Low → High</SelectItem>
                <SelectItem value="price-desc">Price: High → Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container-w py-10">
        {loading ? (
          <StudioGridSkeleton count={9} />
        ) : error ? (
          <EmptyState
            icon={PackageSearchIcon}
            title="Couldn't load studios"
            description={error}
          />
        ) : studios && studios.length > 0 ? (
          <>
            <p className="mb-6 text-sm text-muted-foreground">
              {studios.length} studio{studios.length !== 1 ? "s" : ""} found
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {studios.map((studio) => (
                <StudioCard key={studio._id || studio.id} studio={studio} />
              ))}
            </div>
          </>
        ) : (
          <EmptyState
            icon={PackageSearchIcon}
            title={hasFilters ? "No studios match your search" : "No studios listed yet"}
            description={
              hasFilters
                ? "Try a different keyword or category — new spaces are added every week."
                : "Hosts haven't listed any spaces yet. Be the first to host yours!"
            }
            actionLabel={hasFilters ? "Clear Filters" : "Add New Studio"}
            actionHref={hasFilters ? undefined : "/add-studio"}
            onAction={
              hasFilters
                ? () => {
                    updateFilters({ search: "", category: "all" });
                  }
                : undefined
            }
          />
        )}
      </div>
    </div>
  );
}
