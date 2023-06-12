import express from "express";

export function dayOfWeekRouter(DB) {
  const dayOfWeekRouter = express.Router();

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


  daysOfWeek.forEach((day, index) => {
    const table = DB.drivers.daysOfWeek[index]; // Accede a la tabla según el índice del array
    
console.log(table)
    dayOfWeekRouter.delete(`/${day}/:id`, async (req, res) => {
        const {id} = req.params 
        try{
        const day = await table.findByPk(id)
        if (!day) {
            return res.status(404).json({
                  message: `Day ${dayOfWeek} not found`,
            });
          }
          await day.destroy()
          res.status(200).json({
            message: `Successfully delete`,
          });
         
        }catch (error) {
            return res.status(500).json({
              message: error.message,
            });
          }
        })


    dayOfWeekRouter.get(`/${day}`, async (req, res) => {
      try {
        const day = await table.findAll();
        if (!day) {
          return res.status(404).json({
            message: `Day ${dayOfWeek} not found`,
          });
        }
        return res.json(day);
      } catch (error) {
        return res.status(500).json({
          message: error.message,
        });
      }
    });

    dayOfWeekRouter.get(`/${day}/:id`, async (req, res) => {
        const { id } = req.params;

        try {
          const dia = await table.findAll({
            where: { vehicle_id: id },
        });
          if (!dia) {
            return res.status(404).json({
              message: `Day ${dia} not found`,
            });
          }
          return res.json(dia);
        } catch (error) {
          return res.status(500).json({
            message: error.message,
          });
        }
      });

        dayOfWeekRouter.put(`/${day}/:id`, async (req, res) => {
        const { id } = req.params; 
        try {
            const dia = await table.findAll({
              where: { vehicle_id: id },
          });
        
          if (!dia) {
            return res.status(404).json({
              message: `Day ${day} not found`,
            });
          }
       
          const updatedBusyDay = await table.bulkCreate(req.body,{
            updateOnDuplicate: [   "busyFromHour", "busyEndHour"]
          });
    
    
          res.json(updatedBusyDay);
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      });
    dayOfWeekRouter.post(`/${day}`, async (req, res) => {
        try {
            const day = await table.bulkCreate(req.body);
          return res.json(day);
        } catch (error) {
          return res.status(500).json({
            message: error.message,
          });
        }
      });
});

  return dayOfWeekRouter;
}
