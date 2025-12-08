"use client";
import {
  FastForward,
  HomeIcon,
  MenuIcon,
  Settings2Icon,
  ShieldCheckIcon,
} from "lucide-react";
import React, { useState } from "react";
import Logo from "@/components/Logo";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./ThemeModeToggle";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import UserNavbar from "./UserNavbar";

// Here we define all the routes in the application
const routes = [
  {
    href: "",
    label: "Home",
    icon: HomeIcon,
  },
  {
    href: "automations",
    label: "Automations",
    icon: FastForward,
  },
  {
    href: "credentials",
    label: "Credentials",
    icon: ShieldCheckIcon,
  },
  {
    href: "settings",
    label: "Settings",
    icon: Settings2Icon,
  },
];

function DesktopSidebar() {
  const pathname = usePathname();
  const activeRoute =
    routes.find(
      (route) => route.href.length > 0 && pathname.includes(route.href)
    ) || routes[0];
  return (
    <div className="hidden md:flex md:flex-col relative min-w-[280px] max-w-[280px] h-screen overflow-hidden w-full bg-primary/5 dark:bg-secondary/30 dark:text-foreground text-muted-foreground border-r-2 border-separate">
      <div className="flex p-4">
        <Logo />
      </div>
      <div className="flex flex-col p-2 gap-2">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={buttonVariants({
              variant:
                activeRoute.href === route.href
                  ? "sidebarActiveItem"
                  : "sidebarItem",
            })}
          >
            <route.icon size={20} />
            {route.label}
          </Link>
        ))}
      </div>
      <div className="mt-auto p-1">
        <UserNavbar />
      </div>
    </div>
  );
}

export function MobileSidebar() {
  const [isOpen, setOpen] = useState(false);
  const pathname = usePathname();

  const activeRoute =
    routes.find(
      (route) => route.href.length > 0 && pathname.includes(route.href)
    ) || routes[0];

  return (
    <div className="block border-separate bg-background md:hidden">
      <nav className="container flex items-center justify-between px-8">
        <Sheet open={isOpen} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent
            className="flex h-full w-[400px] flex-col gap-4 sm:w-[540px]"
            side={"left"}
          >
            <Logo />
            <div className="flex-1 flex flex-col gap-1 overflow-y-auto">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={buttonVariants({
                    variant:
                      activeRoute.href === route.href
                        ? "sidebarActiveItem"
                        : "sidebarItem",
                  })}
                  onClick={() => setOpen((prev) => !prev)}
                >
                  <route.icon size={20} />
                  {route.label}
                </Link>
              ))}
            </div>
            <div className="mt-auto">
              <UserNavbar isMobile />
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}

export default DesktopSidebar;
