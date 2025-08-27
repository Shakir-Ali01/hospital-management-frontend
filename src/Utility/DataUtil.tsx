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

// Example usage
console.log(formatDate(new Date("2000-08-25"))); // 25 August 2000
console.log(formatDate("2000-08-25")); // 25 August 2000
export { formatDate };