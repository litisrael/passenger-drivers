
import { QueryTypes } from 'sequelize';

export async function validateDateNotBetweenExisting(Model, startDate, endDate) {

  const query = `SELECT * FROM extended_travel.vehicle_availability_tourist
                 WHERE vehicle_id = :vehicleId
                 AND ((available_from <= :startDay AND :startDay <= available_to) OR
                      (available_to <= :startDay AND :endDay <= available_to) OR
                      (:startDay <= available_from AND available_to <= :endDay));`;
  
  
  const existingAvailability = await Model.sequelize.query(query, {
    type: QueryTypes.SELECT,
    replacements: {
      vehicleId: Model.vehicle_id,
      startDay: startDate,
      endDay: endDate
    }
  });
  
  if (existingAvailability.length > 0) {
    throw new Error(`The insertion date is within an existing range.`);
  }
}

  export  function validate2Dates (date1, date2) {
    if (date1 >= date2) {
      throw new Error("The start date must be before the end date.");
    }
  }

  export  function validateAfterCurrentDate (date) {
    if (date < currentDate()) {
      throw new Error("The date must be after current date.");
    }
  }

export const nextYear = ()=> new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate()).toISOString().split("T")[0];

export const currentDate =()=> new Date().toISOString().split("T")[0]


export function regionEnum() {
  return [
    "חולון",
    "צפת",
    "חיפה",
    "עפולה",
    "תל אביב",
    "כנרת",
    "נצרת",
    "ירושלים",
    "גוש קטיף",
    "שומרון",
    "רמת גן",
    "גולן",
    "השרון",
    "רמלה",
    "חדרה",
    "אשקלון",
    "בקעת הירדן",
    "עכו",
    "גוש עציון",
    "רחובות",
    "באר שבע",
    "פתח תקווה",
    "חברון"
  ];
}


