//scr/modules/availability/service.ts
import { MedusaService } from "@medusajs/framework/utils";
import { Availability } from "./models/availability";
import { service } from "@medusajs/medusa/event-bus-local";

class AvailabilityService extends MedusaService(
 {
    Availability
 }
){

}

export default AvailabilityService;