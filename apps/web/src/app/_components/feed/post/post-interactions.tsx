import {
  BookmarkIcon,
  HeartIcon,
  MessageCircleIcon,
  Repeat2Icon,
} from "lucide-react";
import pluralize from "pluralize";

import { cn } from "@linkup/ui";
import { Button } from "@linkup/ui/button";
import { TextWithTooltip } from "@linkup/ui/text-with-tooltip";

import { formatNumber } from "~/lib/utils";

function PostInteraction({
  icon,
  text,
  count,
  className,
}: {
  icon: React.ReactNode;
  text?: string;
  count?: number;
  className?: string;
}) {
  const formattedCount = count ? formatNumber(count) : undefined;
  return (
    <Button
      variant="link"
      className={cn(
        "w-max gap-1 text-foreground/60 hover:no-underline",
        className,
      )}
    >
      {icon}
      {text && count && (
        <TextWithTooltip text={`${formattedCount} ${pluralize(text, count)}`} />
      )}
    </Button>
  );
}

export function PostInteractions() {
  return (
    <div className="flex flex-1 items-center justify-between">
      <div>
        <PostInteraction
          text="Like"
          count={321422}
          className="hover:text-pink-600"
          icon={<HeartIcon />}
        />
        <PostInteraction
          text="Comment"
          count={4}
          className="hover:text-yellow-600"
          icon={<MessageCircleIcon />}
        />
        <PostInteraction
          text="Share"
          count={1}
          className="hover:text-green-600"
          icon={<Repeat2Icon />}
        />
      </div>
      <PostInteraction
        className="hover:text-blue-600"
        icon={<BookmarkIcon />}
      />
    </div>
  );
}
