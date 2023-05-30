import express from "express";
 
export function vehicleRouter(DB) {
  const vehicleRouter = express.Router();
 
  vehicleRouter.post("/", async (req, res) => {
    try {
      const newVehicle = await DB.drivers.vehicle.create(req.body);
      return res.json(newVehicle);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  });

  vehicleRouter.get("/", async (req, res) => {
    try {
      const vehicles = await DB.drivers.vehicle.findAll();
      return res.json(vehicles);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }   
  });
  

  vehicleRouter.get("/:vehicle_id", async (req, res) => {
    const { vehicle_id } = req.params;

    try {
      const vehicle = await  DB.drivers.vehicle.findAll({
        where: { driver_id: vehicle_id }
      });
    
      if (!vehicle) {
        return res.status(404).json({
          message: `Vehicle with id ${vehicle_id} not found`,
        });
      }

      res.json(vehicle);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      }) ;
    } 
  });

  vehicleRouter.delete("/:vehicle_id", async (req, res) => {
    const { vehicle_id } = req.params;

    try {
      const vehicle = await DB.drivers.vehicle.findByPk(vehicle_id);

      if (!vehicle) {
        return res.status(404).json({
          message: `Vehicle with id ${vehicle_id} not found`,
        });
      }

      await vehicle.destroy();
      res.status(200).json({
        message: "Successfully deleted",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

  vehicleRouter.put("/:vehicle_id", async (req, res) => {
    try {
      const { vehicle_id } = req.params;
      const vehicle = await DB.drivers.vehicle.findByPk(vehicle_id);

      if (!vehicle) {
        return res
          .status(404)
          .json({ message: `Vehicle with id ${vehicle_id} not found` });
      }

      await vehicle.update(req.body);
      res.json(vehicle);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });

  return vehicleRouter;
}
