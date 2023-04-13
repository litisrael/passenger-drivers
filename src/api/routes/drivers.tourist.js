import express from "express";
import { Router } from "express";
import { initDB } from "../../tables/index.js";
// import { createServers } from "./app.js";
import {
  createDriverTourist,
  getDriversTourist,
  getDriverTourist,
  deleteDriverTourist,
  updateDriverTourist
} from "../controllers/drivers.tourist.routes.js";

export async function createServers(){
  const DB =await initDB()
  const postDriverManyDays = await createDriverTourist(DB);
  const updatesDriver = await updateDriverTourist(DB)
  const deleteDriver = await  deleteDriverTourist(DB)
  const getDriver = await getDriverTourist(DB)
  const getDrivers = await getDriversTourist(DB);
  return { postDriverManyDays, getDrivers, getDriver,deleteDriver, updatesDriver };
}


export const initRouterDriver =async () => {
   const routers = await createServers();
  const app = express();

//  midelwer
  // app.use(morgan("dev"));
  app.use(express.json());
 
  // Routes
  // Router.post("/drivers", (req, res) => {
  //   createDriverTourist(req, res, DB);
  // });
  
  app.use("/drivers", routers.postDriverManyDays );
  // app.use("/drivers", routers.Driver.getDriver);
  // app.use("/drivers", routers.Driver.deleteDriver);
  // app.use("/drivers", routers.Driver.updatesDriver);
  return app
};

