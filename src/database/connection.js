import { Sequelize } from "sequelize";

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

//  export const conecction = async() => {
//   const sequelize = new Sequelize({
//     dialect: "postgres",
//     host: "jbh.cdmpuxbiuunc.us-east-1.rds.amazonaws.com",
//     port: 5432,
//     database: "transportation",
//     username: 'postgres',
//     password: '01456'
//   })
// return await sequelize.authenticate()
// .then(() => {
//   console.log('Connection has been established successfully.');
//   return sequelize;
// })
// .catch(err => {
//   console.error('Unable to connect to the database:', err);
//   throw err;
// });
// };
