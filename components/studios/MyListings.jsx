"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PackageIcon, PlusIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { PageLoader } from "@/components/shared/PageLoader";
import { TableSkeleton } from "@/components/shared/Skeletons";
import { EmptyState } from "@/components/shared/EmptyState";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { CategoryBadge } from "@/components/shared/StatusBadge";

export function MyListings() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [target, setTarget] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await api.get("/studios/mine", { silent: true });
      setListings(data?.data || data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openDelete = (studio) => {
    setTarget(studio);
    setConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (!target) return;
    setDeleting(true);
    try {
      await api.delete(`/studios/${target._id}`);
      toast.success(`“${target.title}” was deleted`);
      setConfirmOpen(false);
      setTarget(null);
      load();
    } catch (err) {
      toast.error(err.message || "Delete failed. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="container-w py-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">My Studio Listings</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Spaces you own — update details or remove listings anytime.
          </p>
        </div>
        <Button render={<Link href="/add-studio" />}>
          <PlusIcon /> Add New Studio
        </Button>
      </div>

      {loading ? (
        <TableSkeleton />
      ) : listings && listings.length > 0 ? (
        <>
          {/* Desktop table */}
          <Card className="hidden overflow-hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/3">Studio</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listings.map((s) => (
                  <TableRow key={s._id}>
                    <TableCell>
                      <Link
                        href={`/studios/${s._id}`}
                        className="flex items-center gap-3 hover:text-primary"
                      >
                        <span className="relative block size-14 shrink-0 overflow-hidden rounded-lg border bg-muted">
                          {s.images?.[0] || s.image ? (
                            <Image
                              src={s.images?.[0] || s.image}
                              alt={s.title}
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          ) : null}
                        </span>
                        <span className="line-clamp-1 font-medium">{s.title}</span>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <CategoryBadge category={s.category} />
                    </TableCell>
                    <TableCell className="font-semibold text-primary">
                      ${Number(s.hourlyRate).toFixed(0)} / hr
                    </TableCell>
                    <TableCell className="max-w-40 truncate text-muted-foreground">
                      {s.location}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          render={
                            <Link href={`/studios/edit/${s._id}`} />
                          }
                        >
                          <PencilIcon /> Update
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => openDelete(s)}
                        >
                          <Trash2Icon /> Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* Mobile cards */}
          <div className="space-y-4 md:hidden">
            {listings.map((s) => (
              <Card key={s._id}>
                <CardContent className="space-y-3 p-4">
                  <div className="flex gap-3">
                    <span className="relative block size-16 shrink-0 overflow-hidden rounded-lg border bg-muted">
                      {s.images?.[0] || s.image ? (
                        <Image
                          src={s.images?.[0] || s.image}
                          alt={s.title}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      ) : null}
                    </span>
                    <div className="min-w-0">
                      <Link href={`/studios/${s._id}`} className="line-clamp-1 font-semibold hover:text-primary">
                        {s.title}
                      </Link>
                      <div className="mt-1 flex items-center gap-2">
                        <CategoryBadge category={s.category} />
                        <span className="text-sm font-semibold text-primary">
                          ${Number(s.hourlyRate).toFixed(0)} / hr
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="truncate text-xs text-muted-foreground">{s.location}</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      render={<Link href={`/studios/edit/${s._id}`} />}
                    >
                      <PencilIcon /> Update
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => openDelete(s)}>
                      <Trash2Icon /> Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <EmptyState
          icon={PackageIcon}
          title="You haven't listed any studios yet"
          description="Turn your creative space into income — it takes about three minutes to list."
          actionLabel="Add New Studio"
          actionHref="/add-studio"
        />
      )}

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete this studio listing?"
        description={`“${target?.title}” will be permanently removed from StudioSpace. This action cannot be undone.`}
        confirmLabel="Delete Listing"
        loading={deleting}
        onConfirm={handleDelete}
      />
    </div>
  );
}
