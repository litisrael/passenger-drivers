
import { DataTypes } from "sequelize";

export  function createDriverAvailability(sequelize) {
  const driverAvailability = sequelize.define(
    "availability",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
