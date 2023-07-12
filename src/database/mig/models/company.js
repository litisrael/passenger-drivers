'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Company.init({
    company_id: DataTypes.STRING,
    company_name: DataTypes.STRING,
    company_mail: DataTypes.STRING,
    company_cell: DataTypes.STRING,
    is_work_available_multiple_days: DataTypes.BOOLEAN,
    shomer_shabat: DataTypes.BOOLEAN,
   work_zone:  DataTypes.ENUM('נצרת', 'צפת', 'אילת'),
     
    
  }, {
    sequelize,
    modelName: 'Company',
    schema: "extended_travel",
    
  }
  );
  return Company;
};