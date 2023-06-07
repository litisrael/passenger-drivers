import express from "express";

export function vehiclesAvailabilityTouristRouter(DB) {
  const vehiclesAvailabilityTouristRouter = express.Router();

  vehiclesAvailabilityTouristRouter.post("/", async (req, res) => {
        try {
      const newAvailability = await DB.drivers.vehiclesAvailabilityTourist.bulkCreate(req.body);
      return res.json(newAvailability);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  });

  vehiclesAvailabilityTouristRouter.get("/", async (req, res) => {
    try {
      const availabilities = await DB.drivers.vehiclesAvailabilityTourist.findAll();
      return res.json(availabilities);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

  vehiclesAvailabilityTouristRouter.get("/:availability_id", async (req, res) => {
    const { availability_id } = req.params;

    try {
      const availability = await DB.drivers.vehiclesAvailabilityTourist.findAll({
        where: { vehicle_id: availability_id },
      });

      res.json(availability);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

  vehiclesAvailabilityTouristRouter.delete("/:availability_id", async (req, res) => {
    const { availability_id } = req.params;
 
    try {
      const availability  = await DB.drivers.vehiclesAvailabilityTourist.findByPk(availability_id);

      if (!availability) {
        return res.status(404).json({
          message: `Availability not found`,
        });
      }

     await  availability.destroy();

      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

  vehiclesAvailabilityTouristRouter.put("/:availability_id", async (req, res) => {
    try {
      
      const { availability_id } = req.params;
      const availability = await DB.drivers.vehiclesAvailabilityTourist.findAll(  {
           where: { vehicle_id: availability_id } 
    }  );
      if (!availability) {
        return res.status(404).json({
          message: `Availability with id ${availability_id} not found`,
        });
      }
   
      const updatedAvailability = await DB.drivers.vehiclesAvailabilityTourist.bulkCreate(req.body,{
        updateOnDuplicate: [  "available_from",  "available_to"]
      });


      res.json(updatedAvailability);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });

  return vehiclesAvailabilityTouristRouter;
}
