
import { passengerRouter } from "./passenger.routes.js";
import { initDB } from "../../tables/index.js";
import { driverTourRouter  } from "./drivers.tour.routes.js";
import { driverAvailabilityRouter } from "./driver.availability.js";
import { passengerReservationRouter } from "./passenger.reserve.route.js";
 import { driverReservationRoute } from "./passenger.query.routes.js"



export async function createServers() {
  const DB = await initDB();
  const driverTour = driverTourRouter(DB.tables);
  const passenger = passengerRouter(DB.tables);
  const driverAvailability =  driverAvailabilityRouter(DB.tables);
  const passengerReservation = passengerReservationRouter(DB.tables,DB.sequelize);
  const driverReservation= driverReservationRoute(DB.sequelize)
  return {  driverTour, driverAvailability, passenger, passengerReservation,  driverReservation };
}