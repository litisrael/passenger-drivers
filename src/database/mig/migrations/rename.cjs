// 'use strict';
// /** @type {import('sequelize-cli').Migration} */

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.renameColumn(
//       {
//         tableName: 'vehicle_availability_tourist',
//         schema: 'availability_drivers'
//       },
//       'available_from',  // Antiguo nombre de columna
//       'disable_from'  // Nuevo nombre de columna
//     );

//     await queryInterface.renameColumn(
//       {
//         tableName: 'vehicle_availability_tourist',
//         schema: 'availability_drivers'
//       },
//       'available_to',  // Antiguo nombre de columna
//       'disable_until'  // Nuevo nombre de columna
//     );
//   },
//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.renameColumn(
//       {
//         tableName: 'vehicle_availability_tourist',
//         schema: 'availability_drivers'
//       },
//       'disable_from',  // Nuevo nombre de columna
//       'available_from'  // Antiguo nombre de columna
//     );

//     await queryInterface.renameColumn(
//       {
//         tableName: 'vehicle_availability_tourist',
//         schema: 'availability_drivers'
//       },
//       'disable_until',  // Nuevo nombre de columna
//       'available_to'  // Antiguo nombre de columna
//     );
//   }
// };
