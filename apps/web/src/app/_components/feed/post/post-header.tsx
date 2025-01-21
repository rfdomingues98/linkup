import { Avatar, AvatarImage } from "@linkup/ui/avatar";
import { CardDescription, CardTitle } from "@linkup/ui/card";
import { FormattedDateTime } from "@linkup/ui/formatted-datetime";

import { PostActionsMenu } from "./post-actions-menu";

export function PostHeader() {
  return (
    <>
      <div className="flex flex-1 flex-row gap-3">
        <Avatar>
          <AvatarImage src="https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yTk9FSkZxbUpzTGdLZlY1emVNQ2tNZWVuNkkiLCJyaWQiOiJ1c2VyXzJyajRGRUwyeWZOUjJiZk1LakV2QUVvYmJtaSJ9?width=80" />
        </Avatar>
        <div>
          <CardTitle>Ricardo Domingues</CardTitle>
          <CardDescription>
            <FormattedDateTime date={new Date(2025, 0, 18, 15, 51)} />
          </CardDescription>
        </div>
      </div>
      <PostActionsMenu />
    </>
  );
}
