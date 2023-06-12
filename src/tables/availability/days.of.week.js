import { DataTypes } from "sequelize";
import { validateHourBeforeHour, validateABeforeB } from "../utility.js";

export const createDaysOfWeek = (sequelize) => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const tablesDays = daysOfWeek.map(dayOfWeek => {
    const table = sequelize.define(dayOfWeek, {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      busyFromHour: {
        type: DataTypes.TIME,
        defaultValue: '00:00'
      },
      busyEndHour: {
        type: DataTypes.TIME,
        defaultValue: '00:00'
      }
    }, {
      tableName: dayOfWeek,
      timestamps: false,
      schema: "availability_drivers"
    });

    // Añadir los hooks de validación a cada tabla
    table.beforeBulkCreate(async (models) => {
      for (const model of models) {
        validateHourBeforeHour(model.busyFromHour, model.busyEndHour);
      }
    });

    table.beforeBulkUpdate(async (models) => {
      for (const model of models) {
        validateHourBeforeHour(model.busyFromHour, model.busyEndHour);
      }
    });

    return table;
  });

  return tablesDays;
}
