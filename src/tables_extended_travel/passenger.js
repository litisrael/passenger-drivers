import { DataTypes } from "sequelize";

export const createPassenger = async (sequelize) => {
const Passenger = sequelize.define('passenger', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    mail: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
    
  },  {
    tableName: "passenger",
    timestamps: false,
    schema: "extended_travel",
  });
  return Passenger
}