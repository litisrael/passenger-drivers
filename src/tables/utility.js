
// export function validateReservation(model, event) {
//     if (model.start_day > model.end_day) {
//       throw new Error("The start date must be before the end date.");
//     }
//   }

  export  function validate2Dates (date1, date2) {
    if (date1 > date2) {
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
