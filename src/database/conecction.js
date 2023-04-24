import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from "sequelize";



export const getConnection = async () => {
  const sequelize = new Sequelize({
    dialect: "postgres",
    host: process.env.endpoint,
    port: 5432,
    database: "transportation",
    username: "postgres",
    password: process.env.password,
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

