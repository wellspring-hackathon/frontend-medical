import { pgTable, uuid, timestamp, varchar } from "drizzle-orm/pg-core";
import { user } from "./user";
import { relations } from "drizzle-orm";

export const vivyChats = pgTable("vivy_chats", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade"
    })
});

export const vivyChatsRelations = relations(vivyChats, ({ one }) => ({
  user: one(user, {
    fields: [vivyChats.userId],
    references: [user.id]
  })
}));

export type chatsSelect = typeof vivyChats.$inferSelect;
export type chatsInsert = typeof vivyChats.$inferInsert;
