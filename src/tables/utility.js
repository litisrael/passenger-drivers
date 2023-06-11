

export function validateTimeBeforeB (a, b) {
  const aDate = new Date(a);
  const bDate = new Date(b);
  
  if (aDate >= bDate) {
     throw new Error(`The ${a} must be before the ${b}.`);
  }
 }

export const dayOfWeekString =()=> ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


  export  function validateABeforeB (a, b) {
    if (a >= b) {
      throw new Error(`The ${a} must be before the ${b}.`);
    }
  }
  export const currentDate =()=> new Date().toISOString().split("T")[0]

  export  function validateAfterCurrentDate (date) {
    if (date < currentDate()) {
      throw new Error(`The ${date} must be after current date.`);
    }
  }

export const nextYear = ()=> new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate()).toISOString().split("T")[0];

export function getDayOfWeekInEnglish(date) {
  const d = new Date(date);
  const dayOfWeek = d.getDay();
  return dayOfWeekString()[dayOfWeek];
}

export const dayOfWeekEnum =  ()=>  dayOfWeekString();

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


