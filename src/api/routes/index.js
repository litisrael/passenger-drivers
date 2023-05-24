
import { passengerRouter } from "./passengers/passenger.routes.js";
import { initDB } from "../../tables/index.js";
import { driverTourRouter  } from "./drivers/drivers.routes.js";
import { driverAvailabilityRouter } from "./drivers/driver.availability.js";
import { passengerReservationRouter } from "./passengers/passenger.reserve.route.js";
 import { driverReservationRoute } from "./passengers/passenger.query.routes.js"



export async function createServers() {
  const DB = await initDB();
  const driverTour = driverTourRouter(DB.tables);
  const passenger = passengerRouter(DB.tables);
  const driverAvailability =  driverAvailabilityRouter(DB.tables);
  const passengerReservation = passengerReservationRouter(DB.tables,DB.sequelize);
  const driverReservation= driverReservationRoute(DB.sequelize)
  return {  driverTour, driverAvailability, passenger, passengerReservation,  driverReservation };
}