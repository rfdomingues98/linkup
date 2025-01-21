import { relations, sql } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { comments } from "./comments";
import { likes } from "./likes";
import { users } from "./users";

export const posts = pgTable("post", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  userId: t
    .uuid()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  content: t.text().notNull(),
  imageUrl: t.text(),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .$onUpdateFn(() => sql`now()`),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
  comments: many(comments),
  likes: many(likes),
}));

export const CreatePostSchema = createInsertSchema(posts, {
  userId: z.string().uuid(),
  content: z.string(),
  imageUrl: z.string().max(256).optional(),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

/* export const UpdatePostSchema = createUpdateSchema(posts, {
  content: z.string().optional(),
  imageUrl: z.string().max(256).optional(),
}); */

export const SelectPostSchema = createSelectSchema(posts);
