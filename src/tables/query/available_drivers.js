
export async function queryAvailableDriversForTrip(sequelize, id) {
    try {
        const results = await sequelize.query(`
        select   DISTINCT
            p.passenger_name,
            p.passenger_mail,
            p.passenger_cell,
            pr.number_of_passengers,
          v.number_of_seats,
            pr.start_day,
            pr.end_day,
            vat.available_from, 
            vat.available_to ,
            c.company_name,
            c.company_mail
            
           
        
        FROM extended_travel.passenger p
        LEFT JOIN extended_travel.passenger_reservation pr ON pr.passenger_id = p.id
          LEFT JOIN extended_travel.vehicles v  ON pr.number_of_passengers <= (
                SELECT  number_of_seats FROM extended_travel.vehicles WHERE vehicle_id = v.vehicle_id
            )
        
        LEFT JOIN extended_travel.vehicle_availability_tourist vat ON vat.vehicle_id = v.vehicle_id
        LEFT JOIN extended_travel.company c ON c.company_id = v.company_id
        WHERE
             c.is_work_available_multiple_days = true
            AND (pr.start_day > vat.available_from  )
            AND (pr.end_day < vat.available_to )
          
          
          
          AND pr.id = ${id};
      `);
      
      console.log(results[0]);
      return results[0];
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  