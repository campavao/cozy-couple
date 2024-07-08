"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  BoxesIcon,
  CalendarDaysIcon,
  LineChartIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileMenu() {
  const page = usePathname();

  if (page === "/home") {
    return;
  }

  return (
    <NavigationMenu className='h-[60px] flex items-center justify-evenly fixed bottom-0 bg-white w-full shadow-flat'>
      <NavigationMenuList className='w-screen'>
        <NavigationMenuItem>
          <Link href='/today' type='navlink' legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <CalendarDaysIcon
                className={
                  page === "/today" ? "text-darkest-blue" : "text-blue"
                }
              />
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <BoxesIcon
              className={
                page === "/pickups" ||
                page === "/deliveries" ||
                page === "/inventory"
                  ? "text-darkest-blue"
                  : "text-blue"
              }
            />
          </NavigationMenuTrigger>
          <NavigationMenuContent className='flex flex-col gap-4 p-4'>
            <Link href='/deliveries' type='navlink' legacyBehavior passHref>
              <NavigationMenuLink>Deliveries</NavigationMenuLink>
            </Link>
            <Link href='/inventory' type='navlink' legacyBehavior passHref>
              <NavigationMenuLink>Inventory</NavigationMenuLink>
            </Link>
            <Link href='/pickups' type='navlink' legacyBehavior passHref>
              <NavigationMenuLink>Pickups</NavigationMenuLink>
            </Link>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href='/analytics' type='navlink' legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <LineChartIcon
                className={
                  page === "/analytics" ? "text-darkest-blue" : "text-blue"
                }
              />
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href='/profile' type='navlink' legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <UserIcon
                className={
                  page === "/profile" ? "text-darkest-blue" : "text-blue"
                }
              />
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
