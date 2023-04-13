import { initDB } from "../../tables/borrarindex.js";
import { createServerDriverTourist } from "./drivers.tourist.js";
import {initAppDriver} from "./drivers.tourist.js";

//  exortar initializeApp
export async function createServers() {
    const DB = await initDB();
    const DriverTourist =await createServerDriverTourist(DB)
    return{Driver: DriverTourist}
  }

  export async function initializeApps() {
  const AppDriver  = await initAppDriver()
 
return{AppDriver}
}