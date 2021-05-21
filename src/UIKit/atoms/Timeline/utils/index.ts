/**
 * Конвертация миллисекунд в секунды с округлением
 * @param {number} milliSeconds
 */
export const convertMilliSecondsToSeconds = (milliSeconds: number): number => {
  return Math.floor(milliSeconds / 1000);
};

/**
 * Проверка что уже загружено
 * @param start
 * @param end
 * @param value
 */
export const checkAlreadyLoaded = (start: number, end: number, value: number) =>
  start > value || end < value;
