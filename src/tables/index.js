import { getConnection } from "../database/conecction.js";
import { createPassenger } from "./passengers/passenger.js";
import {  createReservationTourist } from "./passengers/reserve.tourist.js";
import { createDriver } from "./drivers/drivers.js";
import { createDriverAvailability } from "./drivers/driver.availability.js";
import { createVehicle } from "./drivers/vehicles.js";
// import { queryDriversOfReserve } from "../api/query/reserve.drivers.js";

async function tablesDrivers(sequelize) {
  const driver = await createDriver(sequelize);
  const driverAvailability = await createDriverAvailability(sequelize);
  const vehicle = createVehicle(sequelize)
   
  driver.hasMany(vehicle, {
    foreignKey: "driver_id",
    required: true,
  });
  vehicle.belongsTo(driver, {
    foreignKey: "driver_id",
    required: true,
  });
  driver.hasMany(driverAvailability, {
    foreignKey: "driver_id",
    required: true,
  });
  driverAvailability.belongsTo(driver, {
    foreignKey: "driver_id",
    required: true,
  });
   sequelize.sync();
  return {
     driverAvailability,
    driver,
  };
}

  async function tablesPassenger(sequelize) {
  const passenger = await createPassenger(sequelize);
  const passengerReservationTourist = await createReservationTourist(sequelize);

  passenger.hasMany(passengerReservationTourist, { 
    foreignKey: "passenger_id", required: true
   });

  passengerReservationTourist.belongsTo(passenger, { 
    foreignKey: "passenger_id", required: true 
  });

 
  return {
     passengerReservationTourist,
     passenger,
  };
}

async function createTables(sequelize) {
 const drivers = await tablesDrivers(sequelize)
 const passengers = await tablesPassenger(sequelize)
return {drivers,passengers}
}

export async function initDB() {
  const sequelize = await getConnection();
  const tables = await createTables(sequelize);
  sequelize.sync();
  return { tables, sequelize };
}
