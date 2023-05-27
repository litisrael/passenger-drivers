
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
        validate:{ is: /^[a-z]+$/i},
      },
      mail: {
        type: DataTypes.STRING(45),
        allowNull: false,
        validate: { isEmail: true},  
      },
      cel: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {isNumeric: true},
      },
      number_of_passengers: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      languages: {
        type: DataTypes.ARRAY(DataTypes.STRING(30)),
        allowNull: true,
      },
      is_work_available_multiple_days: {
        type: DataTypes.BOOLEAN,
        allowNull: true, 
        // defaultValue: true
      },
      work_zone: {
        type: DataTypes.ARRAY(DataTypes.ENUM("1","2","3","4","5","6","7","8")),
        allowNull: true,
      },
    },
    {
      tableName: "drivers",
      timestamps: false,
      schema: "extended_travel",
    }
    
  );

  
  // sequelize.sync({force:true});
  return Driver;
};
