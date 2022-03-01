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
