import { Suspense } from "react";
import { RequireAuth } from "@/components/shared/RequireAuth";
import { StudioForm } from "@/components/studios/StudioForm";
import { StudioFormHeader } from "@/components/studios/StudioFormHeader";
import { PageLoader } from "@/components/shared/PageLoader";

export const metadata = { title: "Update Studio" };

export default function EditStudioPage({ params }) {
  // `params` is URL data — keep it behind Suspense so the App Shell stays
  // URL-independent (the header renders instantly, the form streams in).
  return (
    <RequireAuth>
      <div className="container-w max-w-5xl py-10">
        <StudioFormHeader
          title="Update Studio"
          subtitle="Tweak your listing — updated details go live immediately."
        />
        <Suspense fallback={<PageLoader label="Loading studio…" />}>
          <EditStudioContent params={params} />
        </Suspense>
      </div>
    </RequireAuth>
  );
}

async function EditStudioContent({ params }) {
  const { id } = await params;
  return <StudioForm mode="edit" id={id} />;
}
