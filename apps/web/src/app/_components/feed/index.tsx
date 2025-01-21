import { currentUser } from "@clerk/nextjs/server";
import { AtSignIcon, FileIcon, HashIcon, VideoIcon } from "lucide-react";

import { Avatar, AvatarImage } from "@linkup/ui/avatar";
import { Button } from "@linkup/ui/button";
import { Card, CardContent } from "@linkup/ui/card";
import { Input } from "@linkup/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@linkup/ui/select";
import { Separator } from "@linkup/ui/separator";
import { TextWithTooltip } from "@linkup/ui/text-with-tooltip";

import { EmptyFeed } from "./empty";
import { Post } from "./post";
import { MultiUploader } from "./upload";

const PostButtons = [
  {
    icon: FileIcon,
    iconColor: "text-orange-500",
    label: "Attachment",
  },
  {
    icon: VideoIcon,
    iconColor: "text-red-500",
    label: "Live",
  },
  {
    icon: HashIcon,
    iconColor: "text-green-500",
    label: "Hashtag",
  },
  {
    icon: AtSignIcon,
    iconColor: "text-purple-500",
    label: "Mention",
  },
];

const posts = Array.from({ length: 15 }, (_, index) => ({
  id: index + 1,
}));

export const Feed = async () => {
  const user = await currentUser();

  return (
    <div className="flex flex-1 justify-center rounded-md">
      <div className="flex max-w-[720px] flex-1 flex-col">
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Avatar>
                <AvatarImage src={user?.imageUrl} />
              </Avatar>
              <Input placeholder="What's on your mind?" />
              <Button>Share Post</Button>
            </div>
            <div id="ut-attachments" className="mt-3" />
            <Separator className="my-4" />
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-x-3">
                <MultiUploader />
                {PostButtons.map((button) => (
                  <Button
                    key={button.label}
                    variant="ghost"
                    className="w-max gap-1 p-2"
                  >
                    <button.icon className={button.iconColor} />
                    <TextWithTooltip text={button.label} />
                  </Button>
                ))}
              </div>
              <div className="text-foreground/60 hover:text-foreground/80">
                <Select>
                  <SelectTrigger className="h-min border-none p-0 shadow-none">
                    <SelectValue placeholder="Public" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="following">Following</SelectItem>
                    <SelectItem value="mentioned">Mentioned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="my-4 flex items-center gap-2">
          <div className="flex-1">
            <Separator />
          </div>
          <p className="flex items-center gap-1.5 whitespace-nowrap text-sm text-muted-foreground">
            Sort by:
            <Select>
              <SelectTrigger className="h-min border-none p-0 shadow-none">
                <SelectValue placeholder="Following" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="following">Following</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </p>
        </div>
        {posts.length > 0 ? (
          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <Post key={post.id} id={post.id} />
            ))}
          </div>
        ) : (
          <EmptyFeed />
        )}
      </div>
    </div>
  );
};
