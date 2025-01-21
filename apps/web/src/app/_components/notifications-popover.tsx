"use client";

import { formatDistanceToNow } from "date-fns";
import { Bell, CheckIcon, MoreVerticalIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@linkup/ui/avatar";
import { Button } from "@linkup/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@linkup/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@linkup/ui/popover";
import { ScrollArea } from "@linkup/ui/scroll-area";
import { Separator } from "@linkup/ui/separator";

interface Notification {
  id: string;
  type: "like" | "comment" | "follow" | "message";
  data: Record<string, unknown>;
  actorName: string;
  createdAt: Date;
  read: boolean;
}

// Temporary mock data
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "like",
    data: { postId: 1 },
    actorName: "John Doe",
    createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    read: false,
  },
  {
    id: "2",
    type: "comment",
    data: { postId: 2, comment: "Great post!" },
    actorName: "Jane Smith",
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
  },
  {
    id: "3",
    type: "follow",
    data: {},
    actorName: "Mike Johnson",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: true,
  },
  {
    id: "4",
    type: "follow",
    data: {},
    actorName: "Mike Johnson",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: true,
  },
  {
    id: "5",
    type: "follow",
    data: {},
    actorName: "Mike Johnson",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: true,
  },
  {
    id: "6",
    type: "follow",
    data: {},
    actorName: "Mike Johnson",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: true,
  },
  {
    id: "7",
    type: "follow",
    data: {},
    actorName: "Mike Johnson",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: true,
  },
  {
    id: "8",
    type: "follow",
    data: {},
    actorName: "Mike Johnson",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: true,
  },
];

export function NotificationsPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" size="icon" className="relative">
          <Bell />
          {mockNotifications.some((n) => !n.read) && (
            <div className="absolute right-2.5 top-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive" />
              </span>
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent id="notifications" className="w-96 p-0">
        <div className="flex items-center justify-between p-4">
          <h4 className="text-sm font-semibold">Notifications</h4>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreVerticalIcon className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent id="notification-actions">
              <DropdownMenuItem className="flex items-center gap-2">
                <CheckIcon size={16} /> Mark all as read
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="px-4">
          <Separator />
        </div>
        <ScrollArea className="h-96 px-2">
          <div className="flex flex-col gap-1 p-2">
            {mockNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`relative flex items-start gap-3 rounded-md p-2 text-sm ${
                  notification.read ? "text-muted-foreground opacity-70" : ""
                }`}
              >
                <Avatar className="size-8">
                  <AvatarImage
                    src={`https://avatar.iran.liara.run/public/${notification.id}`}
                    alt={notification.actorName}
                  />
                  <AvatarFallback>
                    {notification.actorName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0.5">
                  <p>
                    <span className="font-medium">
                      {notification.actorName}
                    </span>{" "}
                    {notification.type === "like" && "liked your post"}
                    {notification.type === "comment" &&
                      "commented on your post"}
                    {notification.type === "follow" && "started following you"}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(notification.createdAt, {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                {!notification.read && (
                  <div className="absolute right-0 top-5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive" />
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
