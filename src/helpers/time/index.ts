/* Глобальный хелпер по time */

/**
 * Форматирование timestamp в формате `${hours}:${minutes}:${seconds}`
 * @param timestamp
 */
export const formatTimestampForHuman = (timestamp: number): string => {
  const date = new Date(timestamp);

  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const seconds =
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

  return `${hours}:${minutes}:${seconds}`;
};

/**
 * Сгенерировать TimeStamp с оффсетом - timestamp сгенерируется в секундах
 * @param {number} timestamp
 * @param {number} offsetInMins
 */
export const countTimestampWithOffsetInSeconds = (
  timestamp: number,
  offsetInMins: number
) => {
  return timestamp + offsetInMins * 60 * 1000;
};

/**
 *
 * @param offset
 */
export const countOffsetFromNowAndGenerateDate = (offset: number) => {
  return new Date(new Date().valueOf() + offset);
};
