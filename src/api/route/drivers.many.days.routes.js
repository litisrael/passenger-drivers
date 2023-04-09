import { Router } from "express";
import { createDriverManyDays } from "../controllers/drivers.many.days.controllers.js";
import { initDB  } from "../../tables/index.js";

// remplazar DriverManyDays x create
export async function createServer() {
const db = await initDB( )


const post = createDriverManyDays(db)
return post
}