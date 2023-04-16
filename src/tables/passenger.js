import { DataTypes } from "sequelize";

export const createPassenger =  (sequelize) => {
const Passenger = sequelize.define('passenger', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    mail: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
    
  },  {
    tableName: "passenger",
    timestamps: false,
    schema: "extended_travel",
  },
  )
  // sequelize.sync({force:true});;
  return Passenger
}