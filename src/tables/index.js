import { getConnection } from "../database/conecction.js";
import { createPassenger } from "./passenger.js";
import { createPassengerReservation } from "./passenger.reserve.js";
import { createDriver } from "./drivers.tourist.js";
import { createDriverAvailability } from "./driver.availability.js";
import { queryDriversOfReserve } from "../api/query/reserve.drivers.js";

async function createTables(sequelize) {
  const Passenger = await createPassenger(sequelize);
  const DriverTours = await createDriver(sequelize);
  const PassengerReservation = await createPassengerReservation(sequelize);
  const DriverAvailability = await createDriverAvailability(sequelize);

  DriverTours.hasMany(DriverAvailability, {
    foreignKey: "driver_id",
    required: true,
  });
  DriverAvailability.belongsTo(DriverTours, {
    foreignKey: "driver_id",
    required: true,
  });

  Passenger.hasMany(PassengerReservation, { foreignKey: "passenger_id" });
  PassengerReservation.belongsTo(Passenger, { foreignKey: "passenger_id" });

  return {
    PassengerReservation,
    DriverAvailability,
    Passenger,
    DriverTours,
  };
}

export async function initDB() {
  const sequelize = await getConnection();
  const tables = await createTables(sequelize);
  sequelize.sync();

  return { tables, sequelize };
}
