import express from "express";

export async function createPassenger(DB) {
  const PassengerRouter = express.Router();
  PassengerRouter.post("/", async (req, res) => {
    console.log(req.body);
    try {
      let newPassenger = await DB.Passenger.create({ ...req.body });
      return res.json(newPassenger);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

  return PassengerRouter;
}

export async function getDriversTourist(DB) {
  const PassengerRouter = express.Router();
  PassengerRouter.get("/", async (req, res) => {
    try {
      const Passenger = await DB.Passenger.findAll();
      return res.json(Passenger);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

  return PassengerRouter;
}

export async function getDriverTourist(DB) {
  const PassengerRouter = express.Router();

  PassengerRouter.get("/:driver_id", async (req, res) => {
    const { driver_id } = req.params;

    try {
      const Passenger = await DB.Passenger.findOne({
        where: { driver_id: driver_id },
      });

      res.json(Passenger);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

  return PassengerRouter;
}

export async function deleteDriverTourist(DB) {
  const PassengerRouter = express.Router();

  PassengerRouter.delete("/:driver_id", async (req, res) => {
    const { driver_id } = req.params;

    try {
      const Passenger = await DB.Passenger.findOne({
        where: { driver_id: driver_id },
      });

      if (!Passenger) {
        return res.status(404).json({
          message: ` User not found`,
        });
      }

      await DB.Passenger.destroy({
        where: { driver_id: driver_id },
      });

      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

  return PassengerRouter;
}

export const updateDriverTourist = async (DB) => {
  const PassengerRouter = express.Router();
  PassengerRouter.put("/:driver_id", async (req, res) => {
    try {
      const { driver_id } = req.params;
      const { name, mail, cel, number_of_passengers, languages } = req.body;

      const Passenger = await DB.Passenger.findByPk(driver_id);
      if (!Passenger) {
        return res
          .status(404)
          .json({ message: `Driver with id ${driver_id} not found` });
      }

    //   Passenger.name = name;
    //   Passenger.mail = mail;
    //   Passenger.cel = cel;
    //   driver.number_of_passengers = number_of_passengers;
    //   driver.languages = languages;

      await Passenger.save();

      res.json(Passenger);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });

  return PassengerRouter;
};
