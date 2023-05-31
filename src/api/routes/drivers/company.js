import express from "express";

export function companyRouter(DB) {

    const companyRouter = express.Router();
    companyRouter.post("/", async (req, res) => {
      try {
        const newCompany = await DB.drivers.company.create(req.body
          // , { fields: ["name", "mail", "cel", "number_of_passengers", "languages"],}
        );
        return res.json(newCompany);
      } catch (error) {
        return res.status(500).json({
          message: error.message,
        });
      }
    });
  
  

  companyRouter.get("/", async (req, res) => {
    try {
      const company = await DB.drivers.company.findAll();
      return res.json(company);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

  companyRouter.get("/:company_id", async (req, res) => {
    const { company_id } = req.params;

    

    try {
      const company = await DB.drivers.company.findByPk(company_id)
      
      if (!company) {
        return res.status(404).json({
          message: ` User not found`,
        });
      }
      res.json(company);
      
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

  companyRouter.delete("/:company_id", async (req, res) => {
    const { company_id } = req.params;

    try {
      const company = await DB.drivers.company.findOne({
        where: { company_id: company_id },
      });

      if (!company) {
        return res.status(404).json({
          message: ` User not found`,
        });
      }

      await DB.drivers.company.destroy({
        where: { company_id: company_id },
      });
      res.status(200).json({
        message: "Successfully deleted",
      });

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

  companyRouter.put("/:company_id", async (req, res) => {
    try {
      const {  company_id } = req.params;
      // const { name, mail, cel, number_of_passengers, languages,is_work_available_multiple_days,work_zone } = req.body;

      const company = await DB.drivers.company.findByPk(company_id);
      if (!company) {
        return res
          .status(404)
          .json({ message: `Driver with id ${company_id} not found` });
      }
     
      await company.update(req.body);
      

      res.json(company);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });

  return companyRouter;
}
