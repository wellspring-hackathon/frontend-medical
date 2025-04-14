import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./user";
import { appointment } from "./appointment";
import { relations } from "drizzle-orm";

export const medicalRecords = pgTable("medical_records", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  patientId: uuid("patient_id")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade"
    }),
  appointmentId: uuid("appointment_id")
    .notNull()
    .references(() => appointment.id, {
      onDelete: "cascade"
    }),
  diagnosis: text("diagnosis").notNull(),
  prescriptions: text("prescriptions").array().notNull(),
  notes: text("notes"),
  recordedBy: uuid("recorded_by")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade"
    }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const medicalRecordsRelations = relations(medicalRecords, ({ one }) => ({
  patient: one(user, {
    fields: [medicalRecords.patientId],
    references: [user.id]
  }),
  doctor: one(user, {
    fields: [medicalRecords.recordedBy],
    references: [user.id]
  }),
  appointment: one(appointment, {
    fields: [medicalRecords.appointmentId],
    references: [appointment.id]
  })
}));

export type medicalRecordsSelect = typeof medicalRecords.$inferSelect;
export type medicalRecordsInsert = typeof medicalRecords.$inferInsert;
