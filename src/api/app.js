import express from "express";
import { createServers } from "./routes/index.js";

export const initRouterDriver = async () => {
  const routers = await createServers();
  const app = express();

  //  midelwer
  // app.use(morgan("dev"))
  app.use(express.json());
  
  app.use("/drivers", routers.driver);
  app.use("/vehicles", routers.vehicles);
  app.use("/driverAvailability", routers.driverAvailability);
  
  app.use("/passenger", routers.passenger);
  app.use("/passengerReserve", routers.passengerReservation);

  return app;
};
