import {
  pgTable,
  integer,
  text,
  uuid,
  varchar,
  timestamp
} from "drizzle-orm/pg-core";
import { user } from "./user";
import { relations } from "drizzle-orm";

export const healthcareProviders = pgTable("healthcare_providers", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  address: text("address").notNull(),
  localGovernment: varchar("local_government", { length: 100 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 100 }).default("Edo").notNull(),
  contactPhone: varchar("contact_phone", { length: 20 }).notNull(),
  contactEmail: varchar("contact_email", { length: 255 }).notNull(),
  specialties: text("specialties").array().notNull(),
  availableBeds: integer("available_beds").notNull(),
  equipment: text("equipment").array().notNull(),
  createdBy: uuid("created_by")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade"
    }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const healthcareRelations = relations(
  healthcareProviders,
  ({ one }) => ({
    profile: one(user, {
      fields: [healthcareProviders.createdBy],
      references: [user.id]
    })
  })
);

export type HealthcareSelect = typeof healthcareProviders.$inferSelect;
export type HealthcareInsert = typeof healthcareProviders.$inferInsert;
