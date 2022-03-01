const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];
export const isSameDay = (someDate, otherDate, frequency, isRecurring) => {
  if (!isRecurring) {
    return (
      someDate.getDate() == otherDate.getDate() &&
      someDate.getMonth() == otherDate.getMonth() &&
      someDate.getFullYear() == otherDate.getFullYear()
    );
  }
  if (frequency === 'WEEKLY') {
    return someDate.getDay() === otherDate.getDay();
  }
  if (frequency === 'MONTHLY') {
    return someDate.getDate() === otherDate.getDate();
  }
  if (frequency === 'YEARLY') {
    return (
      someDate.getDate() === otherDate.getDate() &&
      someDate.getMonth() === otherDate.getMonth()
    );
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
