// 'use strict';
// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.changeColumn(
//         {
//             tableName: 'company',
//             schema: 'extended_travel'
//           },
//      'work_zone', {
   
//       type: Sequelize.ARRAY(Sequelize.STRING()),
//       allowNull: false,
//     });
//   },
  
//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.changeColumn(
//         {
//             tableName: 'company',
//             schema: 'extended_travel'
//           },
//         'work_zone', {
//       type: Sequelize.ARRAY(Sequelize.TEXT),
//       allowNull: false,
//     });
//   }
// };