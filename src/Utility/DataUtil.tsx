const formatDate = (date: string | Date): string => {
    if(!date) return '-';
  const parsedDate = date instanceof Date ? date : new Date(date);

  if (isNaN(parsedDate.getTime())) {
    throw new Error("Invalid date provided");
  }

  return parsedDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatDateWithTime=(dateString:any)=>{

  if(!dateString) return "";
  //const date = new Date(dateString);
    const date = new Date(dateString + "Z");
 const options: Intl.DateTimeFormatOptions = {
    weekday: "long",   // "Monday"
    year:"numeric",
    month:"long",
    day:"numeric",
    hour: "2-digit",   // "05"
    minute: "2-digit", // "35"
    hour12: true ,
    timeZone: "Asia/Kolkata"   // 👈 force IST      // "PM"
  };

  return date.toLocaleString("en-IN", options);
}
// Example usage
console.log(formatDate(new Date("2000-08-25"))); // 25 August 2000
console.log(formatDate("2000-08-25")); // 25 August 2000
export { formatDate ,formatDateWithTime};