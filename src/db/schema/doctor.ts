import { integer, pgTable,  text, timestamp, uuid } from "drizzle-orm/pg-core";
import { profile } from "./profile";
import { relations } from "drizzle-orm";

export const doctor = pgTable("doctor-wellspring", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
          .notNull()
          .references(() => profile.id, {
            onDelete: "cascade",
          }),
          createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  });


  export const doctorRelations = relations(doctor, ({ one }) => ({
      profile: one(profile, {
        fields: [doctor.userId],
        references: [profile.id],
      }),
    }));
  
  

  export type DoctorSelect = typeof doctor.$inferSelect;
  export type DoctorInsert = typeof doctor.$inferInsert;