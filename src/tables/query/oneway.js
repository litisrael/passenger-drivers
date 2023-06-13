// export async function queryAvailableDriversForTrip(sequelize, dayOfWeek) {
//     try {
//       const results = await sequelize.query(`
//       SELECT *
//       FROM extended_travel.company AS c
//       INNER JOIN extended_travel.vehicles AS v ON c.company_id = v.company_id
//       INNER JOIN availability_drivers."${dayOfWeek}" AS a ON v.vehicle_id = a.vehicle_id;
      
//       SELECT *
//       FROM extended_travel.passenger AS p 
//       INNER JOIN extended_travel.reservation_oneway AS r ON r.passenger_id = p.id
//       WHERE ARRAY[c.work_zone]::text[] && ARRAY(
//         SELECT from_region::text
//         FROM extended_travel.reservation_oneway
//       )
//       AND r.day_week = '${dayOfWeek}';
//     `);
//     // WHERE ARRAY[c.work_zone]::text[] && ARRAY(
//     //   SELECT from_region::text
//     //   FROM extended_travel.reservation_oneway

    
//       console.log(results[0]);
//       return results[0];
//     } catch (error) {
//       console.error(error);
//       return error;
//     }
//   }

export async function queryAvailableDriversForTrip(sequelize, dayOfWeek) {
  try {
    const results = await sequelize.query(`
   
SELECT c.*, v.*, a.*
FROM extended_travel.company AS c
INNER JOIN extended_travel.vehicles AS v ON c.company_id = v.company_id
INNER JOIN availability_drivers."${dayOfWeek}" AS a ON v.vehicle_id = a.vehicle_id;


    
  `);


    console.log(results[0]);
    return results[0];
  } catch (error) {
    console.error(error);
    return error;
  }
}
