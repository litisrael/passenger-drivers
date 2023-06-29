'use strict';
/** @type {import('sequelize-cli').Migration} */

  module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn(
        {
          tableName: 'company',
          schema: 'extended_travel'
        },
        'undefined'
      );
      await queryInterface.removeColumn(
        {
          tableName: 'company',
          schema: 'extended_travel'
        },
        'pato'
      );
      await queryInterface.removeColumn(
        {
          tableName: 'company',
          schema: 'extended_travel'
        },
        'genero'
      );
    },
  async down(queryInterface, Sequelize) {
    // await queryInterface.dropTable('Companies');
  }
};