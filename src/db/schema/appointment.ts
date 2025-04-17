import {
  pgTable,
  pgEnum,
  text,
  timestamp,
  uuid,
  date
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./user";
import { healthcareProviders } from "./healthcare";

export const appointmentStatusEnum = pgEnum("appointment_status", [
  "pending",
  "confirmed",
  "cancelled",
  "completed"
]);
export const consultationTypeEnum = pgEnum("consultation_type", [
  "in-person",
  "teleconsultation"
]);


export const appointment = pgTable("appointment-table", {
  id: uuid("id").defaultRandom().primaryKey(),
  patientId: uuid("patient_id")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade"
    }),
  doctorId: uuid("doctor_id")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade"
    }),
  healthcareProviderId: uuid("healthcare_provider_id")
    .notNull()
    .references(() => healthcareProviders.id, {
      onDelete: "cascade"
    }),
  date: date("date").notNull(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  status: appointmentStatusEnum("status").default("pending").notNull(),
  notes: text("notes"),
  consultationType: consultationTypeEnum("consultation_type")
    .default("in-person")
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const appointmentRelations = relations(appointment, ({ one }) => ({
  patient: one(user, {
    fields: [appointment.patientId],
    references: [user.id]
  }),
  doctor: one(user, {
    fields: [appointment.doctorId],
    references: [user.id]
  }),
  healthcareProvider: one(healthcareProviders, {
    fields: [appointment.healthcareProviderId],
    references: [healthcareProviders.id]
  })
}));

export type AppointmentSelect = typeof appointment.$inferSelect;
export type AppointmentInsert = typeof appointment.$inferInsert;
