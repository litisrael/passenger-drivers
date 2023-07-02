'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      {
        tableName: 'company',
        schema: 'extended_travel'
      },
      [
        {
          company_id: '17776a07-f596-4556-a88a-3dea75af5671',
          company_name: 'mirl',
          company_mail: 'mia@example.com',
          company_cell: '77777777',
          is_work_available_multiple_days: false,
          shomer_shabat: true,
<<<<<<< HEAD
          work_zone: [{צפת}]
=======
          work_zone: ['צפת']
>>>>>>> fc6bd1b348a95f9ca6f1f0cdbcd7197657f91bd5
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete(
      {
        tableName: 'company',
        schema: 'extended_travel'
      },
      null,
      {}
    );
  }
};
