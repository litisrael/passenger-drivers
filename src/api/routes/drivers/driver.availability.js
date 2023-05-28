import express from "express";

export function driverAvailabilityRouter(DB) {
  const driverAvailabilityRouter = express.Router();

  driverAvailabilityRouter.post("/", async (req, res) => {
        try {
      const newAvailability = await DB.drivers.driverAvailability.create(req.body);
      return res.json(newAvailability);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  });

  driverAvailabilityRouter.get("/", async (req, res) => {
    try {
      const availabilities = await DB.drivers.driverAvailability.findAll();
      return res.json(availabilities);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

  driverAvailabilityRouter.get("/:availability_id", async (req, res) => {
    const { availability_id } = req.params;

    try {
      const availability = await DB.drivers.driverAvailability.findAll({
        where: { driver_id: availability_id },
      });

      res.json(availability);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

  driverAvailabilityRouter.delete("/:availability_id", async (req, res) => {
    const { availability_id } = req.params;

    try {
      const availability = await DB.drivers.driverAvailability.findOne({
        where: { id: availability_id },
      });

      if (!availability) {
        return res.status(404).json({
          message: `Availability not found`,
        });
      }

      await DB.drivers.driverAvailability.destroy({
        where: { id: availability_id },
      });

      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

  driverAvailabilityRouter.put("/:availability_id", async (req, res) => {
    try {
      const { availability_id } = req.params;

      const availability = await DB.drivers.driverAvailability.findByPk(
        availability_id
      );
      if (!availability) {
        return res.status(404).json({
          message: `Availability with id ${availability_id} not found`,
        });
      }
   
      await availability.update(req.body);


      await availability.save();

      res.json(availability);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });

  return driverAvailabilityRouter;
}
