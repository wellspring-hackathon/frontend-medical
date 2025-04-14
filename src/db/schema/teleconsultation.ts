import { pgTable, timestamp, uuid, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { appointment } from "./appointment";

export const teleconsultationStatusEnum = pgEnum("telecommunication_status", [
  "active",
  "closed"
]);

export const teleconsultation = pgTable("consultation-wellspring", {
  id: uuid("id").defaultRandom().primaryKey(),
  appointmentId: uuid("appointment_id")
    .notNull()
    .references(() => appointment.id, {
      onDelete: "cascade"
    }),
  //TODO: whether or not to add messages column
  status: teleconsultationStatusEnum("status").default("closed").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const teleconsultationRelations = relations(
  teleconsultation,
  ({ one }) => ({
    appointment: one(appointment, {
      fields: [teleconsultation.appointmentId],
      references: [appointment.id]
    })
  })
);

export type teleconsultationSelect = typeof teleconsultation.$inferSelect;
export type teleconsultationInsert = typeof teleconsultation.$inferInsert;
