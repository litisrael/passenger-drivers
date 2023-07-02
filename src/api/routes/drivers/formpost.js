import express from "express";

export async function FormRegister(DB, sequelize) {
  try {
    const FormRegister = express.Router();
    const trx = await sequelize.transaction();

    FormRegister.post("/", async (req, res) => {
      const { data } = req.body;
      console.log(data);
      const Company = await DB.drivers.company.create(data, {
        transaction: trx,
      });
      const vehicle = await DB.drivers.vehicle.bulkCreate(data, {
        transaction: trx,
      });
      const daysOfWeek = await DB.drivers.daysOfWeek.bulkCreate(data, {
        transaction: trx,
      });
      const vehiclesAvailabilityTourist =
        await DB.drivers.vehiclesAvailabilityTourist.bulkCreate(data, {
          transaction: trx,
        });

      console.log("success");
      await trx.commit();
      return res.json(data);
    });
  } catch (error) {
    console.log("error");

    // if (trx) {
    //   await trx.rollback();
    // }
    // return res.status(500).json({
    //     message: error.message,
    //   });
  }

  return FormRegister;
}


// try {
//     const newCompany = await DB.drivers.company.create(req.body );
//     return res.json(newCompany);
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message,
//     });
//   }
// });