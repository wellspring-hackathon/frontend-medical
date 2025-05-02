import { pgTable, text, uuid, varchar, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user";

export const patient = pgTable("patient_schema", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  address: text("address").notNull(),
  localGovernment: varchar("local_government", { length: 100 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 100 }).default("Edo").notNull(),
  contactPhone: varchar("contact_phone", { length: 20 }).notNull(),
  contactEmail: varchar("contact_email", { length: 255 }).notNull(),
  sickness: varchar("sickness", { length: 255 }).notNull(),
  createdBy: uuid("created_by")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade"
    }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export type PatientSelect = typeof patient.$inferSelect;
export type PatientInsert = typeof patient.$inferInsert;
