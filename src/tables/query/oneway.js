export async function queryAvailableDriversForTrip(sequelize, dayOfWeek) {
    try {
      const results = await sequelize.query(`
      SELECT *
      FROM extended_travel.company c
      INNER JOIN extended_travel.vehicles v ON c.company_id = v.company_id
      INNER JOIN availability_drivers."${dayOfWeek}" a ON v.vehicle_id = a.vehicle_id;
      
      SELECT *
      FROM extended_travel.passenger p 
      INNER JOIN extended_travel.reservation_oneway r ON r.passenger_id = p.passenger_id
      WHERE ARRAY[c.work_zone]::text[] && ARRAY(
        SELECT from_region::text
        FROM extended_travel.reservation_oneway
      )
      AND r.day_week = '${dayOfWeek}';
    `);
    
      console.log(results[0]);
      return results[0];
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  
