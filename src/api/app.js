import express from "express";
import {  passengerRouter} from "./routes/passenger.routes.js";
import { initDB } from "../tables/index.js";
// import { createServers } from "./app.js";
import {
  driverTouristRouter
} from "./routes/drivers.tourist.routes.js";

export async function createServers(){
  const DB = await initDB()
  const driverRouter  =  driverTouristRouter(DB);
  const passenger = await passengerRouter(DB)
  // const deleteDriver = await  deleteDriverTourist(DB)
  // const getDriver = await getDriverTourist(DB)
  // const getDrivers = await getDriversTourist(DB);
  return { driverRouter,passenger};
}


export const initRouterDriver =async () => {
   const routers = await createServers();
  const app = express();

//  midelwer
  // app.use(morgan("dev"));
  app.use(express.json());
   
  app.use("/drivers", routers.driverRouter );
  app.use("/passenger", routers.passenger );
  return app
};

