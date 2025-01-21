import { pgEnum, pgTable } from "drizzle-orm/pg-core";

import { users } from "./users";

export const notificationType = pgEnum("notification_type", [
  "like",
  "comment",
  "follow",
  "message",
]);

export const notifications = pgTable("notifications", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  userId: t
    .uuid()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  type: notificationType().notNull(),
  data: t.jsonb().notNull(),
  actorId: t
    .uuid()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  referenceId: t.integer().notNull(),
  readAt: t.timestamp({ mode: "date", withTimezone: true }),
  createdAt: t.timestamp().defaultNow().notNull(),
}));
