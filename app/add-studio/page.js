import { RequireAuth } from "@/components/shared/RequireAuth";
import { StudioForm } from "@/components/studios/StudioForm";
import { StudioFormHeader } from "@/components/studios/StudioFormHeader";

export const metadata = { title: "Add New Studio" };

export default function AddStudioPage() {
  return (
    <RequireAuth>
      <div className="container-w max-w-5xl py-10">
        <StudioFormHeader
          title="Add New Studio"
          subtitle="List your creative space and start getting booked by creators worldwide."
        />
        <StudioForm mode="add" />
      </div>
    </RequireAuth>
  );
}
