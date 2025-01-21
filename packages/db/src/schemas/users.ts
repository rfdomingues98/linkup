import { relations, sql } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";

import { comments } from "./comments";
import { follows } from "./follows";
import { likes } from "./likes";
import { messages } from "./messages";
import { notifications } from "./notifications";
import { posts } from "./posts";

export const users = pgTable("user", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  clerkId: t.text().notNull(),
  username: t.text().notNull().unique(),
  fullName: t.varchar({ length: 255 }),
  bio: t.text(),
  avatarUrl: t.text(),
  email: t.varchar({ length: 255 }).notNull().unique(),
  emailVerified: t.timestamp({ mode: "date", withTimezone: true }),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .$onUpdateFn(() => sql`now()`),
}));

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  comments: many(comments),
  likes: many(likes),
  followedBy: many(follows, { relationName: "followedBy" }),
  following: many(follows, { relationName: "following" }),
  sentMessages: many(messages, { relationName: "sentMessages" }),
  receivedMessages: many(messages, { relationName: "receivedMessages" }),
  notifications: many(notifications),
}));
