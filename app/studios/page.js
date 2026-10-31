import { Suspense } from "react";
import { ExploreStudios } from "@/components/studios/ExploreStudios";
import { StudioGridSkeleton } from "@/components/shared/Skeletons";

export const metadata = { title: "Explore Studios" };

export default function StudiosPage() {
  return (
    <Suspense
      fallback={
        <div className="container-w py-10">
          <StudioGridSkeleton count={9} />
        </div>
      }
    >
      <ExploreStudios />
    </Suspense>
  );
}
