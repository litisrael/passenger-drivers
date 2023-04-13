import express from "express";

export function driverTouristRouter(DB) {
  const driverRouter = express.Router();

  driverRouter.post("/", async (req, res) => {
    console.log(req.body);
    try {
      let newDriver = await DB.Driver.create({ ...req.body });
      return res.json(newDriver);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

  driverRouter.get("/", async (req, res) => {
    try {
      const drivers = await DB.Driver.findAll();
      return res.json(drivers);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

  driverRouter.get("/:driver_id", async (req, res) => {
    const { driver_id } = req.params;

    try {
      const driver = await DB.Driver.findOne({
        where: { driver_id: driver_id },
      });

      res.json(driver);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

  driverRouter.delete("/:driver_id", async (req, res) => {
    const { driver_id } = req.params;

    try {
      const driver = await DB.Driver.findOne({
        where: { driver_id: driver_id },
      });

      if (!driver) {
        return res.status(404).json({
          message: ` User not found`,
        });
      }

      await DB.Driver.destroy({
        where: { driver_id: driver_id },
      });

      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

  driverRouter.put("/:driver_id", async (req, res) => {
    try {
      const { driver_id } = req.params;
      const { name, mail, cel, number_of_passengers, languages } = req.body;

      const driver = await DB.Driver.findByPk(driver_id);
      if (!driver) {
        return res
          .status(404)
          .json({ message: `Driver with id ${driver_id} not found` });
      }

      driver.name = name;
      driver.mail = mail;
      driver.cel = cel;
      driver.number_of_passengers = number_of_passengers;
      driver.languages = languages;

      await driver.save();

      res.json(driver);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });

  return driverRouter;
}
