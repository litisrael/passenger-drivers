import { DataTypes } from "sequelize";
import { dayOfWeekString,  validateABeforeB, validateTimeBeforeB} from "../utility.js";

export const createDaysOfWeek = (sequelize) => {
  let tablesDays
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  daysOfWeek.forEach(dayOfWeek => {

  tablesDays = sequelize.define(dayOfWeek, {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      busyFromHour: {
        type: DataTypes.TIME,
        // validate: { isAfter: currentDate },
        defaultValue: '00:00'
      },
      busyEndHour: {
        type: DataTypes.TIME,
        defaultValue: '00:00'
       
      },
    
    },
    {
      tableName:dayOfWeek,
      timestamps: false,
      schema: "availability_drivers",
    }
    );
  });
//    tablesDays.beforeBulkCreate(async (models) => {
//     for (const model in models) {
//       validateABeforeB(model.busyFromHour, model.busyEndHour);
//     }
//   });


// tablesDays.beforeBulkUpdate(async(models) => {
//   for (const model of models) {

//     validateABeforeB(model.busyFromHour, model.busyEndHour);
//   }})


  return tablesDays
}
