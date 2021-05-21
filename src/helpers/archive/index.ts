import apiMethods from "../api/apiMethods";

const baseUrl = process.env.REACT_APP_BASE_STREAMS_URL;

/**
 * Отправить запрос на загрузку видео
 * @param data
 */
export const orderVideo = async (data: downloadVideoData): Promise<boolean> => {
  return await apiMethods.orderVideoForDownload(data);
};

/**
 * Проверить загруженное видео
 * @param data
 */
export const checkAndGetVideo = async (
  data: checkAndGetVideoData
): Promise<DownloadVideoData> => {
  const result = await apiMethods.getDownloadLink(data);
  const { READY, LINK, NAME } = result;
  if (result.hasOwnProperty("READY") && READY === true) {
    if (typeof LINK === "string") return { downloadLink: LINK, name: NAME };
  } else if (
    (result.hasOwnProperty("READY") && result?.READY === false) ||
    result.error
  ) {
    throw new Error("Video not ready yet");
  }
  return { downloadLink: undefined, name: undefined };
};

/**
 * Форматировать время в опред строковую запись для APi
 * @param selectedMinutes
 */
export const formatMinutesToTime = (
  selectedMinutes: number | Array<number>
) => {
  const MinutesInDay = 1440;
  const format = (selectedMinutes: number) => {
    if (selectedMinutes >= MinutesInDay) {
      if (selectedMinutes == MinutesInDay) return `00:00:00`;
      selectedMinutes = selectedMinutes - MinutesInDay;
    }
    const hour = Math.floor(selectedMinutes / 60);
    const minutes = Math.floor(selectedMinutes) - hour * 60;
    return `${hour >= 10 ? hour : "0" + hour}:${
      minutes >= 10 ? minutes : "0" + minutes
    }`;
  };

  if (Array.isArray(selectedMinutes)) {
    return selectedMinutes.map(selectedMinutes => {
      return format(selectedMinutes);
    });
  } else {
    return format(selectedMinutes);
  }
};

/**
 * Форматировать время и вернуть в виде ${dd}.${mm}.${yyyy}
 * @param seconds
 */
export const formatSecondsToMinutesAndSeconds = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60) % 60;
  const secondsLeft = Math.floor(seconds - minutes * 60);
  return `${minutes < 10 ? "0" + minutes : minutes}:${
    secondsLeft < 10 ? "0" + secondsLeft : secondsLeft
  }`;
};

/**
 * Сгенерировать ссылку для poster
 * @param baseUrl
 * @param cameraId
 */
export const generatePosterUrl = (
  baseUrl: string | undefined,
  cameraId: number
): string => {
  return `${baseUrl}/snapshots/cam${cameraId}_lossy.jpg`;
};

/**
 * Форматировать время и вернуть в виде ${dd}.${mm}.${yyyy}
 * @param date
 */
export const formateDate = (date: Date): string => {
  const dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const mm =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  const yyyy = date.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
};

/**
 * Форматировать время и вернуть в виде ${h}:${m}
 * @param date
 */
export const formateDateTimeForUrl = (dateForFormate: Date): string => {
  const h =
    dateForFormate.getHours() > 9
      ? dateForFormate.getHours()
      : "0" + dateForFormate.getHours();
  const m =
    dateForFormate.getMinutes() > 9
      ? dateForFormate.getMinutes()
      : "0" + dateForFormate.getMinutes();
  return `${h}:${m}`;
};

/**
 * Сгенерировать ссылку для получения плейлиста типа m3u8 для hls плеера
 * @param {number} cameraId
 * @param {number} startDate

 */
export const generateLoadUrl = (
  cameraId: number,
  startDate: number
): string => {
  return `${baseUrl}/archive/cam${cameraId}.m3u8?START_TIME=${formateDate(
    new Date(startDate)
  )} ${formateDateTimeForUrl(new Date(startDate))}`;
};

/**
 * Сгенерировать данные для liveState
 * @param {Date} date
 */
export const generateDownloadTime = (date: Date): string => {
  return `${formateDate(date)} ${formateDateTimeForUrl(date)}`;
};

/**
 * Сгенерировать данные для получения плейлиста типа m3u8
 * @param cameraId
 * @param startdate
 * @param enddate
 */
export const generateIntervalUrl = (
  cameraId: number,
  startdate: Date,
  enddate: Date
): string => {
  return `${baseUrl}/archive/cam${cameraId}.m3u8?START_TIME=${formateDate(
    startdate
  )} ${formateDateTimeForUrl(startdate)}&STOP_TIME=${formateDate(
    enddate
  )} ${formateDateTimeForUrl(enddate)}`;
};

/**
 * Форматировать дату для
 * @param {Date} selectedDate
 */
export const formateDateForShow = (selectedDate: Date) => {
  return `${
    selectedDate!.getDate() < 10
      ? `0${selectedDate!.getDate()}`
      : selectedDate!.getDate()
  }/${
    selectedDate!.getMonth() + 1 < 10
      ? "0" + (selectedDate!.getMonth() + 1)
      : selectedDate!.getMonth() + 1
  }/${selectedDate!.getFullYear()} ${
    selectedDate.getHours() < 10
      ? "0" + selectedDate!.getHours()
      : selectedDate!.getHours()
  }:${
    selectedDate.getMinutes() < 10
      ? "0" + selectedDate!.getMinutes()
      : selectedDate!.getMinutes()
  }:${
    selectedDate!.getSeconds() < 10
      ? "0" + selectedDate!.getSeconds()
      : selectedDate!.getSeconds()
  }`;
};

/**
 * Функция для CachedImage
 * @param {number} min
 * @param {number} max
 */
export const getRandomIntInclusive = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Функция для CachedImage
 * @param {number} min
 * @param {number} max
 */
export const getRoundedTimestamp = () => {
  const coeff = 1000 * 60 * 5;
  const date = new Date();
  const rounded = new Date(
    Math.round(date.valueOf() / coeff) * coeff
  ).toString();
  return Date.parse(rounded) / 1000;
};

/**
 * Сгенерировать заголовки для сервера
 * @param token
 */
export const generateImageHeaders = (token: string) => {
  const baseHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "",
  };
  if (token) {
    baseHeaders["Authorization"] = `Bearer ${token}`;
  }

  return baseHeaders;
};

/**
 * Конвертировать время из миллисекунд в минут - округляем до большего
 * @param time
 */
export const convertMsToMin = (time: any) => {
  return Math.floor(((time / 1000 / 60) * 10) / 10);
};

/**
 * Проверить то что видео больше часа по длительности
 *
 * @param {string} startTime
 * @param {string} endTime
 * @returns {Boolean}
 */
export const isVideoMoreThanHour = (
  startTime: string,
  endTime: string
): Boolean => {
  const startTimeInMs = Date.parse(startTime);
  const endTimeInMs = Date.parse(endTime);
  return convertMsToMin(endTimeInMs - startTimeInMs) > 60;
};
