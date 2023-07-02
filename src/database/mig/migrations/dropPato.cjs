// 'use strict';
// /** @type {import('sequelize-cli').Migration} */

//   module.exports = {
//     up: async (queryInterface, Sequelize) => {
// <<<<<<< HEAD
//       // await queryInterface.removeColumn(
//       //   {
//       //     tableName: 'company',
//       //     schema: 'extended_travel'
//       //   },
//       //   'undefined'
//       // );
//       // await queryInterface.removeColumn(
//       //   {
//       //     tableName: 'company',
//       //     schema: 'extended_travel'
//       //   },
//       //   'pato'
//       // );
//     //   await queryInterface.removeColumn(
//     //     {
//     //       tableName: 'company',
//     //       schema: 'extended_travel'
//     //     },
//     //     'genero'
//     //   );
// =======
//       await queryInterface.removeColumn(
//         {
//           tableName: 'company',
//           schema: 'extended_travel'
//         },
//         'undefined'
//       );
//       await queryInterface.removeColumn(
//         {
//           tableName: 'company',
//           schema: 'extended_travel'
//         },
//         'pato'
//       );
//       await queryInterface.removeColumn(
//         {
//           tableName: 'company',
//           schema: 'extended_travel'
//         },
//         'genero'
//       );
// >>>>>>> fc6bd1b348a95f9ca6f1f0cdbcd7197657f91bd5
//     },
//   async down(queryInterface, Sequelize) {
//     // await queryInterface.dropTable('Companies');
//   }
// };