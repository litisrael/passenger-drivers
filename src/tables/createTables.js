import { createPassenger } from "./passenger.js";
import { createPassengerReservation } from "./passenger-reserve.js";
import { createDriver } from "./drivers.tourist.js";
import { createDriverAvailability } from "./driver.availability.js";


export async function createTables(sequelize) {
  
  const PassengerReservation = await createPassengerReservation(sequelize);
  const Passenger = await createPassenger(sequelize);
  const Driver = await createDriver(sequelize);
  const DriverAvailability = await createDriverAvailability(sequelize);

  Driver.hasMany(DriverAvailability, { foreignKey: "driver_id" });
  DriverAvailability.belongsTo(Driver, { foreignKey: "driver_id" });
  Passenger.hasMany(PassengerReservation, { foreignKey: 'passenger_id' });
  PassengerReservation.belongsTo(Passenger, { foreignKey: 'passenger_id' });
  return {
     Driver, 
    DriverAvailability,
     PassengerReservation, 
     Passenger };
  
}

