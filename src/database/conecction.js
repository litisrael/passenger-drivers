import { Sequelize } from "sequelize";
import fs from 'fs';


export const getConnection = async () => {
  const sequelize = new Sequelize({
    dialect: "postgres",
    host: "localhost",
    port: 5432,
    database: "transportation",
    username: "postgres",
    password: "01456",
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

