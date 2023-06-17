import express from "express";
import { dayOfWeekString } from "../../../tables/utility.js";

export  function allDaysRouter(DB) {
  const dayOfWeekRouter = express.Router();
  const daysOfWeek = dayOfWeekString();

  
  dayOfWeekRouter.get("/allDays", getAllDays);

  dayOfWeekRouter.post("/allDays", createDays);

  dayOfWeekRouter.put("/allDays", updateDays);

  dayOfWeekRouter.delete("/allDays", deleteDays);
  dayOfWeekRouter.get("/allDays/:id", getAllDaysById);

  async function getAllDaysById(req, res) {
    try {
      const id = req.params.id;
      const allDaysData = [];
  
      for (const day of daysOfWeek) {
        const table = DB.drivers.daysOfWeek.find((table) => table.tableName === day);
  
        const records = await table.findAll({
          where: { vehicle_id: id },
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
  
  async function getAllDays(req, res) {
    try {
      const allDaysData = [];

      for (const day of daysOfWeek) {
        const table = DB.drivers.daysOfWeek.find(
          (table) => table.tableName === day
        );
    
        const records = await table.findAll( );
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
