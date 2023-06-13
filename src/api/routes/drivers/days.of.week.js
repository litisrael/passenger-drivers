import express from "express";
export function dayOfWeekRouter(DB) {
  const dayOfWeekRouter = express.Router();

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  daysOfWeek.forEach((day, index) => {
    const table = DB.drivers.daysOfWeek[index]; // Accede a la tabla según el índice del array

    

    dayOfWeekRouter.delete(`/${day}/:id`, async (req, res) => {
      const { id } = req.params;
      try {
        const dayToDelete = await table.findByPk(id);
        if (!dayToDelete) {
          return res.status(404).json({
            message: `Day ${day} not found`,
          });
        }
        await dayToDelete.destroy();
        res.status(200).json({
          message: `Successfully deleted`,
        });
      } catch (error) {
        return res.status(500).json({
          message: error.message,
        });
      }
    });

    dayOfWeekRouter.get(`/${day}`, async (req, res) => {
      try {
        const days = await table.findAll();
        if (!days) {
          return res.status(404).json({
            message: `Day ${day} not found`,
          });
        }
        return res.json(days);
      } catch (error) {
        return res.status(500).json({
          message: error.message,
        });
      }
    });

    dayOfWeekRouter.get(`/${day}/:id`, async (req, res) => {
      const { id } = req.params;

      try {
        const dayData = await table.findAll({
          where: { vehicle_id: id },
        });
        if (!dayData) {
          return res.status(404).json({
            message: `Day ${day} not found`,
          });
        }
        return res.json(dayData);
      } catch (error) {
        return res.status(500).json({
          message: error.message,
        });
      }
    });

    dayOfWeekRouter.put(`/${day}/:id`, async (req, res) => {
      const { id } = req.params;
      try {
        const dayToUpdate = await table.findAll({
          where: { vehicle_id: id },
        });

        if (!dayToUpdate) {
          return res.status(404).json({
            message: `Day ${day} not found`,
          });
        }

        const updatedBusyDay = await table.bulkCreate(req.body, {
          updateOnDuplicate: ["busyFromHour", "busyEndHour"],
        });

        res.json(updatedBusyDay);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    });

    dayOfWeekRouter.post(`/${day}`, async (req, res) => {
      try {
        const newDay = await table.bulkCreate(req.body);
        return res.json(newDay);
      } catch (error) {
        return res.status(500).json({
          message: error.message,
        });
      }
    });
  });

  return dayOfWeekRouter;
}
