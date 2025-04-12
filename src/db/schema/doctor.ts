import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { profile } from "./profile";
import { healthcare } from "./healthcare";
import { relations } from "drizzle-orm";

export const doctor = pgTable("doctor", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => profile.id, {
      onDelete: "cascade",
    }),
  healthcareProviderId: uuid("healthcare_provider_id")
    .notNull()
    .references(() => healthcare.id, {
      onDelete: "cascade",
    }),
  specialization: varchar("specialization", { length: 255 }).notNull(),
  licenseNumber: varchar("license_number", { length: 100 }).notNull(),
  availability: text("availability").array().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const doctorRelations = relations(doctor, ({ one }) => ({
  profile: one(profile, {
    fields: [doctor.userId],
    references: [profile.id],
  }),
  healthcareProvider: one(healthcare, {
    fields: [doctor.healthcareProviderId],
    references: [healthcare.id],
  }),
}));

export type DoctorSelect = typeof doctor.$inferSelect;
export type DoctorInsert = typeof doctor.$inferInsert;
