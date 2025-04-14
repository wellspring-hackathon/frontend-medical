import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { profile } from "./profile";
import { relations } from "drizzle-orm";
import { deposit } from "./deposit";

export const consultation = pgTable("consultation-wellspring", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .references(() => profile.id, {
      onDelete: "cascade"
    }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  depositId: uuid("deposit_id").references(() => deposit.id, {
    onDelete: "cascade"
  }),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const consultationRelations = relations(consultation, ({ one }) => ({
  profile: one(profile, {
    fields: [consultation.userId],
    references: [profile.id]
  })
}));

export type ConsultationSelect = typeof consultation.$inferSelect;
export type ConsultationInsert = typeof consultation.$inferInsert;
