import express from "express";
import { dayOfWeekString } from "../../../tables/utility.js";

export function allDaysRouter(DB) {
  const dayOfWeekRouter = express.Router();
  const daysOfWeek = dayOfWeekString();

  dayOfWeekRouter.route("/allDays")
    .get(async (req, res) => {
      try {
        const allDaysData = [];

        for (const day of daysOfWeek) {
          const table = DB.drivers.daysOfWeek.find((table) => table.tableName === day);
          const dayData = await table.findAll();
          allDaysData.push({ day, data: dayData });
        }

        return res.json(allDaysData);
      } catch (error) {
        return res.status(500).json({
          message: error.message,
        });
      }
    })
    .post(async (req, res) => {
      try {
        const newDaysData = [];

        for (const day of daysOfWeek) {
          const table = DB.drivers.daysOfWeek.find((table) => table.tableName === day);
          const newDay = await table.bulkCreate(req.body);
          newDaysData.push({ day, data: newDay });
        }

        return res.json(newDaysData);
      } catch (error) {
        return res.status(500).json({
          message: error.message,
        });
      }
    })
    .put(async (req, res) => {
      try {
        const updatedDaysData = [];

        for (const day of daysOfWeek) {
          const table = DB.drivers.daysOfWeek.find((table) => table.tableName === day);
          const updatedDay = await table.update(req.body, { where: {} });
          updatedDaysData.push({ day, data: updatedDay });
        }

        return res.json(updatedDaysData);
      } catch (error) {
        return res.status(500).json({
          message: error.message,
        });
      }
    })
    .delete(async (req, res) => {
      try {
        const deletedDaysData = [];

        for (const day of daysOfWeek) {
          const table = DB.drivers.daysOfWeek.find((table) => table.tableName === day);
          await table.destroy({ where: {} });
          deletedDaysData.push({ day });
        }

        return res.json(deletedDaysData);
      } catch (error) {
        return res.status(500).json({
          message: error.message,
        });
      }
    });

  return dayOfWeekRouter;
}
