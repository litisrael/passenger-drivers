import { DataTypes } from "sequelize";
import {
  regionEnum,
  dayOfWeekEnum,
  getDayOfWeekInEnglish,
} from "../utility.js";
import {  queryAvailableDriversForTrip } from "../query/oneway.js";

export const createReservationOneWay = (sequelize) => {
  const ReservationOneWay = sequelize.define(
    "ReservationOneWay",
    {
      id_one_way: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      number_of_passengers: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      from_region: {
        type: DataTypes.ENUM(...regionEnum()),
        allowNull: false,
      },
      from_street: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      to_city: {
        type: DataTypes.ENUM(...regionEnum()),
        allowNull: true,
      },
      to_street: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      day_week: {
        type: DataTypes.ENUM(...dayOfWeekEnum()),
      },

      departure_hour: {
        type: DataTypes.TIME,
      },
    },
    {
      tableName: "reservation_oneway",
      timestamps: true,
      schema: "extended_travel",
    }
  );
  ReservationOneWay.beforeCreate(async (model) => {
    const dayOfWeekInEnglish =  getDayOfWeekInEnglish(model.date);
    console.log(dayOfWeekInEnglish);
    model.day_week = dayOfWeekInEnglish;
  });

  ReservationOneWay.beforeUpdate(async (model) => {
    const dayOfWeekInEnglish = await getDayOfWeekInEnglish(model.date);
    model.day_week = dayOfWeekInEnglish;
  });

  

  ReservationOneWay.afterCreate( (model) => {
    DriversForOneWay =   queryAvailableDriversForTrip(sequelize , model.day_week)
 })

//  PassengerReservation.afterUpdate( (model) => {
//    DriversForTrip =   queryAvailableDriversForTrip(sequelize , model.id)
 
// })


  return ReservationOneWay;
};
