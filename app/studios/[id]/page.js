import { Suspense } from "react";
import { StudioDetails } from "@/components/studios/StudioDetails";
import { PageLoader } from "@/components/shared/PageLoader";

export const metadata = { title: "Studio Details" };

export default function StudioDetailsPage({ params }) {
  // `params` is URL data. Reading it here (outside a Suspense boundary) would
  // tie the shared App Shell to one URL; passing the promise down keeps the
  // shell URL-independent — only this region streams per navigation.
  return (
    <Suspense fallback={<PageLoader label="Loading studio…" />}>
      <StudioDetailsContent params={params} />
    </Suspense>
  );
}

async function StudioDetailsContent({ params }) {
  const { id } = await params;
  return <StudioDetails id={id} />;
}
