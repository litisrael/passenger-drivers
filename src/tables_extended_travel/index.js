import { getConnection } from "../database/conecction.js";
import * as Tables from "./createTable.js";

async function main() {
  const sequelize = await getConnection();
   sequelize.sync({force:true});
  const tables = await Tables.createTables(sequelize);

  return tables;
}

main().then(tables => {
  console.log("¡Tablas creadas con éxito!");
}).catch(error => {
  console.error("Error al crear las tablas:", error);
});

// async function main() {
//   const sequelize = await getConnection();
//    await sequelize.sync();
//   const { Driver, DriverAvailability,Passenger,PassengerReservation } = await Tables.createTables(sequelize);

//   const newDriver = {
//     name: "Pedro",
//     mail: "pedro@mail.com",
//     cel: "555-1234",
//     number_of_passengers: 3,
//     languages: "español",
//   };

//   const driver = await Driver.create(newDriver);

//   const newAvailability = {
//     occupied_from: "2023-05-01",
//     occupied_to: "2023-05-07",
//     driver_id: driver.driver_id,
//   };

//   const availability = await DriverAvailability.create(newAvailability);

//   console.log("¡Datos agregados exitosamente!",  driver.toJSON());
// }

// main();

  // initDB().then((tables) => {
  //   const newDriver = {
  //     name: "kjhgfe",
  //     mail: "sd@mail.com",
  //     cel: "555-1234",
  //     number_of_passengers: 3,
  //   };
  
  //   tables.tableDriver.create(newDriver).then((driver) => {
  //     console.log("Nuevo conductor creado:", driver.toJSON());
  //   }).catch((error) => {
  //     console.error("Error al crear el conductor:", error);
  //   });
  // });

// Driver().then((model) =>
//   model.create(newDriver).then((result) => console.log(result))
// );

