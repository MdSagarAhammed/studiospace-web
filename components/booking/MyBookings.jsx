"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarXIcon, CalendarCheckIcon, XCircleIcon, ArrowRightIcon } from "lucide-react";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PageLoader } from "@/components/shared/PageLoader";
import { TableSkeleton } from "@/components/shared/Skeletons";
import { EmptyState } from "@/components/shared/EmptyState";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { StatusBadge } from "@/components/shared/StatusBadge";

export function MyBookings() {
  const [bookings, setBookings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [target, setTarget] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await api.get("/bookings/mine", { silent: true });
      setBookings(data?.data || data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCancel = (booking) => {
    setTarget(booking);
    setConfirmOpen(true);
  };

  const handleCancel = async () => {
    if (!target) return;
    setCancelling(true);
    try {
      await api.patch(`/bookings/${target._id}/cancel`);
      toast.success("Booking cancelled");
      setConfirmOpen(false);
      setTarget(null);
      load();
    } catch (err) {
      toast.error(err.message || "Couldn't cancel this booking.");
    } finally {
      setCancelling(false);
    }
  };

  if (loading)
    return (
      <div className="container-w py-10">
        <TableSkeleton rows={4} />
      </div>
    );

  return (
    <div className="container-w py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">My Bookings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Reservations you&apos;ve made across StudioSpace. Pending slots can be
          cancelled anytime.
        </p>
      </div>

      {bookings && bookings.length > 0 ? (
        <div className="grid gap-4">
          {bookings.map((b) => {
            const studio = b.studio || {};
            const cover = studio.images?.[0] || studio.image || studio.coverImage;
            return (
              <Card key={b._id}>
                <CardContent className="p-4 sm:p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <Link
                      href={studio._id ? `/studios/${studio._id}` : "#"}
                      className="relative block aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl border bg-muted sm:size-24"
                    >
                      {cover ? (
                        <Image src={cover} alt={studio.title || "Studio"} fill sizes="96px" className="object-cover" />
                      ) : null}
                    </Link>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          href={studio._id ? `/studios/${studio._id}` : "#"}
                          className="truncate font-semibold hover:text-primary"
                        >
                          {studio.title || "Studio"}
                        </Link>
                        <StatusBadge status={b.status || "Pending"} />
                      </div>
                      <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <CalendarCheckIcon className="size-3.5" />
                          {b.date} · {b.startTime || b.startAt || ""}
                        </span>
                        <span>{b.hours} hour{b.hours !== 1 ? "s" : ""}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                      <p className="text-lg font-extrabold text-primary">
                        ${Number(b.totalPrice ?? b.total ?? 0).toFixed(2)}
                      </p>
                      {(!b.status || b.status === "Pending") ? (
                        <Button variant="outline" size="sm" onClick={() => openCancel(b)}>
                          <CalendarXIcon />
                          Cancel Booking
                        </Button>
                      ) : (
                        <Button variant="ghost" size="sm" disabled>
                          {b.status === "Cancelled" ? "Cancelled" : "No action"}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={CalendarXIcon}
          title="No bookings yet"
          description="When you reserve a studio it will appear here — from pending to completed."
          actionLabel="Explore Studios"
          actionHref="/studios"
        />
      )}

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Cancel this booking?"
        description={`Your ${target?.date} slot at “${target?.studio?.title || "the studio"}” will be released back to the host. Pending bookings can always be cancelled free of charge.`}
        confirmLabel="Cancel Booking"
        loading={cancelling}
        onConfirm={handleCancel}
      />
    </div>
  );
}
