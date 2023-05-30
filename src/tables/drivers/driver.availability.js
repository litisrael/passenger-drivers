
import { DataTypes } from "sequelize";
import { validate2Dates, nextYear ,currentDate,validateAfterCurrentDate } from "../utility.js";

export  function createDriverAvailability(sequelize) {
  const driverAvailability = sequelize.define(
    "availability",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      available_from: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: { isAfter: currentDate},
      },
      available_to: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {isBefore: nextYear}
      },
    },
    {
      tableName: "driver_availability",
      timestamps: false,
    schema: "extended_travel",
    } );

    driverAvailability.beforeCreate((model) => {
      validate2Dates(model.available_from,model.available_to);
      });
      driverAvailability.beforeUpdate((model) => {
        validateAfterCurrentDate(model.available_from)
        validate2Dates(model.available_from,model.available_to);
        });
    
//  driverAvailability.sync({ force: true });

  return driverAvailability;
}
