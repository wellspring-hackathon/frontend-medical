import {
  pgTable,
  varchar,
  timestamp,
  uuid,
  integer
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { healthcareProviders } from "./healthcare";

export const resourceInventory = pgTable("resource_inventory", {
  id: uuid("id").defaultRandom().primaryKey(),
  healthcareProviderId: uuid("healthcare_provider_id")
    .notNull()
    .references(() => healthcareProviders.id, {
      onDelete: "cascade"
    }),
  resourceType: varchar("resource_type", { length: 100 }).notNull(),
  totalQuantity: integer("total_quantity").notNull(),
  availableQuantity: integer("available_quantity").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const resourceInventoryRelations = relations(
  resourceInventory,
  ({ one }) => ({
    healthcareProvider: one(healthcareProviders, {
      fields: [resourceInventory.healthcareProviderId],
      references: [healthcareProviders.id]
    })
  })
);

export type resourceInventorySelect = typeof resourceInventory.$inferSelect;
export type resourceInventoryInsert = typeof resourceInventory.$inferInsert;
