import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { user } from "./user";
import { healthcareProviders } from "./healthcare";
import { relations } from "drizzle-orm";

export const doctor = pgTable("doctor", {
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade"
    }),
  name:  varchar("name", { length: 255 }).notNull(),
  healthcareProviderId: uuid("healthcare_provider_id")
    .notNull()
    .references(() => healthcareProviders.id, {
      onDelete: "cascade"
    }),
  specialization: varchar("specialization", { length: 255 }).notNull(),
  licenseNumber: varchar("license_number", { length: 100 }).notNull(),
  availability: text("availability").array().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const doctorRelations = relations(doctor, ({ one }) => ({
  profile: one(user, {
    fields: [doctor.userId],
    references: [user.id]
  }),
  healthcareProvider: one(healthcareProviders, {
    fields: [doctor.healthcareProviderId],
    references: [healthcareProviders.id]
  })
}));

export type DoctorSelect = typeof doctor.$inferSelect;
export type DoctorInsert = typeof doctor.$inferInsert;
