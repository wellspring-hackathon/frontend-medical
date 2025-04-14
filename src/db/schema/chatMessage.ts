import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user";
import { consultations } from "./consultation";
import { relations } from "drizzle-orm";

export const chatMessages = pgTable("chat_messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  consultationId: uuid("consultation_id")
    .notNull()
    .references(() => consultations.id, {
      onDelete: "cascade"
    }),
  senderId: uuid("sender_id")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade"
    }),
  message: text("message").notNull(),
  timestamp: timestamp("timestamp", { withTimezone: true })
    .defaultNow()
    .notNull()
});

export const chatMessagesRelations = relations(chatMessages, ({ one }) => ({
  sender: one(user, {
    fields: [chatMessages.senderId],
    references: [user.id]
  }),
  consultation: one(consultations, {
    fields: [chatMessages.consultationId],
    references: [consultations.id]
  })
}));

export type chatMessagesSelect = typeof chatMessages.$inferSelect;
export type chatMessagesInsert = typeof chatMessages.$inferInsert;
