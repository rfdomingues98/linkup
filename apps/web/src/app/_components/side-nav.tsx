import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import {
  CalendarIcon,
  FileIcon,
  HomeIcon,
  ImageIcon,
  StoreIcon,
  UsersIcon,
  VideoIcon,
} from "lucide-react";

import { Avatar, AvatarImage } from "@linkup/ui/avatar";
import { Badge } from "@linkup/ui/badge";
import { Button } from "@linkup/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@linkup/ui/card";
import { Separator } from "@linkup/ui/separator";
import { TextWithTooltip } from "@linkup/ui/text-with-tooltip";

const SideNavigationMenus = [
  {
    icon: HomeIcon,
    label: "Feed",
    active: true,
    badge: null,
  },
  {
    icon: UsersIcon,
    label: "Friends",
    active: false,
    badge: null,
  },
  {
    icon: CalendarIcon,
    label: "Events",
    active: false,
    badge: 3,
  },
  {
    icon: VideoIcon,
    label: "Watch Videos",
    active: false,
    badge: null,
  },
  {
    icon: ImageIcon,
    label: "Photos",
    active: false,
    badge: null,
  },
  {
    icon: StoreIcon,
    label: "Marketplace",
    active: false,
    badge: null,
  },
  {
    icon: FileIcon,
    label: "Files",
    active: false,
    badge: 7,
  },
];
export const SideNav = async () => {
  const formatter = new Intl.NumberFormat(
    typeof window === "undefined" ? "en" : navigator.language,
    { notation: "compact" },
  );
  const user = await currentUser();
  return (
    <div className="sticky top-[72px] flex h-[calc(100dvh-theme(spacing.20))] max-w-[360px] flex-1 shrink grow flex-col gap-4 overflow-y-auto rounded-md">
      <Card className="p-4">
        <div className="rounded-md bg-muted/50">
          <CardHeader className="flex flex-row gap-3">
            <Avatar>
              <AvatarImage src={user?.imageUrl} />
            </Avatar>
            <div>
              <CardTitle>Ricardo Domingues</CardTitle>
              <CardDescription>@_rdomin</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex justify-around gap-4 text-center font-medium">
              <p className="flex flex-col leading-none">
                {formatter.format(23513)}
                <span className="font-regular text-sm text-foreground/60">
                  followers
                </span>
              </p>
              <p className="flex flex-col leading-none">
                {formatter.format(2315)}
                <span className="font-regular text-sm text-foreground/60">
                  following
                </span>
              </p>
              <p className="flex flex-col leading-none">
                {formatter.format(532)}
                <span className="font-regular text-sm text-foreground/60">
                  posts
                </span>
              </p>
            </div>
          </CardContent>
        </div>
      </Card>
      <Card className="p-4">
        <CardContent className="p-0">
          <nav className="flex flex-col gap-2">
            {SideNavigationMenus.map((menu) => (
              <Button
                key={menu.label}
                variant="ghost"
                data-active={menu.active}
                className="w-full justify-start data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
              >
                <div className="flex max-w-full flex-1 items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <menu.icon />
                    <TextWithTooltip text={menu.label} />
                  </div>
                  {menu.badge !== null && <Badge>{menu.badge}</Badge>}
                </div>
              </Button>
            ))}
            <div className="px-3 pb-3 pt-2">
              <Separator />
            </div>
            <p className="px-4 text-sm font-medium uppercase text-foreground/60">
              Pages you like
            </p>
            {SideNavigationMenus.slice(0, 3).map((menu) => (
              <Button
                key={`${menu.label}-2`}
                variant="ghost"
                className="w-full justify-start"
              >
                <div className="flex max-w-full flex-1 items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <menu.icon />
                    <TextWithTooltip text={menu.label} />
                  </div>
                  {menu.badge !== null && <Badge>{menu.badge}</Badge>}
                </div>
              </Button>
            ))}
          </nav>
        </CardContent>
      </Card>
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-foreground/60">
        <Link href="/privacy" className="hover:underline">
          Privacy & Policy
        </Link>
        <Link href="/advertising" className="hover:underline">
          Advertising
        </Link>
        <Link href="/cookies" className="hover:underline">
          Cookies
        </Link>
        <Link href="/copyright" className="hover:underline">
          LinkUp © 2025
        </Link>
      </div>
    </div>
  );
};
