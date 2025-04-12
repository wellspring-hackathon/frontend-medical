import { pgTable, integer,  uuid } from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";

export const user = pgTable("user-wellspring", {
id: uuid("id").defaultRandom().primaryKey(),
  balance: integer("balance").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => profile.id, {
      onDelete: "cascade",
    }),
});

export const userRelations = relations(user, ({ one }) => ({
      profile: one(profile, {
        fields: [user.userId],
        references: [profile.id],
      }),
    }));

export type UserSelect = typeof user.$inferSelect;
export type UserInsert = typeof user.$inferInsert;
