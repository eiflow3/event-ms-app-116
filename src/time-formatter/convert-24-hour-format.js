export default function ConvertTo24Hour(timeString) {
  const [time, modifier] = timeString.split(" ");
  let [hours, minutes, seconds] = time.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  } else if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  // Ensure hours are two digits with leading zero if needed
  const formattedHours = String(hours).padStart(2, "0");
  // Ensure minutes are two digits with leading zero if needed
  const formattedMinutes = String(minutes).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
}
