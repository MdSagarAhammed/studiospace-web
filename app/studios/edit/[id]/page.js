import { RequireAuth } from "@/components/shared/RequireAuth";
import { StudioForm } from "@/components/studios/StudioForm";
import { StudioFormHeader } from "@/components/studios/StudioFormHeader";

export const metadata = { title: "Update Studio" };

export default async function EditStudioPage({ params }) {
  const { id } = await params;
  return (
    <RequireAuth>
      <div className="container-w max-w-5xl py-10">
        <StudioFormHeader
          title="Update Studio"
          subtitle="Tweak your listing — updated details go live immediately."
        />
        <StudioForm mode="edit" id={id} />
      </div>
    </RequireAuth>
  );
}
