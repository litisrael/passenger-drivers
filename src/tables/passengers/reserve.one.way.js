import { DataTypes } from "sequelize";


export const createReservationOneWay =  (sequelize) => {
const ReservationOneWay = sequelize.define('reservation', {
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
    tableName: "reservation_oneway",
    timestamps: true,
    schema: "extended_travel",
  });
  return ReservationOneWay
}
  