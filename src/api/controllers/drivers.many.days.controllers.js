import express from 'express';

export async function createDriverManyDays(db) {
  const driverRouter = express.Router();

  driverRouter.post('/', async (req, res) => {
    const { name, mail, cel, number_of_passengers, languages } = req.body;
    console.log(req)
    try {
      let newDriver = await db.Driver.create(
        {
          name: name,
          mail: mail,
          cel: cel,
          number_of_passengers: number_of_passengers,
          languages: languages
        },
        {
          fields: ['name', 'mail', 'cel', 'number_of_passengers', 'languages'],
        }
      );
      return res.json(newDriver);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

  return driverRouter;
}