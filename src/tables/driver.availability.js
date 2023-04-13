
import { DataTypes } from "sequelize";

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
