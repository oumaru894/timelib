// src/modules/availability/models/availability.ts
import { model } from "@medusajs/framework/utils"

export const Availability = model.define("availability", {
  id: model.id().primaryKey(),
  my_flag: model.boolean().default(false), // This is your flag column
})