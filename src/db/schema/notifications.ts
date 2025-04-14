import {
  pgTable,
  text,
  boolean,
  timestamp,
  uuid,
  pgEnum
} from "drizzle-orm/pg-core";
import { user } from "./user";
import { relations } from "drizzle-orm";

export const notificationsTypeEnum = pgEnum("consultation_type", [
  "appointment_reminder",
  "booking_confirmation"
]);

export const notifications = pgTable("notifications", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade"
    }),
  type: notificationsTypeEnum("type").default("appointment_reminder").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull()
});

export const notifcationsRelations = relations(notifications, ({ one }) => ({
  user: one(user, {
    fields: [notifications.userId],
    references: [user.id]
  })
}));

export type notificationsSelect = typeof notifications.$inferSelect;
export type notificationsInsert = typeof notifications.$inferInsert;
