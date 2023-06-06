import express from "express";
import { createServers } from "./routes/index.js";

export const initRouterDriver = async () => {
  const routers = await createServers();
  const app = express();

  //  midelwer
  // app.use(morgan("dev"))
  app.use(express.json());
  
  app.use("/company", routers.company);
  app.use("/vehicles", routers.vehicles);
  app.use("/availabilitytourist", routers.vehiclesAvailabilityTourist);
  app.use("/reservationoneway", routers.ReservationOneWay)
  app.use("/passenger", routers.passenger);
  app.use("/passengerReserve", routers.passengerReservation);

  return app;
};
