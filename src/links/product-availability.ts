// src/links/product-custom.ts
import { defineLink } from "@medusajs/framework/utils"
import AvailabilityModule from "../modules/availability"
import ProductModule from "@medusajs/medusa/product"

export default defineLink(
  ProductModule.linkable.product,
  AvailabilityModule.linkable.availability
)