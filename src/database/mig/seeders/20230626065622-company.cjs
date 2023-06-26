'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      { tableName: 'company', schema: 'extended_travel' }, // Agregamos el objeto de opciones con la propiedad "schema"
      [
        {
          company_id: '17776a07-f596-4556-a88a-3dea75af5671',
          company_name: 'mirl',
          company_mail: 'mia@example.com',
          company_cell: '77777777',
          is_work_available_multiple_days: false,
          shomer_shabat: true,
          work_zone: ['צפת']
        }
      ]
    );
  }
}
  
//   async down (queryInterface, Sequelize) {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//   }
// };
