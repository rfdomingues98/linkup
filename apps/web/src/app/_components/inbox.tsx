import { SquarePenIcon } from "lucide-react";

import { Avatar, AvatarImage } from "@linkup/ui/avatar";
import { Button } from "@linkup/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@linkup/ui/card";
import { Input } from "@linkup/ui/input";

const mockFriends = [
  {
    id: 1,
    name: "Ricardo Domingues",
  },
  {
    id: 2,
    name: "John Doe",
  },
  {
    id: 3,
    name: "Jane Doe",
  },
  {
    id: 4,
    name: "John Doe",
  },
  {
    id: 5,
    name: "John Doe",
  },
  {
    id: 6,
    name: "John Doe",
  },
  {
    id: 7,
    name: "John Doe",
  },
  {
    id: 8,
    name: "John Doe",
  },
  {
    id: 9,
    name: "John Doe",
  },
  {
    id: 10,
    name: "John Doe",
  },
];

const InboxChat = ({ id, name }: { id: number; name: string }) => {
  const avatar = `https://avatar.iran.liara.run/public/${id}`;
  return (
    <button
      key={id}
      className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-muted"
    >
      <Avatar className="size-8 shadow">
        <AvatarImage src={avatar} alt={name} />
      </Avatar>
      <span className="text-sm font-medium">{name}</span>
    </button>
  );
};

export const Inbox = () => {
  return (
    <Card className="flex h-max flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
        <CardTitle className="text-md font-medium">Messages</CardTitle>
        <Button size="icon" variant="ghost">
          <SquarePenIcon className="size-5" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto pt-4">
        <div className="space-y-3">
          <Input
            type="search"
            placeholder="Search messages..."
            className="h-9"
          />
          <div className="space-y-1">
            {mockFriends.map((friend) => (
              <InboxChat key={friend.id} id={friend.id} name={friend.name} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
