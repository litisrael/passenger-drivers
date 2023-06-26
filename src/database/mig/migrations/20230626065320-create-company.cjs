'use strict';
/** @type {import('sequelize-cli').Migration} */


/**
 * pude agregar y borrar una columna
 */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      {
        tableName: 'company',
        schema: 'extended_travel'
      },
      'genero'
    );
  },
  
  async down(queryInterface, Sequelize) {

}
}