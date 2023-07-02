import { DataTypes } from "sequelize";
import { regionEnum } from "../utility.js";
import { createVehicleAvailabilityTourist } from "../availability/vehicles.availability.tourist.js";

export const createCompany = (sequelize) => {
  const Company = sequelize.define(
    "Company",
    {
      company_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      company_name: {
        type: DataTypes.STRING(45),
        allowNull: false,
        // validate: { is: /^[a-zA-Z0-9\s]+$/ }, no acepta hebreo
      },
      company_mail: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: {
          arg: true,
          msg: 'That email is already in use'
      },
        validate: { isEmail: true },
      },
      company_cell: {
        type: DataTypes.STRING(20),
        allowNull: false,
        

      //     unique: {
      //     arg: true,
      //     msg: 'That cel number is already in use"'
      // },
        // validate: { isNumeric: true, len: [2, 10] },
      },
      is_work_available_multiple_days: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
  
      shomer_shabat: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },

      payment_methods: {
        type: DataTypes.ARRAY(DataTypes.STRING(40)),
        allowNull: true,
      },
      work_zone: {

        type: DataTypes.ARRAY(DataTypes.STRING()),
        //  (DataTypes.ENUM(regionEnum()))
        
        allowNull: false,

        // validate: {
        //   isValidValues: function (value) {
        //     const validValues = regionEnum();
        //     const invalidValues = value.filter(
        //       (val) => !validValues.includes(val)
        //     );
        //     if (invalidValues.length > 0) {
        //       throw new Error(
        //         `Invalid city values: ${invalidValues.join(", ")}`
        //       );
        //     }
        //   },
        // },
      },

    },
    {
      tableName: "company",
      timestamps: false,
      schema: "extended_travel",
    }
  );

  //  sequelize.sync({alter:true})
  return Company;
};
