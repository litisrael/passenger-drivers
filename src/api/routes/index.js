import { passengerRouter } from "./passengers/passenger.routes.js";
import { initDB } from "../../tables/index.js";
import { companyRouter } from "./drivers/company.js";
import { vehiclesAvailabilityTouristRouter } from "./drivers/vehicles.availability.js";
import { passengerReservationRouter } from "./passengers/passenger.reserve.route.js";
import { vehicleRouter } from "./drivers/vehicles.routes.js";
<<<<<<< HEAD
import { passengerReservationOneWay } from "./passengers/passenger.resrve.oneway.js";
import { dayOfWeekRouter } from "./drivers/days.of.week.js";
import { allDaysRouter } from "./drivers/alldays.js";
import { passengerReservationTwoWays } from "./passengers/passenger.reserve.twoways.js";

=======
import { passengerReservationOneWay } from "./passengers/passenger.resrv.oneway.js";
import { dayOfWeekRouter } from "./drivers/days.of.week.js";
import { allDaysRouter } from "./drivers/alldays.js";
import { passengerReservationTwoWays } from "./passengers/passenger.reserve.twoways.js";
import { createFormRegister } from "./drivers/formpost.js";
>>>>>>> 1acb9150ca0f12ff4c52126f39d14f8054f5bc90
export async function createServers() {
  const DB = await initDB();
  const Register = createFormRegister(DB.tables, DB.sequelize);
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
=======
    Register,
>>>>>>> 1acb9150ca0f12ff4c52126f39d14f8054f5bc90
  };
}
