
import { pgTable, integer, text ,uuid } from "drizzle-orm/pg-core";
import { profile } from "./profile";
import { relations } from "drizzle-orm";

export const healthcare = pgTable("healthcare-wellspring", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => profile.id, {
        onDelete: "cascade",
      }),
  });

  export const healthcareRelations = relations(healthcare, ({ one }) => ({
        profile: one(profile, {
          fields: [healthcare.userId],
          references: [profile.id],
        }),
      }));

  export type HealthcareSelect = typeof healthcare.$inferSelect;
  export type HealthcareInsert = typeof healthcare.$inferInsert;