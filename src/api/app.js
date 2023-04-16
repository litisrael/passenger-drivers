import express from "express";
import { passengerRouter } from "./routes/passenger.routes.js";
import { initDB } from "../tables/index.js";
import { driverTouristRouter } from "./routes/drivers.tourist.routes.js";
import { driverAvailabilityRouter } from "./routes/driver.availability.js";
import { passengerReservationRouter } from "./routes/passenger.reserve.route.js";

export async function createServers() {
  const DB = await initDB();
  const driverRouter = driverTouristRouter(DB);
  const passenger = passengerRouter(DB);
  const driverAvailability =  driverAvailabilityRouter(DB);
  const PassengerReservation = passengerReservationRouter(DB);
  return { driverRouter, driverAvailability, passenger, PassengerReservation };
}

export const initRouterDriver = async () => {
  const routers = await createServers();
  const app = express();

  //  midelwer
  // app.use(morgan("dev"));
  app.use(express.json());

  app.use("/drivers", routers.driverRouter);
  app.use("/driverAvailability", routers.driverAvailability);
  app.use("/passenger", routers.passenger);
  app.use("/passengerReserve", routers.PassengerReservation);
  // app.use("/passengerReserve", routers.PassengerReservation);
  return app;
};
