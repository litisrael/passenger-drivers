import { getConnection } from "../database/conecction.js";
import { createPassenger } from "./passengers/passenger.js";
import {  createPassengerReservationTourist } from "./passengers/passenger.reserve.tourist.js";
import { createDriver } from "./drivers/drivers.js";
import { createDriverAvailability } from "./drivers/driver.availability.js";
import { queryDriversOfReserve } from "../api/query/reserve.drivers.js";

async function createTables(sequelize) {
  const Passenger = await createPassenger(sequelize);
  const DriverTours = await createDriver(sequelize);
  const PassengerReservationTourist = await createPassengerReservationTourist(sequelize);
  const DriverAvailability = await createDriverAvailability(sequelize);

  DriverTours.hasMany(DriverAvailability, {
    foreignKey: "driver_id",
    required: true,
  });
  DriverAvailability.belongsTo(DriverTours, {
    foreignKey: "driver_id",
    required: true,
  });
  Passenger.hasMany(PassengerReservationTourist, { 
    foreignKey: "passenger_id", required: true
   });

  PassengerReservationTourist.belongsTo(Passenger, { 
    foreignKey: "passenger_id", required: true 
  });
  

  return {
    PassengerReservation: PassengerReservationTourist,
    DriverAvailability,
    Passenger,
    DriverTours,
  };
}
/* hacer la sincornacion de tablas aca 
porue sino las tablas no se reconectan
*/
export async function initDB() {
  const sequelize = await getConnection();
  const tables = await createTables(sequelize);
  sequelize.sync();

 
  return { tables, sequelize };
}
