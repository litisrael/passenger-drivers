import { DataTypes } from "sequelize";
import { isValidDate } from "../utilis.js";
const nextYear = new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate()).toISOString().split("T")[0];
const currentDate = new Date().toISOString().split("T")[0]
let start_day = null
export const createReservationTourist =  (sequelize) => {
const PassengerReservation = sequelize.define('reservation', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    number_of_passengers: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    start_day: {
      type: DataTypes.DATEONLY,
      validate: {
        isAfter: currentDate,
      }
      },
    end_day: {
      type: DataTypes.DATEONLY,
      validate: {
        
        isBefore: nextYear 
      }
    },
    km_total: {
      type: DataTypes.DOUBLE
    }
  },  {
    tableName: "passenger_reservation",
    timestamps: false,
    schema: "extended_travel",
  });
  PassengerReservation.beforeCreate((model, event) => {
    if (model.start_day > model.end_day) {
    throw new Error("The start date must be before the end date.");
    }
    });
    PassengerReservation.beforeUpdate((model, event) => {
      if (model.start_day > model.end_day) {
      throw new Error("The start date must be before the end date.");
      }
      });
  return PassengerReservation
}
  