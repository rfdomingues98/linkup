import { PencilLineIcon } from "lucide-react";

export const EmptyFeed = () => {
  return (
    <div className="my-12 flex flex-col items-center justify-center gap-4">
      <PencilLineIcon
        size={48}
        strokeWidth={1}
        className="text-muted-foreground"
      />
      <p className="text-muted-foreground">
        No posts found. Be the first to post something!
      </p>
    </div>
  );
};
