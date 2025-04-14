// drizzle/schema.ts
import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user";
import { relations } from "drizzle-orm";
import { appointment } from "./appointment";

// Consultation Table
export const consultations = pgTable("consultations", {
  id: uuid("id").defaultRandom().primaryKey(),
  appointmentId: uuid("appointment_id")
    .notNull()
    .references(() => appointment.id, {
      onDelete: "cascade"
    }),
  doctorId: uuid("doctor_id")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade"
    }),
  patientId: uuid("patient_id")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade"
    }),
  startTime: timestamp("start_time", { withTimezone: true }).notNull(),
  endTime: timestamp("end_time", { withTimezone: true }).notNull(),
  videoUrl: text("video_url"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull()
});

export const consultationRelations = relations(consultations, ({ one }) => ({
  patient: one(user, {
    fields: [consultations.patientId],
    references: [user.id]
  }),
  doctor: one(user, {
    fields: [consultations.doctorId],
    references: [user.id]
  }),
  appointment: one(appointment, {
    fields: [consultations.appointmentId],
    references: [appointment.id]
  })
}));

export type consultationSelect = typeof consultations.$inferSelect;
export type consultationInsert = typeof consultations.$inferInsert;
