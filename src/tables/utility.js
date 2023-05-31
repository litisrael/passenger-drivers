
// import { Op } from 'sequelize';
// export async function validateDateNotBetweenExisting(tableName, fkColumnName, startDateColumn, endDateColumn, insertDate) {
//   try {
//     const existingRecord = await sequelize.models[tableName].findOne({
//       where: {
//         [fkColumnName]: sequelize.models[tableName].rawAttributes[fkColumnName].field,
//         [startDateColumn]: {
//           [Op.lte]: insertDate
//         },
//         [endDateColumn]: {
//           [Op.gte]: insertDate
//         }
//       }
//     });

//     if (existingRecord) {
//       throw new Error(`La fecha de inserción ${insertDate} está dentro de un rango existente en la tabla ${tableName}.`);
//     }
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }


// Función para validar si una fecha se encuentra entre los rangos existentes en una tabla específica
// export async function validateDateNotBetweenExisting( startDateColumn, endDateColumn, insertDate) {

//     const existingRecord = await sequelize.models[tableName].findOne({
//       where: {
//         [startDateColumn]: {
//           [Op.lte]: insertDate
//         },
//         [endDateColumn]: {
//           [Op.gte]: insertDate
//         }
//       }
//     });

//     if (existingRecord) {
//       throw new Error(`La fecha de inserción ${insertDate} está dentro de un rango existente en la tabla ${tableName}.`);
//     }

// export async function  validateDateNotBetweenExisting (date1, date2 ,insertDate) {
//     if (insertDate >= date1 && insertDate <= date2) {
//       throw new Error(`The insertion date is within an existing ${insertDate} range.`);
//     }
//   }
  export  function validate2Dates (date1, date2) {
    if (date1 > date2) {
      throw new Error("The start date must be before the end date.");
    }
  }

  export  function validateAfterCurrentDate (date) {
    if (date < currentDate()) {
      throw new Error("The date must be after current date.");
    }
  }

export const nextYear = ()=> new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate()).toISOString().split("T")[0];

export const currentDate =()=> new Date().toISOString().split("T")[0]
