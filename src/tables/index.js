import { getConnection } from "../database/conecction.js";
import { createPassenger } from "./passengers/passenger.js";
import {  createReservationTourist } from "./passengers/reserve.tourist.js";
import { createCompany } from "./drivers/company.js";
import { createVehicleAvailabilityTourist } from "./drivers/vehicles.availability.tourist.js";
import { createVehicle } from "./drivers/vehicles.js";
import {createReservationOneWay  } from "./passengers/reserve.one.way.js";
// import { queryDriversOfReserve } from "../api/query/reserve.drivers.js";

async function tablesDrivers(sequelize) {
  const company = await createCompany(sequelize);
  const vehiclesAvailabilityTourist = await createVehicleAvailabilityTourist(sequelize);
  const vehicle = await createVehicle(sequelize)
   

  company.hasMany(vehicle, {
    foreignKey: {
      name:  "company_id",
    // required: true,
    allowNull: false,}
  });
  vehicle.belongsTo(company, {
    foreignKey:{   name: "company_id",
    // required: false,
    allowNull: false,}
  });
  vehicle.hasMany(vehiclesAvailabilityTourist, {
    foreignKey:{   name: "vehicle_id",
    // required: true,
    allowNull: false,}
  });
  vehiclesAvailabilityTourist.belongsTo(vehicle, {
    foreignKey:{   name: "vehicle_id",
    // required: true,
    allowNull: false,}
  });

 
  return {
    vehiclesAvailabilityTourist,
    company,
    vehicle
  };
}

  async function tablesPassenger(sequelize) {
  const passenger = await createPassenger(sequelize);
  const passengerReservationTourist = await createReservationTourist(sequelize);
  const passengerReservationOneWay = await createReservationOneWay(sequelize)
  passenger.hasMany(passengerReservationOneWay, { 
    foreignKey: {   name:
    "passenger_id", required: true, allowNull: false,}
   });

   passengerReservationOneWay.belongsTo(passenger, { 
    foreignKey: {  name: "passenger_id", required: true ,allowNull: false,}
  });
  // sequelize.sy

  passenger.hasMany(passengerReservationTourist, { 
    foreignKey: {   name:
    "passenger_id", required: true, allowNull: false,}
   });

  passengerReservationTourist.belongsTo(passenger, { 
    foreignKey: {  name: "passenger_id", required: true ,allowNull: false,}
  });
  // sequelize.sync({ alter: true });
  // para que no puedan update las fk 
  
  return {
     passengerReservationTourist,
     passenger,
     passengerReservationOneWay 
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
