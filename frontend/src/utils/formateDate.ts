export const formatDate = (date: string | Date, locale: string = "en-US"): string => {
  const dateObject = new Date(date);

  // Check if the date is invalid
  if (isNaN(dateObject.getTime())) {
    throw new Error("Invalid date provided");
  }

  return dateObject.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
