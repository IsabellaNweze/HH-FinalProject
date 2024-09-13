
export const loadTimezonesFromLocalStorage = () => {
    const storedTimezones = localStorage.getItem('timezones');
    return storedTimezones ? JSON.parse(storedTimezones) : null;
  };
  
  export const saveTimezonesToLocalStorage = (timezonesList) => {
    localStorage.setItem('timezones', JSON.stringify(timezonesList));
  };
  