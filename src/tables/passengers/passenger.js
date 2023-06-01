import { DataTypes } from "sequelize";

export const createPassenger =  (sequelize) => {
const Passenger = sequelize.define('Passenger', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    passenger_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
   passenger_mail: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    passenger_cell: {
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