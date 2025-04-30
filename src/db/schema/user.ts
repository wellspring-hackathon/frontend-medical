import {
  pgTable,
  uuid,
  varchar,
  text,
  pgEnum,
  timestamp
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Create role enum
export const roleEnum = pgEnum("role", [
  "patient",
  "doctor",
  "admin",
  "healthcare-provider"
]);

export const user = pgTable("user", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  phone: varchar("phone", { length: 20 }),
  password: text("password").notNull(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  role: roleEnum("role").notNull().default("patient"),
  specialization: varchar("specialization", { length: 255 }),
  licenseNo: varchar("license_no", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const userRelations = relations(user, () => ({
  // You can define any related tables here
  // For example, if you had appointments:
  // appointments: many(appointment)
}));

export type UserSelect = typeof user.$inferSelect;
export type UserInsert = typeof user.$inferInsert;
