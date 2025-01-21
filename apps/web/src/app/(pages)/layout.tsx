import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { Bookmark, Infinity } from "lucide-react";

import { Button } from "@linkup/ui/button";
import { SearchBar } from "@linkup/ui/search-bar";

import { CustomUserButton } from "../_components/custom-user-button";
import { NotificationsPopover } from "../_components/notifications-popover";

interface PagesLayoutProps {
  children: React.ReactNode;
}

export default async function PagesLayout({ children }: PagesLayoutProps) {
  const user = await currentUser();

  if (!user) redirect("/login");

  /* const dbUser = await db.user.findUnique({
    where: {
      id: user?.id,
      email: getUserEmail(user),
    },
  });

  if (!dbUser) redirect("/account?origin=/"); */

  return (
    <div className="flex min-h-screen flex-col gap-3 p-3">
      <header className="sticky top-0 z-50 w-full bg-background">
        <div className="flex h-14 items-center justify-between">
          <div className="flex max-w-[360px] flex-1 items-center gap-2">
            <a className="mr-4 flex items-center gap-2 lg:mr-6" href="/">
              <Infinity size={32} className="-rotate-[18deg]" />
              <span className="font-bold">LinkUp</span>
            </a>
          </div>
          <div className="max-w-[720px] flex-1">
            <SearchBar />
          </div>

          <div className="flex max-w-[360px] flex-1 items-center justify-end gap-5">
            <NotificationsPopover />
            <Button variant="secondary" size="icon">
              <Bookmark />
            </Button>
            <CustomUserButton />
          </div>
        </div>
      </header>
      <main className="w-full flex-1 rounded-md bg-muted/50 p-3 sm:p-5">
        {children}
      </main>
    </div>
  );
}
