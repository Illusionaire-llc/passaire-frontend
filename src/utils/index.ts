export function calculateTotalPrice({
  price,
  quantity,
}: {
  price: number;
  quantity: number;
}): number {
  return price * quantity;
}

// export function calculateStartTime(date: string) {
//   const selectedDate = new Date(date);
//   const currentTime = new Date();
//   currentTime.setUTCHours(17); // 17 = 8pm GMT+3
//   currentTime.setMinutes(0);
//   currentTime.setSeconds(0);
//   selectedDate.setUTCHours(currentTime.getUTCHours());
//   selectedDate.setMinutes(currentTime.getMinutes());
//   selectedDate.setSeconds(currentTime.getSeconds());

//   const currentISODate = selectedDate.toISOString();
//   const utcTime = new Date(currentISODate);
//   const utcOffset = 0; // 3 hours converted to minutes
//   const offsetTime = new Date(utcTime.getTime() + utcOffset * 60000);
//   const offsetISODate = offsetTime.toISOString();
//   return offsetISODate;
// }
export function calculateStartTime({
  dateString,
  timeString,
}: {
  dateString: string;
  timeString: string;
}) {
  // Parse the input date string (assuming MM/DD/YYYY format)
  const [month, day, year] = dateString.split("/");
  const isoDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

  // Combine with the input time (assuming 24-hour format)
  const isoDateTime = `${isoDate}T${timeString}:00Z`;

  return isoDateTime;
}
