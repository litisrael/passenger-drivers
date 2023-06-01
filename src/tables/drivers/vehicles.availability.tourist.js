import { DataTypes } from "sequelize";
import {
  validate2Dates,
  nextYear,
  currentDate,
  validateAfterCurrentDate,
  validateDateNotBetweenExisting,
} from "../utility.js";

export function createVehicleAvailabilityTourist(sequelize) {
  const VehicleAvailability = sequelize.define(
    "VehicleAvailability",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      available_from: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: { isAfter: currentDate },
      },
      available_to: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: { isBefore: nextYear },
      },
    },
    {
      tableName: "vehicle_availability_tourist",
      timestamps: false,
      schema: "extended_travel",
    }
  );
  VehicleAvailability.beforeCreate(async (Model) => {
    validate2Dates(Model.available_from, Model.available_to);
    await validateDateNotBetweenExisting(
      Model,
      Model.available_from,
      Model.available_to
    );
  });
  VehicleAvailability.beforeUpdate((Model) => {
    validateAfterCurrentDate(Model.available_from);
    validate2Dates(Model.available_from, Model.available_to);
  });

  //  driverAvailability.sync({ force: true });

  return VehicleAvailability;
}
