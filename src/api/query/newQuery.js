export async function newQery(sequelize, id) {
  try {
    const results = await sequelize.query(`
    SELECT DISTINCT
   
    pr.number_of_passengers,
    pr.start_day,
    pr.end_day,
    d.driver_name,
    d.driver_mail,
    v.number_of_seats AS driver_seats
FROM
    extended_travel.passenger p
    LEFT JOIN extended_travel.passenger_reservation pr ON pr.passenger_id = p.id
    LEFT JOIN extended_travel.drivers d ON pr.number_of_passengers <= (
        SELECT number_of_seats FROM extended_travel.vehicles WHERE driver_id = d.driver_id
    )
    LEFT JOIN extended_travel.driver_availability da ON d.driver_id = da.driver_id
        AND (da.available_from > pr.end_day OR da.available_to < pr.start_day)
    LEFT JOIN extended_travel.vehicles v ON v.driver_id = d.driver_id
WHERE
    (da.driver_id IS NULL OR pr.id IS NOT NULL);
        AND pr.id = ${id};
    `);
    console.log(results[0]);
    return results[0];
  } catch (error) {
    console.error(error);
    return error;
  }
}
