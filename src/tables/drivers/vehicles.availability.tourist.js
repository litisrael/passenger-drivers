
import { DataTypes } from "sequelize";
import { validate2Dates, nextYear ,currentDate,validateAfterCurrentDate,
validateDateNotBetweenExisting} from "../utility.js";

export  function createVehicleAvailabilityTourist(sequelize) {
  const vehicleAvailability = sequelize.define(
    "availability",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      available_from: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: { isAfter: currentDate},
      },
      available_to: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {isBefore: nextYear}
      },
    },
    {
      tableName: "vehicle_availability_tourist",
      timestamps: false,
    schema: "extended_travel",
    } );

    vehicleAvailability.beforeCreate(async(model) => {
      validate2Dates(model.available_from,model.available_to);
      // await validateDateNotBetweenExisting('vehicle_availability_tourist', 'fkColumnName', 'available_from', 'available_to', model.available_from);
     
}
      );
      vehicleAvailability.beforeUpdate((model) => {
        validateAfterCurrentDate(model.available_from)
        validate2Dates(model.available_from,model.available_to);
        });
    
//  driverAvailability.sync({ force: true });

  return vehicleAvailability;
}
