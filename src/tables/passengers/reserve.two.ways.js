import { DataTypes } from "sequelize";


export const createReservationTwoWays =  (sequelize) => {
const ReservationTwoWays = sequelize.define('ReservationTwoWays', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    number_of_passengers: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    from_city: {
      type: DataTypes.STRING,
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

      waiting_hours: {
      type: DataTypes.TIME
    }
  },  {
    tableName: "reservation_two_ways",
    timestamps: true,
    schema: "extended_travel",
  });
  return ReservationTwoWays
}
  