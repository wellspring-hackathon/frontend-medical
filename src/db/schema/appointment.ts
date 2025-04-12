
import { relations } from "drizzle-orm";
import {text, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { deposit } from "./deposit";
import { bank } from "./bank";
import { account } from "./account";
import { transaction } from "./transactions";

export const appointment = pgTable("appointment-wellspring", {
    id: uuid("id").defaultRandom().primaryKey(),
    password: text("password").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  });

  export const appointmentRelations = relations(appointment, ({ one, many }) => ({
    deposit: many(deposit),
    transaction: many(transaction),
    account: one(account, {
      fields: [appointment.id],
      references: [account.userId],
    }),
    bank: one(bank, {
      fields: [appointment.id],
      references: [bank.userId],
    }),
  }));

  export type AppointmentSelect = typeof appointment.$inferSelect;
  export type AppointmentInsert = typeof appointment.$inferInsert;