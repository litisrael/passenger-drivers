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
  // beforeBulkCreate / beforeBulkUpdate
  VehicleAvailability.beforeBulkCreate(async (models) => {
    for (const model of models) {
      validate2Dates(model.available_from, model.available_to);
      await validateDateNotBetweenExisting(
        model,
        model.available_from,
        model.available_to
      );
    }
  });
  VehicleAvailability.beforeBulkUpdate((options) => {
    validateAfterCurrentDate(options.individualHooks.updatedValues.available_from);
    validate2Dates(
      options.individualHooks.updatedValues.available_from,
      options.individualHooks.updatedValues.available_to
    );
  });
  //  driverAvailability.sync({ force: true });

  return VehicleAvailability;
}
