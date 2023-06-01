
import { DataTypes } from "sequelize";
import { createVehicleAvailabilityTourist } from "./vehicles.availability.tourist.js";

export const createCompany =  (sequelize) => {
  const Company = sequelize.define(
    "Company",
    {
      company_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      company_name: {
        type: DataTypes.STRING(45),
        allowNull: false,
        validate: { isAlpha: true},
      },
      company_mail: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true,
        validate: { isEmail: true},  
      },
      company_cell: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        validate: {isNumeric: true,  len: [2,10]},
      },
      is_work_available_multiple_days: {
        type: DataTypes.BOOLEAN,
        allowNull: true, 
      },

      shomer_shabat: {
        type: DataTypes.BOOLEAN,
        allowNull: true, 
    
      },
      work_zone: {
        type: DataTypes.ARRAY(DataTypes.ENUM(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'])),
        allowNull: true,
      }
      // languages: {
      //   type: DataTypes.ARRAY(DataTypes.STRING(30)),
      //   allowNull: true,
      // },
      
    },
    {
      tableName: "company",
      timestamps: false,
      schema: "extended_travel",
    }
    
    );

  
  // sequelize.sync({force:true})
  return Company;
};
