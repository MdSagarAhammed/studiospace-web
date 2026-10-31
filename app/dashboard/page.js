import { RequireAuth } from "@/components/shared/RequireAuth";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PlusCircleIcon,
  BuildingIcon,
  CalendarCheckIcon,
  CompassIcon,
} from "lucide-react";

export const metadata = { title: "Dashboard" };

const LINKS = [
  {
    href: "/add-studio",
    icon: PlusCircleIcon,
    title: "Add New Studio",
    text: "List a creative space and start welcoming creators.",
  },
  {
    href: "/my-listings",
    icon: BuildingIcon,
    title: "My Studio Listings",
    text: "Update details or manage the spaces you host.",
  },
  {
    href: "/my-bookings",
    icon: CalendarCheckIcon,
    title: "My Bookings",
    text: "Track reservations you've made — pending to completed.",
  },
  {
    href: "/studios",
    icon: CompassIcon,
    title: "Explore Studios",
    text: "Find your next shoot location by category or city.",
  },
];

export default function DashboardPage() {
  return (
    <RequireAuth>
      <div className="container-w py-10">
        <SectionHeading
          align="left"
          eyebrow="Dashboard"
          title="Welcome To Your Studio Hub"
          subtitle="Everything you do on StudioSpace starts from here."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {LINKS.map((link) => (
            <Card key={link.href} className="transition-shadow hover:shadow-md">
              <CardContent className="flex h-full items-start gap-4 p-6">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <link.icon className="size-5" />
                </span>
                <div className="flex-1">
                  <h3 className="font-semibold">{link.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{link.text}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 px-2 text-primary"
                    render={<a href={link.href} />}
                  >
                    Open →
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </RequireAuth>
  );
}
