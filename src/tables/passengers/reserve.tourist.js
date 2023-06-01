import { DataTypes } from "sequelize";
import { validate2Dates, nextYear, currentDate,validateAfterCurrentDate} from "../utility.js";
import { queryAvailableDriversForTrip } from "../query/available_drivers.js";

let DriversForTrip;
export const createReservationTourist = (sequelize) => {
  const PassengerReservation = sequelize.define(
    "PassengerReservation",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      number_of_passengers: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      start_day: {
        type: DataTypes.DATEONLY,
        validate: { isAfter: currentDate },
      },
      end_day: {
        type: DataTypes.DATEONLY,
        validate: { isBefore: nextYear },
      },
      km_total: {
        type: DataTypes.DOUBLE,
      },
    },
    {
      tableName: "passenger_reservation",
      timestamps: false,
      schema: "extended_travel",
    }
  );
  PassengerReservation.beforeCreate(async(model) => {
    validate2Dates(model.start_day, model.end_day);
   
  });

  PassengerReservation.beforeUpdate((model) => {
    validateAfterCurrentDate(model.start_day);
    validate2Dates(model.start_day, model.end_day);
  });

  PassengerReservation.afterCreate( (model) => {
     DriversForTrip =   queryAvailableDriversForTrip(sequelize , model.id)
  })
  PassengerReservation.afterUpdate( (model) => {
    DriversForTrip =   queryAvailableDriversForTrip(sequelize , model.id)
  
 })
  return PassengerReservation;
};

// console.log("soy el console",DriversForTrip)