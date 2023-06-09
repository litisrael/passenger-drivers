import { DataTypes } from "sequelize";
import {
  regionEnum,
  dayOfWeekEnum,
  getDayOfWeekInEnglish,
} from "../utility.js";
import { queryAvailableDriversForTrip } from "../query/oneway.js";

<<<<<<< HEAD
let DriversForOneWay;
=======
>>>>>>> 1acb9150ca0f12ff4c52126f39d14f8054f5bc90

// console.log("soy DriversForOneWay_-------___",DriversForOneWay)

let DriversForOneWay;

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
      departure_date: {
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
    const dayOfWeekInEnglish = getDayOfWeekInEnglish(model.departure_date);
    // console.log(dayOfWeekInEnglish);
    model.day_week = dayOfWeekInEnglish;
  });

  ReservationOneWay.beforeUpdate(async (model) => {
<<<<<<< HEAD
    const dayOfWeekInEnglish = await getDayOfWeekInEnglish(
=======
    const dayOfWeekInEnglish =  getDayOfWeekInEnglish(
>>>>>>> 1acb9150ca0f12ff4c52126f39d14f8054f5bc90
      model.departure_date
    );
    model.day_week = dayOfWeekInEnglish;
  });

  ReservationOneWay.afterCreate((model) => {
    DriversForOneWay = queryAvailableDriversForTrip(
      sequelize,
      model.day_week,
      model.from_region,
      model.id_one_way
    );
  });

  ReservationOneWay.afterUpdate((model) => {
    DriversForOneWay = queryAvailableDriversForTrip(
      sequelize,
      model.day_week,
      model.from_region,
      model.id_one_way
    );
  });

  return ReservationOneWay;
};
