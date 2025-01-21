import { pgTable, uniqueIndex } from "drizzle-orm/pg-core";

import { users } from "./users";

export const follows = pgTable(
  "follows",
  (t) => ({
    id: t.uuid().notNull().primaryKey().defaultRandom(),
    followerId: t
      .uuid()
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    followingId: t
      .uuid()
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    createdAt: t.timestamp().defaultNow().notNull(),
  }),
  (table) => [
    uniqueIndex("follows_user_following_unique").on(
      table.followerId,
      table.followingId,
    ),
  ],
);
