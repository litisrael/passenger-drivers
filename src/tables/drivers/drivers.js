
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
      driver_name: {
        type: DataTypes.STRING(45),
        allowNull: false,
        validate:{ is: /^[a-zA-Z\s]+$/},
      },
      driver_mail: {
        type: DataTypes.STRING(45),
        allowNull: false,
        validate: { isEmail: true},  
      },
      driver_cell: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {isNumeric: true},
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
      shomer_shabat: {
        type: DataTypes.BOOLEAN,
        allowNull: true, 
        // defaultValue: true
      },
      work_zone: {
        type: DataTypes.ARRAY(DataTypes.ENUM(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'])),
        allowNull: true,
      },
      // waiting_time_rate: {
      //   type: DataTypes.DECIMAL(5, 2),
      //   allowNull: true,
      // },
      overtime_price:{ 
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
    },
    {
      tableName: "drivers",
      timestamps: false,
      schema: "extended_travel",
    }
    
  );

  
  // sequelize.sync({force:true})
  return Driver;
};
