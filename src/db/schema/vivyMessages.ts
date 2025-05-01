import {
  pgTable,
  uuid,
  text,
  timestamp,
  serial,
  varchar
} from "drizzle-orm/pg-core";
import { vivyChats } from "./vivyChats";
import { relations } from "drizzle-orm";

export const vivyMessages = pgTable("vivy_messages", {
  id: serial("id").primaryKey(),
  chatId: uuid("chat_id")
    .notNull()
    .references(() => vivyChats.id, { onDelete: "cascade" }),
  role: varchar("role", { length: 20 }).notNull(), // "user" | "assistant" | "system"
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const vivyMessagesRelations = relations(vivyMessages, ({ one }) => ({
  chat: one(vivyChats, {
    fields: [vivyMessages.chatId],
    references: [vivyChats.id]
  })
}));

export type messagesSelect = typeof vivyMessages.$inferSelect;
export type messagesInsert = typeof vivyMessages.$inferInsert;
