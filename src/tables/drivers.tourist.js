
import { DataTypes } from "sequelize";
import { createDriverAvailability } from "./driver.availability.js";

export const createDriver =  (sequelize) => {
  const Driver = sequelize.define(
    "Driver",
    {
      driver_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      mail: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      cel: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      number_of_passengers: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      languages: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
    },
    {
      tableName: "drivers",
      timestamps: false,
      schema: "extended_travel",
    }
  );
  

  return Driver;
};
