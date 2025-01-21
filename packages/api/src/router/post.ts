import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { desc, eq, withCursorPagination } from "@linkup/db";
import { CreatePostSchema, posts, SelectPostSchema } from "@linkup/db/schema";

import { protectedProcedure, publicProcedure } from "../trpc";

export const postsRouter = {
  all: publicProcedure.query(({ ctx }) => {
    // return ctx.db.select().from(schema.posts).orderBy(desc(schema.posts.id));
    return ctx.db.query.posts.findMany({
      orderBy: desc(posts.id),
      limit: 10,
    });
  }),

  getInfinite: publicProcedure
    .input(
      z
        .object({
          limit: z.number().min(1).max(100).nullish(),
          cursor: z.string().nullish(),
        })
        .merge(SelectPostSchema),
    )
    .query(async ({ input, ctx }) => {
      const limit = input.limit ?? 20;
      const cursor = input.cursor;

      let timestamp: string | undefined;
      let id: string | undefined;
      if (cursor) {
        const split_cursor = cursor.split("_");
        timestamp = split_cursor[0];
        id = split_cursor[1];
      }

      const items = await ctx.db.query.posts.findMany({
        ...withCursorPagination({
          limit: limit,
          cursors: [
            [
              posts.createdAt,
              "desc",
              cursor && timestamp ? new Date(timestamp) : undefined,
            ],
            [posts.id, "asc", cursor ? id : undefined],
          ],
        }),
        orderBy: [desc(posts.createdAt)],
        columns: {
          id: true,
          content: true,
          imageUrl: true,
          createdAt: true,
        },
      });

      let nextCursor: string | null = null;
      if (items.length >= limit) {
        const lastItem = items.at(-1);
        nextCursor = lastItem
          ? `${lastItem.createdAt.toISOString()}_${lastItem.id}`
          : null;
      }

      return {
        data: items,
        nextCursor,
      };
    }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      // return ctx.db
      //   .select()
      //   .from(schema.posts)
      //   .where(eq(schema.posts.id, input.id));

      return ctx.db.query.posts.findFirst({
        where: eq(posts.id, input.id),
      });
    }),

  create: protectedProcedure
    .input(CreatePostSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(posts).values(input);
    }),

  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.db.delete(posts).where(eq(posts.id, input));
  }),
} satisfies TRPCRouterRecord;
