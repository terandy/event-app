import { DAYS_OF_THE_WEEK } from "../data";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const isSameDay = (someDate, otherDate, frequency, isRecurring) => {
  if (!isRecurring) {
    return (
      someDate.getDate() == otherDate.getDate() &&
      someDate.getMonth() == otherDate.getMonth() &&
      someDate.getFullYear() == otherDate.getFullYear()
    );
  }
  switch (frequency) {
    case "DAILY":
      return true;
    case "WEEKLY":
    case "BIWEEKLY":
      return someDate.getDay() === otherDate.getDay();
    case "MONTHLY":
    case "BIMONTHLY":
    case "QUARTERLY":
    case "SEMIANUALLY":
      return someDate.getDate() === otherDate.getDate();
    case "YEARLY":
      return (
        someDate.getDate() === otherDate.getDate() &&
        someDate.getMonth() === otherDate.getMonth()
      );
    default:
      return false;
  }
};
export const formatDate = (datetime) => {
  return `${
    MONTHS[datetime?.getMonth()]
  } ${datetime?.getDate()}, ${datetime?.getFullYear()}`;
};

export const formatCalendarDate = (datetime) => {
  const month = datetime?.getMonth() + 1;
  const day = datetime?.getDate();
  return `${datetime?.getFullYear()}-${month > 9 ? month : `0${month}`}-${
    day > 9 ? day : `0${day}`
  }`;
};

export const extractDate = (date) => {
  const jsDate = date?.toDate();
  return formatDate(jsDate);
};

export const extractCalendarDate = (date) => {
  const jsDate = date?.toDate();
  return formatCalendarDate(jsDate);
};

export const formatTime = (datetime) => {
  const hours = datetime?.getHours();
  const minutes = datetime?.getMinutes();
  const isPm = hours > 12;
  const formattedTime = `${isPm ? hours - 12 : hours}${
    minutes > 9 ? `:${minutes}` : minutes > 0 ? `:0${minutes}` : ""
  }${isPm ? "pm" : "am"}`;
  return formattedTime;
};

export const extractTime = (time) => {
  const jsTime = time?.toDate();
  return formatTime(jsTime);
};

export const getDisplayDateTime = (event) => {
  const {
    startDateTime,
    endDateTime,
    dateTime,
    isMultiday,
    frequency,
    isRecurring,
  } = event;
  const displayStartDate = extractDate(startDateTime ?? event.dateTime);
  const displayStartTime = extractTime(startDateTime ?? event.dateTime);
  const displayEndDate = extractDate(endDateTime);
  const displayEndTime = extractTime(endDateTime);

  if (isRecurring) {
    if (frequency == "WEEKLY") {
      const dayOfTheWeek =
        DAYS_OF_THE_WEEK[(startDateTime ?? dateTime).toDate().getDay()];
      return `Every ${dayOfTheWeek} - ${displayStartTime}`;
    } else return `${frequency} - ${displayStartDate}`;
  } else if (isMultiday) {
    return `From\t${displayStartDate} - ${displayStartTime}\nTo\t\t${displayEndDate} - ${displayEndTime}`;
  } else return `${displayStartDate} - ${displayStartTime}`;
};
