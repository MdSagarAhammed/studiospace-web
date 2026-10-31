"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import {
  LayoutDashboardIcon,
  PlusCircleIcon,
  BuildingIcon,
  CalendarCheckIcon,
  LogOutIcon,
  Loader2Icon,
  ChevronDownIcon,
} from "lucide-react";
import { cn } from "cn";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/studios", label: "Explore Studios" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#about", label: "About Us" },
];

function isActive(pathname, href) {
  if (href === "/#how-it-works" || href === "/#about") return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
    router.push("/");
    router.refresh();
  };

  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container-w flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" aria-label="StudioSpace home">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                isActive(pathname, link.href) && "text-primary"
              )}
            >
              {link.label}
              {isActive(pathname, link.href) ? (
                <span className="absolute inset-x-3 -bottom-[13px] h-0.5 rounded-full bg-primary" />
              ) : null}
            </Link>
          ))}
        </nav>

        {/* Auth area */}
        <div className="flex items-center gap-2">
          {isPending ? (
            <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <button className="flex items-center gap-2 rounded-full border border-transparent py-1 pr-2 pl-1 transition-colors hover:border-border" />
                }
              >
                <Avatar className="size-8">
                  <AvatarImage src={user.image || undefined} alt={user.name} />
                  <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                    {(user.name || "U").charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden max-w-28 truncate text-sm font-medium sm:block">
                  {user.name}
                </span>
                <ChevronDownIcon className="size-3.5 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <p className="truncate">{user.name}</p>
                  <p className="truncate text-xs font-normal text-muted-foreground">
                    {user.email}
                  </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem render={<Link href="/dashboard" />}>
                  <LayoutDashboardIcon /> Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/add-studio" />}>
                  <PlusCircleIcon /> Add New Studio
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/my-listings" />}>
                  <BuildingIcon /> My Studio Listings
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/my-bookings" />}>
                  <CalendarCheckIcon /> My Bookings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOutIcon /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Button variant="ghost" render={<Link href="/login" />}>
                Login
              </Button>
              <Button render={<Link href="/register" />}>Register</Button>
            </div>
          )}

          {/* Mobile toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </Button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen ? (
        <div className="border-t md:hidden">
          <nav className="container-w flex flex-col gap-1 py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
                  isActive(pathname, link.href) && "text-primary"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2 border-t pt-3">
              {user ? (
                <>
                  <Button variant="outline" render={<Link href="/dashboard" />}>
                    Dashboard
                  </Button>
                  <Button variant="destructive" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" render={<Link href="/login" />}>
                    Login
                  </Button>
                  <Button render={<Link href="/register" />}>Register</Button>
                </>
              )}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
