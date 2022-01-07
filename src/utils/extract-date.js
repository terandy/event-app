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
