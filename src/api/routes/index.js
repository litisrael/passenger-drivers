
import { passengerRouter } from "./passengers/passenger.routes.js";
import { initDB } from "../../tables/index.js";
import { driverTourRouter  } from "./drivers/drivers.routes.js";
import { driverAvailabilityRouter } from "./drivers/driver.availability.js";
import { passengerReservationRouter } from "./passengers/passenger.reserve.route.js";
import { vehicleRouter } from "./drivers/vehicles.routes.js";
 

export async function createServers() {
  const DB = await initDB();
  const driver = driverTourRouter(DB.tables);
  const driverAvailability =  driverAvailabilityRouter(DB.tables);
  const vehicles= vehicleRouter(DB.tables)
  const passenger = passengerRouter(DB.tables);
  const passengerReservation = passengerReservationRouter(DB.tables,DB.sequelize);
  return {  driver, driverAvailability, passenger, passengerReservation,vehicles };
}