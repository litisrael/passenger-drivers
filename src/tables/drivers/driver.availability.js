
import { DataTypes } from "sequelize";
import { validateReservation, nextYear ,currentDate } from "../utilis.js";

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
      validateReservation(model.available_from,model.available_to);
      });
      driverAvailability.beforeUpdate((model) => {
        validateReservation(model.available_from,model.available_to);
        });
    
//  driverAvailability.sync({ force: true });

  return driverAvailability;
}
