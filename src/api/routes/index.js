import { passengerRouter } from "./passengers/passenger.routes.js";
import { initDB } from "../../tables/index.js";
import { companyRouter } from "./drivers/company.js";
import { vehiclesAvailabilityTouristRouter } from "./drivers/vehicles.availability.js";
import { passengerReservationRouter } from "./passengers/passenger.reserve.route.js";
import { vehicleRouter } from "./drivers/vehicles.routes.js";
import { passengerReservationOneWay } from "./passengers/passenger.resrv.oneway.js";
import { dayOfWeekRouter } from "./drivers/days.of.week.js";
import { allDaysRouter } from "./drivers/alldays.js";
import { passengerReservationTwoWays } from "./passengers/passenger.reserve.twoways.js";
<<<<<<< HEAD
import { FormRegister } from "./drivers/formpost.js";
=======

>>>>>>> fc6bd1b348a95f9ca6f1f0cdbcd7197657f91bd5
export async function createServers() {
  const DB = await initDB();
  const Register = FormRegister(DB.tables, DB.sequelize);
  const company = companyRouter(DB.tables);
  const vehiclesAvailabilityTourist = vehiclesAvailabilityTouristRouter(
    DB.tables
  );
  const vehicles = vehicleRouter(DB.tables);
  const DaysOfWeek = dayOfWeekRouter(DB.tables);
  const passenger = passengerRouter(DB.tables);
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
<<<<<<< HEAD
    Register,
=======
>>>>>>> fc6bd1b348a95f9ca6f1f0cdbcd7197657f91bd5
  };
}
