import { createPassenger } from "./passenger.js";
import { createPassengerReservation } from "./passengerReserve.js";
import { createDriver } from "./drivers.js";
import { createDriverAvailability } from "./driver_availability.js";

// import { DriverAvailability } from "./driver_availability.js";

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
// createTables().then( (bla)=> bla.Passenger.create({  name: "kjhgfe",
// mail: "sd@mail.com",}))

// const newDriver = {
//   name: "kjhgfe",
//   mail: "sd@mail.com",
//   cel: "555-1234",
//   number_of_passengers: 3,
// };

// Driver().then((model) =>
//   model.create(newDriver).then((result) => console.log(result))
// );
