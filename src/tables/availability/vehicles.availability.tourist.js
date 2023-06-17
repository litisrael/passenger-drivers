import { DataTypes } from "sequelize";

import {
  validateABeforeB,
  nextYear,
  currentDate,
  validateAfterCurrentDate,
} from "../utility.js";
import { validateDateNotBetweenExisting } from "../query/available_drivers.js";


export function createVehicleAvailabilityTourist(sequelize) {
  const VehicleAvailability = sequelize.define(
    "VehicleAvailability",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
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
      schema: "availability_drivers",
    }
  );
  // beforeBulkCreate / beforeBulkUpdate
  VehicleAvailability.beforeBulkCreate(async (models) => {
    for (const model of models) {
      
      validateABeforeB(model.available_from, model.available_to);
      await validateDateNotBetweenExisting(
        model,
        model.available_from,
        model.available_to
      )
     
    }
  });
  VehicleAvailability.beforeBulkUpdate(async(models) => {
    for (const model of models) {
    validateAfterCurrentDate(model.available_from);
    validateABeforeB(model.available_from, model.available_to );
    await validateDateNotBetweenExisting(
      model,
      model.available_from,
      model.available_to
    );
    }
  });
  //  driverAvailability.sync({ force: true });

  return VehicleAvailability;
}
