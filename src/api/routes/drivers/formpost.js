import express from "express";

export function createFormRegister(DB, sequelize) {
  const FormRegister = express.Router();
  let trx = null; // Inicializa trx como null

  FormRegister.post("/", async (req, res) => {
    // console.log(req.body);
  
    try {
      trx = await sequelize.transaction(); // Asigna el resultado de sequelize.transaction() a trx
  
      const company = await DB.drivers.company.create(req.body.data.formCompany, {
        transaction: trx,
      });
  
      const companyId = company.company_id; // Obtener el UUID de la compañía creada
  
      const vehicleData = req.body.data.formVehicle.map(vehicle => ({
        ...vehicle,
        company_id: companyId, // Asignar el UUID de la compañía al campo "company_id" del vehículo
      }));
  
      const vehicles = await DB.drivers.vehicle.bulkCreate(vehicleData, {
        transaction: trx,
      });
  
      console.log("success");
      await trx.commit();
      return res.json({
        company,
        vehicles,
      });
    } catch (error) {
      console.log("error");
  
      if (trx !== null) {
        await trx.rollback();
      }
      return res.status(500).json({
        message: error.message,
      });
    }
  });
  

  return FormRegister;
}

// const companyId =company.dataValues.company_id
// import express from "express";

// export  function createFormRegister(DB, sequelize) {
//   const FormRegister = express.Router();
//   try {
//     //creo q tendira que ser async
//     const trx =  sequelize.transaction();
//     FormRegister.post("/", async (req, res) => {

      
//       const Company = DB.drivers.company.create(req.body.formCompany, {
//         transaction: trx,
//       });
//       const vehicle =  DB.drivers.vehicle.bulkCreate(req.body.formVehicle, {
//         transaction: trx,
//       });
//       // const daysOfWeek = await DB.drivers.daysOfWeek.bulkCreate(data, {
//       //   transaction: trx,
//       // });
//       // const vehiclesAvailabilityTourist =
//       //   await DB.drivers.vehiclesAvailabilityTourist.bulkCreate(data, {
//       //     transaction: trx,
//       //   });

//       console.log("success");
//        trx.commit();
//       return res.json({
//         Company, vehicle,
//         // daysOfWeek,vehiclesAvailabilityTourist
//       });
//     });
//   } catch (error) {
//     console.log("error");

//     if (trx) {
//        trx.rollback();
//     }
//     return res.status(500).json({
//         message: error.message,
//       });
//   }

//   return FormRegister;
// }


// // try {
//     const newCompany = await DB.drivers.company.create(req.body );
//     return res.json(newCompany);
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message,
//     });
//   }
// });