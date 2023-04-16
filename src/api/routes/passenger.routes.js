import express from "express";

export function passengerRouter(DB) {
  const passengerRouter = express.Router();

  passengerRouter.post("/", async (req, res) => {
    try {
      const newPassenger = await DB.Passenger.create(req.body);
      return res.json(newPassenger);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

  passengerRouter.get("/", async (req, res) => {
    try {
      const passengers = await DB.Passenger.findAll({
        attributes: ["id", "name", "mail"]
      });
      return res.json(passengers);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

  passengerRouter.get("/:passenger_id", async (req, res) => {
    const { passenger_id } = req.params;

    try {
      const passenger = await DB.Passenger.findByPk(passenger_id);
      if (!passenger) {
        return res
          .status(404)
          .json({ message: `Passenger with id ${passenger_id} not found` });
      }
      return res.json(passenger);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

  passengerRouter.put("/:passenger_id", async (req, res) => {
    const { passenger_id } = req.params;

    try {
      const passenger = await DB.Passenger.findByPk(passenger_id);
      if (!passenger) {
        return res
          .status(404)
          .json({ message: `Passenger with id ${passenger_id} not found` });
      }

      await passenger.update(req.body);

      return res.json(passenger);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

  passengerRouter.delete("/:passenger_id", async (req, res) => {
    const { passenger_id } = req.params;

    try {
      const passenger = await DB.Passenger.findByPk(passenger_id);
      if (!passenger) {
        return res
          .status(404)
          .json({ message: `Passenger with id ${passenger_id} not found` });
      }

      await passenger.destroy();

      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });


  
  return passengerRouter;
}
