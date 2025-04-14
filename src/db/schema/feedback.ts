import { pgTable, text, timestamp, integer, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./user";

export const feedback = pgTable("feedback", {
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
  rating: integer("rating").notNull(),
  comments: text("comments"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull()
});

export const feedbackRelations = relations(feedback, ({ one }) => ({
  patient: one(user, {
    fields: [feedback.patientId],
    references: [user.id]
  }),
  doctor: one(user, {
    fields: [feedback.doctorId],
    references: [user.id]
  })
}));

export type feedbackSelect = typeof feedback.$inferSelect;
export type feedbackInsert = typeof feedback.$inferInsert;
