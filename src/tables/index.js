import { getConnection } from "../database/conecction.js";
import * as Tables from "./createTables.js";


export async function initDB() {
  const sequelize = await getConnection();
   sequelize.sync({force:true});
  const tables = await Tables.createTables(sequelize);

  return tables;
}
