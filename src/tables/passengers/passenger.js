import { DataTypes } from "sequelize";

export const createPassenger =  (sequelize) => {
const Passenger = sequelize.define('passenger', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Passenger_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
   Passenger_mail: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    Passenger_cell: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
    
  },  {
    tableName: "passenger",
    timestamps: false,
    schema: "extended_travel",
  },)
  // sequelize.sync({force:true});;
  return Passenger
}