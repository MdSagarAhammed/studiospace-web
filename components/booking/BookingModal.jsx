"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { api } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { Loader2Icon, CalendarIcon } from "lucide-react";

const HOUR_OPTIONS = ["1", "2", "3", "4", "5", "6", "8", "10", "12"];
const TIME_OPTIONS = [
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
  "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
];

export function BookingModal({ open, onOpenChange, studio }) {
  const { data: session } = useSession();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [hours, setHours] = useState("2");
  const [loading, setLoading] = useState(false);

  // Default to tomorrow so the form is never empty
  useEffect(() => {
    if (open && !date) {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      setDate(d.toISOString().slice(0, 10));
    }
  }, [open, date]);

  const rate = Number(studio?.hourlyRate || 0);
  const total = useMemo(() => rate * Number(hours || 0), [rate, hours]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date) {
      toast.error("Please pick a booking date");
      return;
    }
    setLoading(true);
    try {
      await api.post("/bookings", {
        studioId: studio._id,
        date,
        startTime: time,
        hours: Number(hours),
        bookerName: session?.user?.name,
        bookerEmail: session?.user?.email,
      });
      toast.success("Booking created! Status: Pending until the host confirms.");
      onOpenChange(false);
    } catch (err) {
      toast.error(err.message || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book “{studio?.title}”</DialogTitle>
          <DialogDescription>
            Select your shoot slot — the reservation is created with status
            “Pending” until the host confirms.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="booking-date">Date</Label>
              <div className="relative">
                <CalendarIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="booking-date"
                  type="date"
                  min={new Date().toISOString().slice(0, 10)}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="pl-9"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="booking-time">Start Time</Label>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger id="booking-time" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TIME_OPTIONS.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="booking-hours">Shoot Hours</Label>
            <Select value={hours} onValueChange={setHours}>
              <SelectTrigger id="booking-hours" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {HOUR_OPTIONS.map((h) => (
                  <SelectItem key={h} value={h}>
                    {h} hour{h !== "1" ? "s" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />
          {/* Live price breakdown */}
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>
                ${rate.toFixed(0)} × {hours} hour{hours !== "1" ? "s" : ""}
              </span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2Icon className="size-4 animate-spin" /> : null}
              Confirm Booking
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
