import type { AnyPgColumn } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";

import { posts } from "./posts";
import { users } from "./users";

export const comments = pgTable("comments", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  userId: t
    .uuid()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  postId: t
    .uuid()
    .references(() => posts.id, { onDelete: "cascade" })
    .notNull(),
  parentId: t
    .uuid()
    .references((): AnyPgColumn => comments.id, { onDelete: "cascade" }),
  content: t.text().notNull(),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .$onUpdateFn(() => sql`now()`),
}));

export const commentsRelations = relations(comments, ({ one, many }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
  author: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
  parent: one(comments, {
    fields: [comments.parentId],
    references: [comments.id],
  }),
  replies: many(comments, { relationName: "replies" }),
}));
