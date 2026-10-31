import { RequireAuth } from "@/components/shared/RequireAuth";
import { MyBookings } from "@/components/booking/MyBookings";

export const metadata = { title: "My Bookings" };

export default function MyBookingsPage() {
  return (
    <RequireAuth>
      <MyBookings />
    </RequireAuth>
  );
}
