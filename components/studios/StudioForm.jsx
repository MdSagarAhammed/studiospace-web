"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";
import { api, uploadToImgbb } from "@/lib/api";
import { STUDIO_CATEGORIES, AMENITIES } from "@/lib/constants";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageLoader } from "@/components/shared/PageLoader";
import { Loader2Icon, ImagePlusIcon, LockIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "cn";

const EMPTY = {
  title: "",
  category: "",
  hourlyRate: "",
  securityDeposit: "",
  maxCapacity: "",
  location: "",
  image: "",
  amenities: [],
  overview: "",
};

export function StudioForm({ mode = "add", id }) {
  const isEdit = mode === "edit";
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(isEdit); // wait for prefilled data on edit
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Prefill for edit mode
  useEffect(() => {
    if (!isEdit) return;
    let cancelled = false;
    api
      .get(`/studios/${id}`, { silent: true })
      .then((data) => {
        if (cancelled) return;
        const s = data?.data || data;
        setForm({
          title: s.title || "",
          category: s.category || "",
          hourlyRate: s.hourlyRate ?? "",
          securityDeposit: s.securityDeposit ?? "",
          maxCapacity: s.maxCapacity ?? "",
          location: s.location || "",
          image: s.images?.[0] || s.image || "",
          amenities: s.amenities || [],
          overview: s.overview || "",
        });
      })
      .catch(() => toast.error("Couldn't load this studio for editing"))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [isEdit, id]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const toggleAmenity = (amenity) => {
    setForm((f) => ({
      ...f,
      amenities: f.amenities.includes(amenity)
        ? f.amenities.filter((a) => a !== amenity)
        : [...f.amenities, amenity],
    }));
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadToImgbb(file);
      setForm((f) => ({ ...f, image: url }));
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(err.message || "Image upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const payload = {
      ...form,
      hourlyRate: Number(form.hourlyRate),
      securityDeposit: Number(form.securityDeposit || 0),
      maxCapacity: Number(form.maxCapacity),
      ownerName: session?.user?.name,
      ownerEmail: session?.user?.email,
    };
    payload.images = [payload.image].filter(Boolean);
    delete payload.image;

    try {
      if (isEdit) {
        await api.put(`/studios/${id}`, payload);
        toast.success("Studio updated successfully");
      } else {
        await api.post("/studios", payload);
        toast.success("Studio listed successfully!");
      }
      router.push("/my-listings");
      router.refresh();
    } catch (err) {
      toast.error(err.message || "Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (isPending || loading) return <PageLoader label="Preparing the form…" />;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="grid gap-4 p-6 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="title">Studio Title *</Label>
              <Input
                id="title"
                required
                placeholder="e.g. Sunlit Rooftop Cyc Wall Studio"
                value={form.title}
                onChange={set("title")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={form.category}
                onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}
              >
                <SelectTrigger id="category" className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {STUDIO_CATEGORIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxCapacity">Max Capacity *</Label>
              <Input
                id="maxCapacity"
                type="number"
                min="1"
                required
                placeholder="10"
                value={form.maxCapacity}
                onChange={set("maxCapacity")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hourlyRate">Hourly Rate ($) *</Label>
              <Input
                id="hourlyRate"
                type="number"
                min="0"
                step="0.5"
                required
                placeholder="45"
                value={form.hourlyRate}
                onChange={set("hourlyRate")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="securityDeposit">Security Deposit ($)</Label>
              <Input
                id="securityDeposit"
                type="number"
                min="0"
                placeholder="100"
                value={form.securityDeposit}
                onChange={set("securityDeposit")}
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="location">Location / Address *</Label>
              <Input
                id="location"
                required
                placeholder="123 Creative Ave, Brooklyn, NY"
                value={form.location}
                onChange={set("location")}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="grid gap-4 p-6">
            {/* Image upload via imgbb */}
            <div className="space-y-2">
              <Label htmlFor="image">Cover Image *</Label>
              <div className="flex gap-2">
                <Input
                  id="image"
                  type="url"
                  required
                  placeholder="https://i.ibb.co/…"
                  value={form.image}
                  onChange={set("image")}
                />
                <Button
                  type="button"
                  variant="outline"
                  disabled={uploading}
                  onClick={() => document.getElementById("imgbb-upload")?.click()}
                >
                  {uploading ? (
                    <Loader2Icon className="size-4 animate-spin" />
                  ) : (
                    <ImagePlusIcon className="size-4" />
                  )}
                  Upload
                </Button>
                <input
                  id="imgbb-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUpload}
                />
              </div>
              {form.image ? (
                <div className="relative mt-1 aspect-video overflow-hidden rounded-lg border bg-muted">
                  <Image src={form.image} alt="Cover preview" fill sizes="480px" className="object-cover" />
                </div>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label>Amenities</Label>
              <div className="grid max-h-56 grid-cols-2 gap-2 overflow-y-auto rounded-lg border p-3">
                {AMENITIES.map((amenity) => (
                  <label
                    key={amenity}
                    className={cn(
                      "flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted",
                      form.amenities.includes(amenity) && "bg-primary/10 font-medium"
                    )}
                  >
                    <Checkbox
                      checked={form.amenities.includes(amenity)}
                      onCheckedChange={() => toggleAmenity(amenity)}
                    />
                    {amenity}
                  </label>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-2">
            <Label htmlFor="overview">Detailed Overview *</Label>
            <Textarea
              id="overview"
              required
              rows={6}
              placeholder="Describe the space, natural light, floor plan, gear included, access rules…"
              value={form.overview}
              onChange={set("overview")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Read-only host info */}
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="p-6">
          <p className="mb-3 flex items-center gap-1.5 flex-wrap text-sm font-semibold">
            <LockIcon className="size-4 text-primary" /> Host Information
            <span className="text-xs font-normal text-muted-foreground">(read-only)</span>
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <Label htmlFor="hostName">Name</Label>
              <Input
                id="hostName"
                readOnly
                disabled
                value={session?.user?.name || ""}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="hostEmail">Email</Label>
              <Input
                id="hostEmail"
                readOnly
                disabled
                value={session?.user?.email || ""}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="submit"
          size="lg"
          disabled={submitting}
          className="h-11 px-8 text-base"
        >
          {submitting ? <Loader2Icon className="size-4 animate-spin" /> : null}
          {isEdit ? "Save Changes" : "List My Studio"}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="h-11"
          onClick={() => router.back()}
          disabled={submitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
