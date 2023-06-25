import { passengerRouter } from "./passengers/passenger.routes.js";
import { initDB } from "../../tables/index.js";
import { companyRouter } from "./drivers/company.js";
import { vehiclesAvailabilityTouristRouter } from "./drivers/vehicles.availability.js";
import { passengerReservationRouter } from "./passengers/passenger.reserve.route.js";
import { vehicleRouter } from "./drivers/vehicles.routes.js";
import { passengerReservationOneWay } from "./passengers/passenger.resrv.oneway.js";
<<<<<<< HEAD
import { dayOfWeekRouter } from "./drivers/days.of.week.js";
import { allDaysRouter } from "./drivers/alldays.js";
import { passengerReservationTwoWays } from "./passengers/passenger.reserve.twoways.js";

=======
import { dayOfWeekRouter } from "./drivers/days.of.week.js"; 
import { allDaysRouter } from "./drivers/alldays.js";
>>>>>>> 24c84093643dcf970b4df3ce237889d22696ff64
export async function createServers() {
  const DB = await initDB();
  const company = companyRouter(DB.tables);
  const vehiclesAvailabilityTourist = vehiclesAvailabilityTouristRouter(
    DB.tables
  );
  const vehicles = vehicleRouter(DB.tables);
  const DaysOfWeek = dayOfWeekRouter(DB.tables);
  const passenger = passengerRouter(DB.tables);
<<<<<<< HEAD
  const ReservationOneWay = passengerReservationOneWay(DB.tables);
  const ReservationTwoWays = passengerReservationTwoWays(DB.tables);
  const passengerReservation = passengerReservationRouter(
    DB.tables,
    DB.sequelize
  );
  const allDays = allDaysRouter(DB.tables);

  return {
    company,
    vehiclesAvailabilityTourist,
    passenger,
    passengerReservation,
    vehicles,
    ReservationOneWay,
    ReservationTwoWays,
    DaysOfWeek,
    allDays,
  };
}
=======
   const ReservationOneWay = passengerReservationOneWay(DB.tables)
  const passengerReservation = passengerReservationRouter(DB.tables,DB.sequelize);
  const allDays= allDaysRouter(DB.tables)
  
  return { allDays, company, vehiclesAvailabilityTourist, passenger, passengerReservation,vehicles, ReservationOneWay, DaysOfWeek};
}
>>>>>>> 24c84093643dcf970b4df3ce237889d22696ff64
