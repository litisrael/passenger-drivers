import { getConnection } from "../database/conecction.js";
import * as Tables from "./createTables.js";


export async function initDB() {
  const sequelize = await getConnection();
   sequelize.sync({force:false});
  const tables = await Tables.createTables(sequelize);

  return tables;
}
