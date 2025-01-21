import { pgTable } from "drizzle-orm/pg-core";

import { users } from "./users";

export const messages = pgTable("messages", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  senderId: t
    .uuid()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  recipientId: t
    .uuid()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  content: t.text().notNull(),
  readAt: t.timestamp({ mode: "date", withTimezone: true }),
  createdAt: t.timestamp().defaultNow().notNull(),
}));
