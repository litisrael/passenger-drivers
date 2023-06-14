import express from "express";
import { dayOfWeekString } from "../../../tables/utility.js";

export  function allDaysRouter(DB) {
  const dayOfWeekRouter = express.Router();
  const daysOfWeek = dayOfWeekString();

  // Ruta para obtener todos los días
  dayOfWeekRouter.get("/allDays", getAllDays);

  // Ruta para crear nuevos registros
  dayOfWeekRouter.post("/allDays", createDays);

  // Ruta para actualizar registros existentes
  dayOfWeekRouter.put("/allDays", updateDays);

  // Ruta para eliminar registros
  dayOfWeekRouter.delete("/allDays", deleteDays);

  // Función para obtener todos los días
  async function getAllDays(req, res) {
    try {
      const allDaysData = [];

      for (const day of daysOfWeek) {
        const table = DB.drivers.daysOfWeek.find(
          (table) => table.tableName === day
        );
        const dayData = await table.findAll({ attributes: ["vehicle_id"] });
        const vehicleIds = dayData.map((item) => item.vehicle_id);

        const records = await table.findAll({
          where: { vehicle_id: vehicleIds },
        });
        allDaysData.push({ day, data: records });
      }

      return res.json(allDaysData);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  
  // Función para crear nuevos registros
  async function createDays(req, res) {
    
    try {
      const newDaysData = [];

      for (const dayData of req.body) {
        const { day, data } = dayData;
        const table = DB.drivers.daysOfWeek.find(
          (table) => table.tableName === day
        );

        const newDay = await table.bulkCreate(data);
        newDaysData.push({ day, data: newDay });
      }

      return res.json(newDaysData);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  // Función para actualizar registros existentes
  async function updateDays(req, res) {
    try {
      const updatedDaysData = [];

      for (const dayData of req.body) {
        const { day, data } = dayData;

        const table = DB.drivers.daysOfWeek.find(
          (table) => table.tableName === day
        );

        const updatedData = await table.bulkCreate(data, {
          updateOnDuplicate: [
            "unavailable_starting",
            "unavailable_until",
            "vehicle_id",
          ],
        });

        updatedDaysData.push({ day, data: updatedData });
      }

      return res.json(updatedDaysData);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  // Función para eliminar registros
  async function deleteDays(req, res) {
    try {
      const daysData = req.body;

      for (const { day, data } of daysData) {
        const table = DB.drivers.daysOfWeek.find(
          (table) => table.tableName === day
        );

        const ids = data.map((obj) => obj.id);

        await table.destroy({
          where: {
            id: ids,
          },
        });
      }

      return res.json({
        message: "Successfully deleted",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  return dayOfWeekRouter;
}
