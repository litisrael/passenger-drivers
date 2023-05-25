import { DataTypes } from "sequelize";


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
    from: {
      type: DataTypes.DATEONLY
    },
    to: {
      type: DataTypes.DATEONLY
    },
    km_total: {
      type: DataTypes.DOUBLE
    }
  },  {
    tableName: "passenger_reservation",
    timestamps: false,
    schema: "extended_travel",
  });
  return PassengerReservation
}
  