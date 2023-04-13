
import { DataTypes } from "sequelize";
import { createDriver } from "./drivers.tourist.js";

export async function createDriverAvailability(sequelize) {
  const driverAvailability = sequelize.define(
    "driver_availability",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      occupied_from: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      occupied_to: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
    },
    {
      tableName: "driver_availability",

      schema: "extended_travel",
    }
  );

  // await driverAvailability.sync({ force: true });

  return driverAvailability;
}

// DriverAvailability().then((model) =>
//    model.create( {

//     occupied_from:'2023-07-10',
//     occupied_to:  '2023-07-20'
//    }).then((result) => console.log(result))
// );
