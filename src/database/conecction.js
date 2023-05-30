import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from "sequelize";



export const getConnection = async () => {
  const sequelize = new Sequelize({
    dialect: process.env.db_dialect ,
    host: process.env.db_localhost,
    port: process.env.db_port,
    database: "transoprt",
    username: process.env.db_user,
    password: process.env.db_password_local,
  });

  return await sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
  return sequelize;
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
  throw err;
});
};



// import path from 'path';
// export const getConnection = async () => {
  
// const AWS_CREDENTIALS_PATH = 'C:/Users/isroe/.aws';
// const credentials = fs.readFileSync(path.resolve(AWS_CREDENTIALS_PATH, 'credentials'));

//   const [, , , , , password] = credentials.toString().split('\n');

//   const sequelize = new Sequelize({
//     dialect: 'postgres',
//     host: 'localhost',
//     port: 5432,
//     database: 'transportation',
//     username: 'postgres',
//     password: password.trim(),
//   });

//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//     return sequelize;
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//     throw error;
//   }
// };

