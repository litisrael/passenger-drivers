import express from "express";

export function dayOfWeekRouter(DB) {
  const dayOfWeekRouter = express.Router();

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  daysOfWeek.forEach(dayOfWeek => {

    dayOfWeekRouter.delete(`/${dayOfWeek}/:id`, async (req, res) => {
        const {id} = req.params 
        try{
        const day = await DB.drivers.daysOfWeek.findByPk(id)
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


    dayOfWeekRouter.get(`/${dayOfWeek}`, async (req, res) => {
      try {
        const day = await DB.drivers.daysOfWeek.findAll();
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

    dayOfWeekRouter.get(`/${dayOfWeek}/:id`, async (req, res) => {
        const { id } = req.params;

        try {
          const day = await DB.drivers.daysOfWeek.findAll({
            where: { vehicle_id: id },
        });
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

        dayOfWeekRouter.put(`/${dayOfWeek}/:id`, async (req, res) => {
        const { id } = req.params; 
        try {
            const day = await DB.drivers.daysOfWeek.findAll({
              where: { vehicle_id: id },
          });
        
          if (!day) {
            return res.status(404).json({
              message: `Day ${dayOfWeek} not found`,
            });
          }
       
          const updatedBusyDay = await DB.drivers.daysOfWeek.bulkCreate(req.body,{
            updateOnDuplicate: [   "busyFromHour", "busyEndHour"]
          });
    
    
          res.json(updatedBusyDay);
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      });
    dayOfWeekRouter.post(`/${dayOfWeek}`, async (req, res) => {
        try {
            const day = await DB.drivers.daysOfWeek.bulkCreate(req.body);
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
