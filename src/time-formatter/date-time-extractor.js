import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat);

export default function ExtractDateTime(dateTimeString) {
  const parsedDateTime = dayjs(dateTimeString);

  if (!parsedDateTime.isValid()) {
    return { date: null, time: null };
  }

  const date = parsedDateTime.format("YYYY-MM-DD");
  const time = parsedDateTime.format("hh:mm a");
  console.log(date, time)
  return { date, time };
}
