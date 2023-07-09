import express from "express";

export function createFormRegister(DB, sequelize) {
  const FormRegister = express.Router();
  let trx = null; // Inicializa trx como null

  FormRegister.post("/", async (req, res) => {
    console.log(req.body.data.formDays.days);
  
    try {
      trx = await sequelize.transaction(); // Asigna el resultado de sequelize.transaction() a trx
  
      const company = await DB.drivers.company.create(req.body.data.formCompany, {
        transaction: trx,
      });
  
      const companyId = company.company_id; // Obtener el UUID de la compañía creada
  
      const vehicleData = req.body.data.formVehicle.vehicle.map(vehicle => ({
        ...vehicle,
        company_id: companyId, // Asignar el UUID de la compañía al campo "company_id" del vehículo
      }));
  
      const vehicles = await DB.drivers.vehicle.bulkCreate(vehicleData, {
        transaction: trx,
      });
     
      for (const vehicle of vehicles) {
        const vehicleId = vehicle.vehicle_id;
      
        for (const dayData of req.body.data.formDays.days) {
          const { day, data } = dayData;
          const table = DB.drivers.daysOfWeek.find(
            (table) => table.tableName === day
            );
            const recordsToInsert = data.map(dataItem => ({
              ...dataItem,
              vehicle_id: vehicleId,
            }));
            console.log(recordsToInsert,"recordsToInsert")
        
            const result = await table.bulkCreate(recordsToInsert, {
              transaction: trx,
            });
        
            console.log(result); // Resultado de la inserción en la tabla del día
          }
        }
      
        
      
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
