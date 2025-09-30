//src/modules/availability/index.ts
import { Module } from "@medusajs/framework/utils";
import AvailabilityService from "./service";
import { availableMemory } from "process";

export default Module("availability",{
  service: AvailabilityService
});