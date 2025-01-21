"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@linkup/ui/card";

import { PostBody } from "./post-body";
import { PostHeader } from "./post-header";
import { PostInteractions } from "./post-interactions";

export const Post = ({ id }: { id: number }) => {
  return (
    <Card>
      <CardHeader className="flex flex-1 flex-row items-center justify-between">
        <PostHeader />
      </CardHeader>
      <CardContent className="p-0">
        <PostBody id={id} />
      </CardContent>
      <CardFooter className="p-2">
        <PostInteractions />
      </CardFooter>
    </Card>
  );
};
