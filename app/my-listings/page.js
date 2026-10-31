import { RequireAuth } from "@/components/shared/RequireAuth";
import { MyListings } from "@/components/studios/MyListings";

export const metadata = { title: "My Studio Listings" };

export default function MyListingsPage() {
  return (
    <RequireAuth>
      <MyListings />
    </RequireAuth>
  );
}
