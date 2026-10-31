import { StudioDetails } from "@/components/studios/StudioDetails";

export const metadata = { title: "Studio Details" };

export default async function StudioDetailsPage({ params }) {
  const { id } = await params;
  return <StudioDetails id={id} />;
}
