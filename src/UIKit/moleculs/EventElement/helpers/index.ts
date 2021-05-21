import moment from "moment";

const capitalizeFirstLetter = (str: string) => {
  return str[0].toUpperCase() + str.slice(1);
};

const zeroAppener = (num: number) => {
  return num < 10 ? `0${num}` : num;
};

export const rawDateToTimestamp = (date: string) =>
  moment(date, "DD.MM.YYYY hh:mm:ss")
    .toDate()
    .valueOf();

export const formateDateForEvent = (
  startDateString: string,
  endDateString: string
): formatedEvent => {
  const startDate = moment(startDateString, "DD.MM.YYYY hh:mm:ss").toDate();
  const endDate = moment(endDateString, "DD.MM.YYYY hh:mm:ss").toDate();

  const locateOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    timezone: "UTC",
  };

  const eventDateFromated = `${startDate.toLocaleString(
    "ru",
    locateOptions
  )} | ${capitalizeFirstLetter(
    startDate.toLocaleString("ru", { weekday: "long" })
  )}`;

  const timeDiff = endDate.valueOf() - startDate.valueOf();
  var diffAsDate = new Date(timeDiff);

  const eventTimeFromated = `${zeroAppener(startDate.getHours())}:${zeroAppener(
    startDate.getMinutes()
  )}:${zeroAppener(
    startDate.getSeconds()
  )} | ${diffAsDate.getMinutes()} Мин ${diffAsDate.getSeconds()} Сек`;

  return {
    eventDate: eventDateFromated,
    eventTime: eventTimeFromated,
  };
};

export const tenMinInSeconds = 10 * 60;
