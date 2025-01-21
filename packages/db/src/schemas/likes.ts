import { pgTable, uniqueIndex } from "drizzle-orm/pg-core";

import { posts } from "./posts";
import { users } from "./users";

export const likes = pgTable(
  "likes",
  (t) => ({
    id: t.uuid().notNull().primaryKey().defaultRandom(),
    userId: t
      .uuid()
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    postId: t
      .uuid()
      .references(() => posts.id, { onDelete: "cascade" })
      .notNull(),
    createdAt: t.timestamp().defaultNow().notNull(),
  }),
  (table) => [
    uniqueIndex("likes_user_post_unique").on(table.userId, table.postId),
  ],
);
