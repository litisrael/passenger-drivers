import { DataTypes } from "sequelize";
import { regionEnum } from "../utility.js";

export const createReservationOneWay =  (sequelize) => {
const ReservationOneWay = sequelize.define('ReservationOneWay', {
    id_one_way: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    number_of_passengers: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    from_region: {
      type: DataTypes.ENUM(...regionEnum()),
      allowNull: true,
    },
    from_street: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    to_city: {
        type: DataTypes.STRING(100),
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
     departure_hour:{
      type:DataTypes.TIME
      },
  },  {
    tableName: "reservation_oneway",
    timestamps: true,
    schema: "extended_travel",
  });
  return ReservationOneWay
}
  