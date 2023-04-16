import express from "express";

export function driverAvailabilityRouter(DB) {
  const driverAvailabilityRouter = express.Router();

  driverAvailabilityRouter.post("/", async (req, res) => {
        try {
      const newAvailability = await DB.DriverAvailability.create(req.body);
      return res.json(newAvailability);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  });

  driverAvailabilityRouter.get("/", async (req, res) => {
    try {
      const availabilities = await DB.DriverAvailability.findAll();
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
      const availability = await DB.DriverAvailability.findOne({
        where: { id: availability_id },
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
      const availability = await DB.DriverAvailability.findOne({
        where: { id: availability_id },
      });

      if (!availability) {
        return res.status(404).json({
          message: `Availability not found`,
        });
      }

      await DB.DriverAvailability.destroy({
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
      const { occupied_from, occupied_to } = req.body;

      const availability = await DB.DriverAvailability.findByPk(
        availability_id
      );
      if (!availability) {
        return res.status(404).json({
          message: `Availability with id ${availability_id} not found`,
        });
      }

      availability.occupied_from = occupied_from;
      availability.occupied_to = occupied_to;

      await availability.save();

      res.json(availability);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });

  return driverAvailabilityRouter;
}
