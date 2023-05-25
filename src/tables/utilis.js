export const isValidDate = ()=> {
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() + 1);
    const currentDateISO = currentDate.toISOString().split("T")[0];
  
    const inputDate = new Date();
  
    if (isNaN(inputDate) || inputDate < new Date() || inputDate > currentDateISO) {
      return('La fecha debe estar entre la fecha actual y un año en el futuro.');
    }
  }