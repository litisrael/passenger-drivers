export async function queryAvailableDriversForTrip(sequelize, dayOfWeek, from_region ,id_one_way) {
    try {
      const results = await sequelize.query(`
      SELECT DISTINCT *
  FROM extended_travel.company AS c
  JOIN extended_travel.vehicles AS v ON c.company_id = v.company_id
  LEFT JOIN availability_drivers.${dayOfWeek} AS a ON v.vehicle_id = a.vehicle_id
  JOIN extended_travel.reservation_oneway AS r ON ARRAY[c.work_zone]::text[] && ARRAY['${from_region}'::text]
  JOIN extended_travel.passenger AS p ON p.id = r.passenger_id
  WHERE r.number_of_passengers <= (
    SELECT number_of_seats FROM extended_travel.vehicles WHERE vehicle_id = v.vehicle_id
  )
  AND (a IS NULL OR (r.day_week = '${dayOfWeek}' AND r.departure_hour NOT BETWEEN a.unavailable_starting AND a.unavailable_until))
  AND r.id_one_way = ${id_one_way};
`);
    

    
      console.log(results[0]);
      return results[0];
    } catch (error) {
      console.error(error);
      return error;
    }
  }



// export async function queryAvailableDriversForTrip(sequelize, dayOfWeek) {
//   try {
//     const results = await sequelize.query(`
   
// SELECT c.*, v.*, a.*
// FROM extended_travel.company AS c
// INNER JOIN extended_travel.vehicles AS v ON c.company_id = v.company_id
// INNER JOIN availability_drivers."${dayOfWeek}" AS a ON v.vehicle_id = a.vehicle_id;


    
//   `);


//     console.log(results[0]);
//     return results[0];
//   } catch (error) {
//     console.error(error);
//     return error;
//   }
// }
