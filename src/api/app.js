import express from "express";
import { passengerRouter } from "./routes/passenger.routes.js";
import { initDB } from "../tables/index.js";
import { driverTouristRouter } from "./routes/drivers.tourist.routes.js";
import { driverAvailabilityRouter } from "./routes/driver.availability.js";
import { passengerReservationRouter } from "./routes/passenger.reserve.route.js";
 import { driverReservationRoute } from "./routes/passenger.query.routes.js"

export async function createServers() {
  const DB = await initDB();
  const driverRouter = driverTouristRouter(DB.tables);
  const passenger = passengerRouter(DB.tables);
  const driverAvailability =  driverAvailabilityRouter(DB.tables);
  const PassengerReservation = passengerReservationRouter(DB.tables);
  const driverReservation= driverReservationRoute(DB.sequelize)
  return { driverRouter, driverAvailability, passenger, PassengerReservation,  driverReservation };
}

export const initRouterDriver = async () => {
  const routers = await createServers();
  const app = express();

  //  midelwer
  // app.use(morgan("dev"))
  app.use(express.json());

  app.use("/drivers", routers.driverRouter);
  app.use("/driverAvailability", routers.driverAvailability);
  app.use("/passenger", routers.passenger);
  app.use("/passengerReserve", routers.PassengerReservation);
   app.use("/passengerquery",routers.driverReservation);
     
  return app;
};
