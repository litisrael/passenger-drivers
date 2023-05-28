import { DataTypes } from "sequelize";
import { validateReservation, nextYear, currentDate } from "../utilis.js";

export const createReservationTourist = (sequelize) => {
  const PassengerReservation = sequelize.define(
    "reservation",
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
  PassengerReservation.beforeCreate((model) => {
    validateReservation(model.start_day, model.end_day);
  });

  PassengerReservation.beforeUpdate((model) => {
    validateReservation(model.start_day, model.end_day);
  });
   PassengerReservation.afterCreate(() =>console.log( "argentina camepeos")) 
  // PassengerReservation.afterUpdate( console.log( "argentina jua camepeos")) 
  return PassengerReservation;
};
