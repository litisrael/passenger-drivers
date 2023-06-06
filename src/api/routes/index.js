
import { passengerRouter } from "./passengers/passenger.routes.js";
import { initDB } from "../../tables/index.js";
import { companyRouter  } from "./drivers/company.js";
import { vehiclesAvailabilityTouristRouter } from "./drivers/vehicles.availability.js";
import { passengerReservationRouter } from "./passengers/passenger.reserve.route.js";
import { vehicleRouter } from "./drivers/vehicles.routes.js";
import { passengerReservationOneWay } from "./passengers/passenger.resrv.oneway.js";
 

export async function createServers() {
  const DB = await initDB();
  const company = companyRouter(DB.tables);
  const vehiclesAvailabilityTourist =  vehiclesAvailabilityTouristRouter(DB.tables);
  const vehicles= vehicleRouter(DB.tables)
  const passenger = passengerRouter(DB.tables);
   const ReservationOneWay = passengerReservationOneWay(DB.tables)
  const passengerReservation = passengerReservationRouter(DB.tables,DB.sequelize);
  return {  company, vehiclesAvailabilityTourist, passenger, passengerReservation,vehicles, ReservationOneWay};
}