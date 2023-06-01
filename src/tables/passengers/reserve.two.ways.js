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
    from: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    to: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
     },
     departure_hour:{
      type:DataTypes.TIME
      },

    km_total: {
      type: DataTypes.DOUBLE
    }
  },  {
    tableName: "reservation_two_ways",
    timestamps: true,
    schema: "extended_travel",
  });
  return ReservationTwoWays
}
  