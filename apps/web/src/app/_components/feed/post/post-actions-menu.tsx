import {
  BookmarkIcon,
  EyeOffIcon,
  FlagIcon,
  LinkIcon,
  MegaphoneOff,
  MoreVerticalIcon,
  UserXIcon,
} from "lucide-react";

import { Button } from "@linkup/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@linkup/ui/dropdown-menu";

export function PostActionsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" size="icon" className="!mt-0 p-0">
          <MoreVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex justify-between">
            Save <BookmarkIcon size={17} />
          </DropdownMenuItem>
          <DropdownMenuItem className="flex justify-between">
            Not interested <EyeOffIcon size={17} />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex justify-between">
            Mute <MegaphoneOff size={17} />
          </DropdownMenuItem>
          <DropdownMenuItem className="flex justify-between">
            Block <UserXIcon size={17} />
          </DropdownMenuItem>
          <DropdownMenuItem className="flex justify-between">
            Report <FlagIcon size={17} />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex justify-between">
          Copy link <LinkIcon size={17} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
